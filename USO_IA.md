# USO_IA.md — FitTrack, Entrega Final (3 e 4)

**Equipe de quatro integrantes:** Anderson Silva, Gabriel Magro, Victor Hugo Daguis e Luhan.  
**Disciplina:** Desenvolvimento Móvel, segundo semestre de 2026.  
**Tema:** aplicativo de apoio acadêmico camuflado como academia.

## Ferramenta utilizada e finalidade

**ChatGPT (OpenAI):** apoio ao planejamento, documentação, estrutura de navegação Expo/React Native, integração com API REST Express/SQLite, exemplos de validações e testes automatizados. A IA **não substitui a revisão, implementação, testes, entendimento técnico ou a autoria real de cada estudante**.

| Etapa | Apoio recebido | O que o grupo deve validar |
|---|---|---|
| Entregas 1 e 2 | Definição do disfarce FitTrack, telas, navegação Stack/Tabs/Drawer e primeiro protótipo com dados locais | Gatilho oculto e transição de telas |
| Entrega Final | API REST, banco SQLite, `workout_id` como FK, consumo de API, painel SOS fictício e documentação | Quatro CRUDs de ponta a ponta, persistência, erros HTTP, testes e segurança acadêmica |
| Inclusão de integrante (19/11/2026) | Reorganização da matriz para **Luhan → Ocorrências**, atualização de README, DER, roteiro, testes e declaração de IA | Luhan revisar, testar e contribuir efetivamente no módulo de Ocorrências |

## Prompts de referência realmente usados

- “Vamos fazer o da academia.”
- “Precisamos dar sequencia nesse projeto, nao mexi mais apos nossa ultima conversa e agora tem essa outra atividade para fazermos” (acompanhado do enunciado da Entrega Final).
- “Precisamos fazer um ajuste, um novo integrante entrou, chamado Luhan, ajuste para que fique um CRUD pra ele tambem etc. favor mandar tudo atualizado”.

## Distribuição atual dos CRUDs

- **Anderson Silva:** Treinos — `GET/POST/PUT/DELETE /api/workouts` (também GET por ID).
- **Gabriel Magro:** Exercícios — `GET/POST/PUT/DELETE /api/exercises` (também GET por ID) e FK `workout_id`.
- **Victor Hugo Daguis:** Contatos — `GET/POST/PUT/DELETE /api/contacts` (também GET por ID).
- **Luhan:** Ocorrências — `GET/POST/PUT/DELETE /api/incidents` (também GET por ID, validação de gravidade 1–5).

O CRUD de Ocorrências **já existia tecnicamente na base da versão anterior**; nesta atualização ele foi formalmente atribuído ao quarto integrante, recebeu documentação e testes ampliados. Não registrar que o Luhan escreveu do zero algo que já estava pronto; sua contribuição deve ser uma revisão, correção, teste ou melhoria efetivamente feita por ele.

## Evidências obtidas na conversa em 19/11/2026

- Node **24.22.3** e `node:sqlite` responderam corretamente.
- API iniciou em `http://localhost:3333`; health check retornou `status=ok`, `storage=sqlite`, `mode=demo`.
- GET dos três recursos Treinos, Exercícios e Contatos respondeu; painel `/painel` respondeu HTTP 200.
- Teste manual por PowerShell completou **Create, Read, Update e Delete dos três CRUDs originais**, rejeitando FK inexistente com HTTP 422 e removendo os registros temporários.
- Navegador do celular acessou o `/api/health` pelo IP local; `.env` foi configurado e `npm install` da aplicação concluído.
- **Pendente de validação:** CRUD de Ocorrências do Luhan em API/Expo; teste atualizado `npm run smoke`; abertura do novo Expo no celular; SOS e saída rápida na versão final.

## Revisão humana e commits — completar com dados reais

| Integrante | Revisão/modificação feita pessoalmente | Teste efetuado pessoalmente | Commit SHA/link |
|---|---|---|---|
| Anderson Silva | Pendente de registro | Pendente | Pendente |
| Gabriel Magro | Pendente de registro | Pendente | Pendente |
| Victor Hugo Daguis | Pendente de registro | Pendente | Pendente |
| Luhan | Pendente de registro | Pendente | Pendente |

## Limitações e uso ético

O sistema é um **protótipo acadêmico sem autenticação de usuários** e não deve receber informações reais de vítimas. O SOS envia **apenas demonstrações** para a API/painel do grupo; não contata serviços oficiais ou pessoas reais. O disfarce não equivale a uma proteção de privacidade em produção. O código produzido com ajuda de IA precisa ser entendido, revisado e validado pelo grupo.
