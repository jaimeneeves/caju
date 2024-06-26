# Caju

[![Netlify Status](https://api.netlify.com/api/v1/badges/59c3d9df-b7d6-4ae2-8206-e3ecae816cb4/deploy-status)](https://app.netlify.com/sites/caju-jaimeneeves/deploys) 
![build status](https://github.com/jaimeneeves/caju/actions/workflows/ci.yml/badge.svg)

Caju é um projeto escrito em TypeScript que utiliza Vite como ferramenta de construção e Yarn para gerenciamento de pacotes. O projeto também utiliza Jest para testes.

## Configuração

Crie uma cópia do arquivo `.env.example` e e renomeie para `.env`

```sh
cp .env.example .env
```

O conteúdo do arquivo `.env` deve ficar assim:

```sh
VITE_APP_API_URL="http://localhost:3000"
```

## Desenvolvimento

```shell
git clone https://github.com/jaimeneeves/caju.git
cd caju
yarn 
yarn dev
```

Abra outro terminal e execute: 
```shell
yarn init:db
```

Para os testes

```shell
yarn test:dev
```
Se tude tiver dado certo as seguintes portas estarão disponiveis:
<br/>

Aplicação http://localhost:3001/
<br/>
Json Web Server http://localhost:3000/