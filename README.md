# FitTrack — Entrega Final 3 e 4 (2026.2)

**Grupo:** Anderson Silva, Gabriel Magro, Victor Hugo Daguis e Luhan
**Tema acadêmico:** aplicativo de apoio camuflado em uma fachada de academia.  
**Estado deste pacote:** primeira versão navegável, com dados simulados em memória. A execução/teste em aparelho ou emulador ainda deve ser feita pelo grupo.
**Equipe de 4 integrantes:** **Anderson Silva, Gabriel Magro, Victor Hugo Daguis e Luhan**.  
**Disciplina:** Desenvolvimento Móvel. **Data Science:** não se aplica aos integrantes originalmente informados; confirmar se Luhan também não cursa a disciplina.  
**Tema:** protótipo acadêmico de apoio camuflado sob a aparência de aplicativo de academia.

> **Somente demonstração acadêmica.** Sem autenticação ou proteção adequadas para dados sensíveis. **Não inserir dados reais de vítimas.** SOS fictício: não avisa contatos, polícia ou serviços públicos. Ligue 180 para orientação ou 190 em emergências reais.

## 1. O que existe neste projeto

- **Expo SDK 58 / React Native:** fachada fitness com abas Início, Treinos, Exercícios e Resumo.
- **Gatilho de acesso:** toque normal em **INICIAR TREINO** abre treinos; segurar ~3 segundos abre a área de apoio.
- **Saída rápida:** comando na área de apoio redefine a navegação e retorna à fachada (não é mecanismo de privacidade real).
- **Quatro CRUDs REST completos**, cada um com sua tabela SQLite e interface mobile consumindo requisições reais, sem `mockData` no React Native.
- **API Node.js/Express:** em `api/`, inicializável localmente por `npm install` e `npm start`.
- **Persistência SQLite real:** módulo nativo `node:sqlite` com Node 22.16+ (Node 24 recomendado).
- **Relacionamento real:** exercícios pertencem a treinos, com FK `exercises.workout_id → workouts.id` e exclusão em cascata. IDs inválidos retornam HTTP 422.
- **Painel web** em `/painel` para alertas SOS *demonstrativos* com localização autorizada, sem contato com autoridades.

## 2. Matriz dos quatro CRUDs

| Integrante | CRUD | Tela | Rota da API | Tabela SQLite |
|---|---|---|---|---|
| **Anderson Silva** | Treinos | Treinos | `/api/workouts` | `workouts` |
| **Gabriel Magro** | Exercícios | Exercícios | `/api/exercises` | `exercises` |
| **Victor Hugo Daguis** | Contatos de confiança | Contatos (área de apoio) | `/api/contacts` | `contacts` |
| **Luhan** | Ocorrências | Ocorrências (área de apoio) | `/api/incidents` | `incidents` |

Todos os quatro módulos implementam **GET lista, GET por ID, POST, PUT por ID e DELETE por ID**. Os dados criados pela interface são persistidos no SQLite e consultados novamente pela API. O CRUD de Ocorrências já existia na versão base; nesta atualização foi atribuído formalmente a Luhan e teve documentação e testes ampliados.

Consulte `docs/MATRIZ_RESPONSABILIDADES.md`, `docs/DER.md` e `docs/ROTEIRO_APRESENTACAO.md`.

## 3. Requisitos e execução

- Node **24.x LTS** recomendado (Node >=22.16.0 requerido pela API).
- npm e Expo Go compatível com o SDK instalado, ou emulador Android/iOS.
- Computador com API e celular na mesma rede ou rota segura alternativa; não publicar API sem autenticação na internet.

### Terminal 1 — API e banco SQLite

```powershell
cd "C:\CAMINHO\FitTrackpi"
npm install
npm start
```

- Verificação: `http://localhost:3333/api/health`
- Painel fictício: `http://localhost:3333/painel`
- SQLite: `api/data/fittrack.sqlite` (gerado na inicialização, **não incluído no ZIP/GitHub**).

### Terminal 2 — Expo

```powershell
cd "C:\CAMINHO\FitTrack"
Copy-Item .env.example .env
notepad .env
npm install
npx expo start --clear
```

No `.env`, preencher o **IP local do PC que está executando a API**, por exemplo:

```dotenv
EXPO_PUBLIC_API_URL=http://192.168.1.10:3333
```

O IP acima é **exemplo**, não valor universal. Para descobrir o seu, use `ipconfig` ou `Get-NetIPConfiguration`. Teste `http://IP-DO-PC:3333/api/health` no navegador **do celular** antes do Expo.

Caso o Metro não carregue pela LAN, em vez do último comando use:

```powershell
npx expo start --tunnel --clear
```

