# Roteiro — demonstração dos quatro integrantes

> Abrir **dois terminais**: API (`cd api; npm install; npm start`) e Expo (`npm install; npx expo start`). No celular, API via `EXPO_PUBLIC_API_URL=http://IP-DO-PC:3333`. O túnel do Expo (`--tunnel`) **não** compartilha a porta da API automaticamente.

## 1. Abertura (grupo)

Mostrar a fachada de academia. O toque comum em **INICIAR TREINO** leva aos treinos; manter o botão pressionado cerca de **3 segundos** leva à área de apoio. Deixar claro que é um **protótipo acadêmico**.

## 2. Anderson — Treinos

Na aba **Treinos**: criar `Treino da apresentação`, consultar, editar duração e excluir. Mostrar `GET /api/workouts` na API para evidenciar persistência real.

## 3. Gabriel — Exercícios

Na aba **Exercícios**: selecionar treino cadastrado, criar `Exercício da apresentação`, consultar, mudar carga/repetições e excluir. Explicar `workoutId` e FK real. Exemplo negativo: POST com `workoutId` inexistente retorna HTTP 422. Se demonstrar exclusão em cascata, usar apenas um treino descartável.

## 4. Victor — Contatos de confiança

Entrar na área de apoio segurando **INICIAR TREINO**. Abrir **Contatos**, criar pessoa e telefone **fictícios**, listar, editar prioridade e excluir. Explicar rotas `/api/contacts`.

## 5. Luhan — Ocorrências (quarto CRUD)

No Drawer da área de apoio, abrir **Ocorrências**. Criar registro com `Data: 19/11/2026`, `Tipo: Simulação acadêmica`, `Descrição: Registro inteiramente fictício para demonstrar o CRUD` e `Gravidade: 1`. Demonstrar **Create, Read, Update (alterar gravidade para 2) e Delete**. Abrir `http://IP-DO-PC:3333/api/incidents` antes/depois. Explicar a tabela `incidents`, as cinco rotas REST e a validação de gravidade 1–5 (HTTP 422 para valor inválido).

## 6. Encerramento (grupo)

Mostrar **SAÍDA RÁPIDA**, que retorna à fachada. Se houver tempo, simular SOS apenas com o dispositivo autorizado e mostrar painel em `/painel`; **não notifica a polícia nem contatos reais**. Exibir matriz de 4 responsabilidades, `USO_IA.md`, testes e contribuições reais dos quatro integrantes.
