# Matriz de responsabilidades — FitTrack, Entrega Final (19/11/2026)

**Equipe atualizada: quatro integrantes.** A nova distribuição estabelece **um CRUD REST completo e integrado ao aplicativo por aluno**.

| Integrante | CRUD próprio | Interface mobile / demonstração | API real e banco SQLite |
|---|---|---|---|
| **Anderson Silva** | **Treinos** | Criar, consultar, editar e excluir treinos na aba **Treinos** | `workouts` — `/api/workouts`, 5 rotas REST |
| **Gabriel Magro** | **Exercícios** | Formulário de exercícios, seleção de treino, listagem e edição | `exercises` — `/api/exercises`; relacionamento real `workout_id` → `workouts.id` |
| **Victor Hugo Daguis** | **Contatos de confiança** | Entrada na área de apoio e CRUD de **Contatos** | `contacts` — `/api/contacts`, 5 rotas REST |
| **Luhan** | **Ocorrências** | Entrada na área de apoio e CRUD de **Ocorrências** (data, tipo, descrição fictícia, gravidade) | `incidents` — `/api/incidents`, 5 rotas REST, `severity` 1–5 |

**Para todos os quatro CRUDs:** `GET /api/recurso`, `GET /api/recurso/:id`, `POST`, `PUT /:id`, `DELETE /:id`, validados com respostas HTTP adequadas.

## Responsabilidades coletivas

- Preservar fachada FitTrack, gatilho de ~3 segundos, acesso à área de apoio e saída rápida.
- Validar `npm install`/`npm start` na API e `npm install`/`npx expo start` no app (túnel Expo apenas se LAN bloquear Metro).
- Usar somente registros fictícios no protótipo; nenhuma mensagem SOS alcança serviços oficiais.
- Revisar banco/relacionamento, painel de alerta fictício, README, quadro Kanban e `USO_IA.md`.

## Autoria e commits

A distribuição acima identifica **responsabilidades acordadas para a apresentação**, não afirma que cada pessoa já escreveu ou testou todos os arquivos. Os códigos base foram preparados com apoio de IA. **Cada integrante deve revisar, corrigir ou aprimorar o próprio CRUD, realizar testes e commitar suas alterações reais com sua própria conta**. Não fabricar autoria nem hashes. Registrar commits efetivos no `USO_IA.md` e no Kanban.
