# Caju

[![Netlify Status](https://api.netlify.com/api/v1/badges/59c3d9df-b7d6-4ae2-8206-e3ecae816cb4/deploy-status)](https://app.netlify.com/sites/caju-jaimeneeves/deploys) 
![build status](https://github.com/jaimeneeves/caju/actions/workflows/ci.yml/badge.svg)

Caju é um projeto escrito em TypeScript que utiliza Vite como ferramenta de construção e Yarn para gerenciamento de pacotes. O projeto também utiliza Jest para testes.

## 🚀 Tecnologias Utilizadas

- **TypeScript**: Linguagem principal, oferecendo suporte a tipos para JavaScript.
- **React**: Biblioteca para construção de interfaces de usuário de forma declarativa.
- **Jest**: Framework de testes com foco na simplicidade.
- **React Testing Library**: Utilitários de teste para componentes React.
- **Redux**: Biblioteca para gerenciamento de estado de aplicações JavaScript.
- **Vite**: Ferramenta de construção extremamente rápida.
- **ESlint**: Ferramenta de análise de código para identificar padrões problemáticos.
- **Cypress**: Framework de testes end-to-end.
- **CI/CD**: Integração e entrega contínuas com Github Actions e Netlify.

## 🌐 Acesso à Aplicação

Para acessar a aplicação, clique [aqui](https://caju-jaimeneeves.netlify.app/).

## 📦 Clone do Projeto

Para clonar e executar este projeto localmente, siga estas etapas:

1. Clone o repositório:

```bash
git clone https://github.com/jaimeneeves/caju.git
```

2. Acesse a pasta do projeto:

```bash
cd caju
```

3. Instale as dependências:

```bash
yarn install
```

Crie uma cópia do arquivo `.env.example` e e renomeie para `.env`

```sh
cp .env.example .env
```

O conteúdo do arquivo `.env` deve ficar assim:

```sh
VITE_APP_API_URL="http://localhost:3000"
```

4. Inicie o JSON Server para simular uma API REST:

```sh
yarn init:db
```

Certifique-se de que o JSON Server está rodando corretamente e acessível na URL configurada no arquivo `.env`.

5. Execute o projeto em modo de desenvolvimento:

```sh
yarn dev
```

## 🧪 Testes

Este projeto utiliza Jest e React Testing Library para testes unitários e de integração. Para executar os testes, siga os passos abaixo:

```sh
test:dev
```

### Cypress para Testes End-to-End (E2E)

O projeto também inclui configurações para testes E2E com Cypress. Para executar esses testes, siga os passos:

1. Certifique-se de que o JSON Server estejam rodando.
2. Para executar os testes E2E do Cypress em modo headless (sem abrir a interface gráfica), utilize o comando:

```sh
yarn cypress:run
```

Este comando é útil para execução de testes em ambientes de integração contínua ou para uma verificação rápida dos testes sem a necessidade da interface gráfica do Cypress.

3. Para abrir o Cypress e executar os testes de forma interativa, use:

```sh
yarn cypress open
```

No painel do Cypress, selecione o teste que deseja executar. A execução interativa é ideal durante o desenvolvimento e a depuração dos testes E2E.  

## Scripts disponíveis

Modo Dev

```shell
yarn dev
```

Linter

```shell
yarn lint
```

Build

```shell
yarn build
```

Testes Unitários

```sh
yarn test:dev
```

Testes E2E

```sh
yarn cypress:run
```

Iniciar JSON Server

```shell
yarn init:db
```

---