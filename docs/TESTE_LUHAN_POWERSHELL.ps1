# CRUD de Ocorrencias: script demonstrativo do quarto integrante (Luhan)
# Execute em um PowerShell separado, com npm start da API ativo na porta 3333.
# Todos os dados sao ficticios e o registro de teste e apagado ao final.
$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3333/api/incidents'
$id = $null
$token = [guid]::NewGuid().ToString('N').Substring(0,8)
try {
    Write-Host '=== LUHAN: POST /api/incidents ==='
    $body = @{ date = '19/11/2026'; type = "Teste academico $token"; description = 'Registro ficticio para validar o quarto CRUD'; severity = 1 } | ConvertTo-Json
    $new = Invoke-RestMethod -Uri $base -Method Post -Body $body -ContentType 'application/json; charset=utf-8'
    $id = $new.id
    if (-not $id) { throw 'API nao retornou ID da ocorrencia.' }
    Write-Host "CRIADO_OK id=$id"

    Write-Host '=== LUHAN: GET lista e GET por ID ==='
    $list = @(Invoke-RestMethod -Uri $base -Method Get)
    $one = Invoke-RestMethod -Uri "$base/$id" -Method Get
    if ($one.id -ne $id -or -not ($list | Where-Object id -EQ $id)) { throw 'Falha ao consultar ocorrencia.' }
    Write-Host 'CONSULTA_OK'

    Write-Host '=== LUHAN: PUT /api/incidents/:id ==='
    $payload = @{ severity = 3; description = 'Descricao ficticia atualizada' } | ConvertTo-Json
    $edited = Invoke-RestMethod -Uri "$base/$id" -Method Put -Body $payload -ContentType 'application/json; charset=utf-8'
    if ($edited.severity -ne 3) { throw 'Falha ao atualizar ocorrencia.' }
    Write-Host 'EDICAO_OK'

    Write-Host '=== LUHAN: validacao de gravidade > 5 ==='
    try {
        $invalid = @{ date='19/11/2026'; type='Invalidacao'; description='Teste'; severity=9 } | ConvertTo-Json
        Invoke-RestMethod -Uri $base -Method Post -Body $invalid -ContentType 'application/json; charset=utf-8' | Out-Null
        throw 'Falha: a API aceitou gravidade invalida.'
    } catch {
        $resp = $_.Exception.Response
        if ($null -eq $resp -or [int]$resp.StatusCode -ne 422) { throw }
        Write-Host 'VALIDACAO_422_OK'
    }

    Write-Host '=== LUHAN: DELETE no finally ==='
} finally {
    if ($id) {
        Invoke-RestMethod -Uri "$base/$id" -Method Delete | Out-Null
        Write-Host "EXCLUSAO_OK id=$id"
        try {
            Invoke-RestMethod -Uri "$base/$id" -Method Get | Out-Null
            throw 'Falha: registro excluido ainda foi encontrado.'
        } catch {
            $resp = $_.Exception.Response
            if ($null -eq $resp -or [int]$resp.StatusCode -ne 404) { throw }
            Write-Host 'GET_APOS_DELETE_404_OK'
        }
    }
}
Write-Host 'CRUD_OCORRENCIAS_LUHAN_APROVADO'
