# Checklist de testes — Entrega Final FitTrack (quatro integrantes)

**Legenda:** `[x]` = evidenciado pela saída de terminal compartilhada anteriormente neste atendimento; `[ ]` = ainda precisa ser validado/revalidado após aplicar o pacote atualizado. Os itens marcados não provam que todos os computadores/celulares funcionam da mesma forma.

## Evidências já recebidas (19/11/2026)

- [x] API iniciada via `npm start`, Node 24.22.3, SQLite nativo carregado.
- [x] `GET /api/health`: `status=ok`, `storage=sqlite`, `mode=demo`.
- [x] `GET /api/workouts`, `/api/exercises`, `/api/contacts`: dados SQLite retornados.
- [x] `GET /painel`: HTTP 200.
- [x] **Anderson:** Create, Read por ID, Update, Delete de Treinos via API.
- [x] **Gabriel:** Create, Read por ID, Update, Delete de Exercícios via API.
- [x] Exercício com treino inexistente rejeitado com HTTP 422.
- [x] **Victor:** Create, Read por ID, Update, Delete de Contatos via API.
- [x] O navegador do celular acessou `http://10.164.48.113:3333/api/health` no ambiente testado.
- [x] `.env` da máquina configurado e `npm install` na raiz do Expo concluído (3 avisos moderados a analisar, sem executar `npm audit fix --force`).

## Conferências finais ainda necessárias

- [ ] Na versão atualizada: `cd api`, `npm install`, `npm test`, `npm start`; em outro terminal `npm run smoke` (inclui quarto CRUD).
- [ ] **Luhan:** CRUD Ocorrências via API: POST, GET lista, GET por ID, PUT, DELETE; rejeição de gravidade inválida HTTP 422.
- [ ] **Luhan:** CRUD Ocorrências no aplicativo: criar, listar, editar, excluir e persistir ao reabrir.
- [ ] Expo Go/emulador abre o novo pacote e conecta à API pelo IP correto.
- [ ] Todos os quatro CRUDs persistem após reiniciar o aplicativo e o servidor.
- [ ] Fachada, toque longo de 3 s e saída rápida testados juntos.
- [ ] SOS acadêmico e painel verificados **somente com coordenadas de teste autorizadas**.
- [ ] `npm audit` revisado, sem aplicar alterações incompatíveis automaticamente.
- [ ] README, USO_IA, matriz e DER conferidos pelo grupo.
- [ ] Quadro Kanban atualizado e exportado para PDF/PNG/JPG.
- [ ] Quatro integrantes como colaboradores, com commits individuais que correspondem a mudanças reais.

**Não cadastrar dados verdadeiros de vítimas nem apresentar o SOS como serviço de emergência operacional.**
