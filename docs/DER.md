# Modelo de dados real — FitTrack

A aplicação utiliza SQLite (`api/data/fittrack.sqlite`) por `node:sqlite`, com integridade de chave estrangeira ativada (`PRAGMA foreign_keys=ON`). Não se trata de arrays/mockData no aplicativo.

```mermaid
erDiagram
  PROFILES ||--o{ WORKOUTS : possui
  PROFILES ||--o{ CONTACTS : possui
  PROFILES ||--o{ INCIDENTS : registra
  PROFILES ||--o{ SOS_ALERTS : simula
  WORKOUTS ||--o{ EXERCISES : contem
  PROFILES {
    int id PK
    text name
    int demo
  }
  WORKOUTS {
    int id PK
    int profile_id FK
    text name
    text focus
    int duration
    text day
  }
  EXERCISES {
    int id PK
    int workout_id FK
    text name
    int sets
    int reps
    text load
  }
  CONTACTS {
    int id PK
    int profile_id FK
    text name
    text relation
    text phone
    int priority
  }
  INCIDENTS {
    int id PK
    int profile_id FK
    text date
    text type
    text description
    int severity
  }
  SOS_ALERTS {
    int id PK
    int profile_id FK
    real latitude
    real longitude
    text created_at
    text status
  }
```

## Relacionamento obrigatório

- `exercises.workout_id` referencia `workouts.id`, com **`ON DELETE CASCADE`**.
- A API rejeita um exercício vinculado a treino inexistente com **HTTP 422**.
- `incidents.profile_id` referencia `profiles.id`: **Ocorrências é uma entidade/tabela própria**, distinta de Contatos, Treinos e Exercícios; esse é o CRUD atribuído ao **Luhan**.
- A conta padrão `profiles.id=1` é **apenas demonstrativa**, sem autenticação/isolamento de usuários. Não usar registros reais de vítimas.