**Importante:** `--tunnel` expõe o Metro/Expo, **não a API**. A variável `EXPO_PUBLIC_API_URL` ainda precisa apontar para um servidor acessível pelo celular. No emulador Android padrão, geralmente use `http://10.0.2.2:3333`.

Se já existe `.env` funcional em outro projeto/pasta, **preserve-o**: não substitua pelo IP de exemplo ao atualizar a versão. Um endereço LAN testado na rede em 19/11/2026 foi `10.164.48.113:3333`, mas pode mudar de rede para rede.

## 4. Testes

Com a API rodando, no diretório `api` em **outro terminal**:

```powershell
npm test
npm run smoke
```

- `npm test`: banco SQLite, relacionamento e tabela de ocorrências.
- `npm run smoke`: endpoints HTTP de todos os quatro CRUDs, GET por ID, POST/PUT/DELETE, FK inválida (422), gravidade de ocorrência inválida (422), painel e SOS de teste.
- O script registra um evento SOS **fictício** usando coordenadas (0,0). Não aciona serviços reais.
- `docs/TESTES_FINAIS.md` diferencia evidências já obtidas dos testes ainda necessários; não marcar testes não executados.

## 5. Roteiro resumido para a apresentação

1. **Anderson:** CRUD Treinos na aba, gravando na API.
2. **Gabriel:** CRUD Exercícios e escolha de um treino existente, demonstrando FK real.
3. Mostrar fachada e manter **INICIAR TREINO** pressionado ~3 segundos.
4. **Victor:** CRUD Contatos de confiança na área de apoio.
5. **Luhan:** CRUD Ocorrências — registrar ocorrência **fictícia** com data, tipo, descrição e gravidade, atualizar e excluir, usando `/api/incidents`.
6. Demonstrar SAÍDA RÁPIDA; opcionalmente SOS fictício e painel de alertas.

Detalhes em `docs/ROTEIRO_APRESENTACAO.md`.

## 6. Rotas e códigos HTTP

Para cada um dos recursos `workouts`, `exercises`, `contacts`, `incidents`:

```text
GET    /api/RECURSO
GET    /api/RECURSO/:id
POST   /api/RECURSO
PUT    /api/RECURSO/:id
DELETE /api/RECURSO/:id
```

Outros: `GET /api/health`, `GET /api/profiles/1`, `GET/POST /api/alerts`, `PATCH /api/alerts/:id/status`, `GET /painel`. Status típicos `200`, `201`, `204`, `400`, `404`, `422` e `500`.

## 7. Arquivos

```text
FitTrack/
├── App.js
├── app.json
├── package.json
├── .env.example
├── src/
│   ├── navigation/AppNavigator.js
│   ├── context/AppContext.js  # carrega os quatro recursos da API
│   ├── services/api.js
│   ├── screens/FitnessScreens.js
│   ├── screens/SupportScreens.js  # contatos e ocorrências
│   └── components/UI.js
├── api/
│   ├── server.js  # quatro CRUDs, SOS e painel
│   ├── db.js      # tabelas SQLite e FK
│   ├── public/index.html
│   └── tests/
├── docs/
│   ├── MATRIZ_RESPONSABILIDADES.md
│   ├── DER.md
│   ├── ROTEIRO_APRESENTACAO.md
│   ├── TESTES_FINAIS.md
│   ├── TESTE_LUHAN_POWERSHELL.ps1
│   └── ENTREGA_BLACKBOARD.md
├── USO_IA.md
└── README.md
```

## 8. Segurança e integridade acadêmica

- O projeto é destinado **somente a testes com dados inventados**. A API de demonstração não possui autenticação nem isolamento de usuários e não deve ficar publicada em rede aberta.
- `.gitignore` exclui `.env`, `node_modules` e `api/data/*.sqlite`; não enviar dados pessoais, tokens ou chaves.
- O painel simula atendimentos, não é vinculado a serviços oficiais. A saída rápida reduz navegação acidental, mas não apaga histórico do dispositivo ou garante sigilo.
- Os **quatro estudantes** devem revisar seus módulos e realizar **commits próprios de contribuições reais**; não atribuir autoria fictícia. Preencher o `USO_IA.md` e atualizar o Trello.

- **Anderson Silva:** Treinos.
- **Gabriel Magro:** Exercícios e relacionamento com Treinos.
- **Victor Hugo Daguis:** Contatos de confiança.
- **Luhan** Ocorrências.
## 9. Entrega ao Blackboard

Prazo fornecido: **19/11/2026, 23h59**. Entregar **link do repositório atualizado**, ZIP Expo e ZIP API separados, cópia do `USO_IA.md` e **imagem/PDF do Kanban real atualizado**. A atividade não exige notebook de Data Science de quem não cursa essa disciplina. Consulte `docs/ENTREGA_BLACKBOARD.md`.
