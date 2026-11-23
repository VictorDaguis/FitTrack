# Documentação — CRUD de Treinos (FitTrack)

**Responsável:** Anderson  
**Branch:** `feat/crud-treinos`  
**Stack:** Node.js, Express, SQLite e Aplicativo Mobile

## Resumo da Implementação e Validação

Módulo responsável pelo gerenciamento completo de treinos no sistema **FitTrack**, integrado à API REST em Node.js/Express e persistência em banco de dados SQLite.

### Funcionalidades Validadas
- **Criação (`POST`):** Cadastro de novos registros de treino com validação de campos obrigatórios.
- **Consulta (`GET`):** Listagem geral dos treinos cadastrados e busca individual por identificador.
- **Edição (`PUT`/`PATCH`):** Atualização dos dados de treinos existentes no banco SQLite.
- **Exclusão (`DELETE`):** Remoção segura de registros de treino.

### Status
- CRUD revisado, testado e validado na integração entre o aplicativo mobile e a API.
