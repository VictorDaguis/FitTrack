# API do FitTrack — Entrega Final, 4 integrantes

Node.js 24 recomendado. Esta API usa Express + SQLite nativo (`node:sqlite`) para quatro CRUDs: Treinos (Anderson), Exercícios (Gabriel), Contatos (Victor) e Ocorrências (Luhan).

## Iniciar

```powershell
npm install
npm start
```

- API: `http://localhost:3333/api/health`
- Painel demonstrativo: `http://localhost:3333/painel`
- SQLite gerado localmente: `data/fittrack.sqlite`

## Testar

Com o servidor rodando em um terminal, no outro:

```powershell
npm test
npm run smoke
```

O teste `smoke` faz um ciclo real de CRUD de Ocorrências e rejeita gravidade inválida (HTTP 422). Usa dados fictícios e gera um alerta SOS de **demonstração**, sem notificar ninguém.

## Rotas dos quatro módulos

| Integrante | Recurso | CRUD REST |
|---|---|---|
| Anderson | `/api/workouts` | GET, GET/:id, POST, PUT/:id, DELETE/:id |
| Gabriel | `/api/exercises` | GET, GET/:id, POST, PUT/:id, DELETE/:id |
| Victor | `/api/contacts` | GET, GET/:id, POST, PUT/:id, DELETE/:id |
| Luhan | `/api/incidents` | GET, GET/:id, POST, PUT/:id, DELETE/:id |

A FK `exercises.workout_id` garante o relacionamento exigido. Dados de teste não devem ser confundidos com atendimento real. **Não colocar esta API na internet sem proteção e não inserir dados pessoais.**
