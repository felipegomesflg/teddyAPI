<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
 
[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Client CRUD API

Este projeto é uma API desenvolvida com **Nest.js** e **TypeORM** para gerenciar clientes. Inclui funcionalidades para criar, ler, atualizar e excluir clientes, com suporte a logs e testes unitários e E2E.

## Requisitos

Certifique-se de ter os seguintes softwares instalados:

- **Node.js** (versão 16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **PostgreSQL** (versão 12 ou superior)

---

## 1. Instalação

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
Instalar Dependências

```bash
npm install
```
## 2. Configuração do Banco de Dados

### Criar o Banco de Dados
No PostgreSQL, execute o seguinte comando SQL para criar o banco de dados:

```sql
CREATE DATABASE client_crud_db;
```

### Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente:

```env
Copiar código
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=client_crud_db
```

## 3. Executar Migrações
Você pode configurar o banco de dados de duas maneiras: manualmente ou utilizando migrações.

### Opção 1: Usar Migrações para Configurar o Esquema
Gere as migrações (caso necessário) e execute-as:

```bash
# Gerar nova migração (se aplicável)
npm run migration:generate

# Executar migrações
npm run migration:run
Opção 2: Criar Tabelas Manualmente
Caso prefira não usar migrações, você pode executar as queries SQL abaixo para criar a tabela:
```

```sql
CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  company VARCHAR(255) NOT NULL
);
```

## 4. Rodar a Aplicação
Após configurar o banco de dados e instalar as dependências, inicie o servidor local:

```bash
# Ambiente de desenvolvimento
npm run start:dev

# Ambiente de produção (compilar e rodar)
npm run build
npm run start
```
A aplicação estará disponível em http://localhost:3000.

## 5. Testes
### Testes Unitários
Para rodar os testes unitários:

```bash
npm run test
Testes End-to-End (E2E)
```

Para rodar os testes E2E:

```bash
npm run test:e2e
```

### Relatório de Cobertura
Para gerar um relatório de cobertura de testes:

```bash
npm run test:cov
```

##6. Documentação da API
Esta aplicação usa Swagger para fornecer uma interface de teste e documentação interativa da API.

Acesse a documentação em http://localhost:3000/api.

## Comandos Úteis

| Comando                    | Descrição                                       |
|----------------------------|-------------------------------------------------|
| `npm run start:dev`        | Inicia a aplicação em modo de desenvolvimento. |
| `npm run start`            | Inicia a aplicação em modo de produção.         |
| `npm run build`            | Compila o projeto TypeScript.                  |
| `npm run migration:run`    | Executa as migrações pendentes.                |
| `npm run test`             | Executa os testes unitários.                   |
| `npm run test:e2e`         | Executa os testes End-to-End (E2E).            |
| `npm run test:cov`         | Gera o relatório de cobertura de testes.       |

## 7. Contribuição
Contribuições são bem-vindas! Por favor, siga os seguintes passos:

Faça um fork do repositório.
Crie uma branch para sua feature ou correção: git checkout -b feature/nova-feature.
Faça commit das suas alterações: git commit -m "Adiciona nova feature".
Faça o push para sua branch: git push origin feature/nova-feature.
Abra um Pull Request.

## 8. Licença
Este projeto está licenciado sob a MIT License.

