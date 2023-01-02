# IN3046 Group 8 - Cloud-based Wordle Game Application

## READMEs describing the UI and Backend

- [UI](cuol-wordle-ui/cuol_wordle_ui/README.md) - ReactJS w/ React Bootstrap and Redux Toolkit
- [Backend](cuol-wordle-backend/cuol_wordle_django/README.md) - python django

## Deployed on **GCP** using

- Cloud Run
- Cloud Build
- Cloud SQL
- Cloud Storage
- Container Registry
- Secret Manager

## Deployment chart

```mermaid
graph TB
    A[Local Machine] --> B(Cloud Build)
    B --> C(Container Registry)
    B --> D(Cloud Storage Bucket)
    C --> E(Cloud Run)
    D --> E
    E <--> F[(CloudSQL)]
    G(Secret Manager) --> E
    E <--> H(Users)
```


### Group Members

- Adam Kaczmarski
- Ayesha Kayani
- Vijay Kesireddy

```mermaid
graph LR
    fa:fa-check-->fa:fa-coffee
```
