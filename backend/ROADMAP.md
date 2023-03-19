## aplication

* models
    - tasks
        - id, label, additionalInfo, expiration, categories, ownerId, createdAt, updatedAt
        >  ids gerados por UUID

        > label com mínimo de 2 caracteres

        > additionalInfo com máxima de 300 caracteres

    - notifications
        - id, content, recipientId, readAt

        > Ids gerados por UUID.

        > Content com máximo de 100 caracteres

* usecases

## mvp

* CRUD operations
    - [ ] create
    - [ ] remove
    - [ ] update
    - [ ] delete