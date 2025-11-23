# challengeBackendCS

API para gerir empresas e funcionários - Desenvolvedor Web Backend

## Como clonar e executar

1. Clonar o repositório:

   ```sh
   git clone https://github.com/Pedroklg/challengeBackendCS.git
   cd challengeBackendCS
   ```

2. Iniciar com Docker Compose (recomenda-se Docker e Docker Compose instalados):

   - Para iniciar toda a stack (MongoDB + API):
     ```sh
     docker compose up --build
     ```
   - Para apenas iniciar o MongoDB (modo detached) e rodar a API localmente:
     ```sh
     docker compose up -d mongodb
     ```

3. Executar localmente (opcional):
   - Copiar variáveis de ambiente:
     ```sh
     cp .env.example .env
     ```
     Edite [`.env.example`](.env.example) conforme necessário.
   - Instalar dependências:
     ```sh
     npm install
     ```
   - Rodar em modo desenvolvimento:
     ```sh
     npm run dev
     ```
   - Rodando com código buildado:
     ```sh
     npm run build
     npm start
     ```

## Endpoints e documentação

- API principal: http://localhost:3000/api
- Documentação Swagger: http://localhost:3000/api/docs (definida em [`swagger.yaml`](swagger.yaml) e servida por [`src/app.ts`](src/app.ts))

## Estrutura do projeto (principais diretórios)

- [src/](src/) — código-fonte
  - [src/modules/company](src/modules/company) — lógica das empresas (controllers, useCases, repositórios, testes)
  - [src/modules/employee](src/modules/employee) — lógica dos funcionários (controllers, useCases, repositórios, testes)
  - [src/shared](src/shared) — utilitários, tipos e erros (ex.: [`src/shared/utils/validateCNPJ.ts`](src/shared/utils/validateCNPJ.ts))
  - [src/db/models](src/db/models) — modelos mongoose (ex.: [`src/db/models/CompanyModel.ts`](src/db/models/CompanyModel.ts))
  - [src/routes](src/routes) — rotas da API
  - Middlewares e validação:
    - Validação de requests:
      - O middleware de validação é a função [`validate`](src/midlewares/validation.ts), que utiliza schemas do Zod para validar o `req.body` e lança [`AppError`](src/shared/AppError.ts) com status 400 em caso de erro.
      - Os schemas Zod ficam em:
        - [`src/validators/companySchemas.ts`](src/validators/companySchemas.ts) — valida dados de empresa (Create/Update).
        - [`src/validators/employeeSchemas.ts`](src/validators/employeeSchemas.ts) — valida dados de funcionário (Create/Update).
        - [`src/validators/addressSchemas.ts`](src/validators/addressSchemas.ts) — valida endereço.
      - Os validators são aplicados nas rotas com o middleware [`validate`](src/midlewares/validation.ts), por exemplo em [`src/routes/companyRoutes.ts`](src/routes/companyRoutes.ts) e [`src/routes/employeeRoutes.ts`](src/routes/employeeRoutes.ts).
    - Tratamento de erros:
      - O middleware [`errorHandler`](src/midlewares/errorHandler.ts) trata erros de aplicação (`AppError`) retornando JSON padronizado, além de tratar erros de servidor com status 500.

## Testes

- Para executar testes:
  ```sh
  npm run test
  ```
  - Testes de casos de uso ficam em `src/modules/**/tests`.
  - Teste de validação de CNPJ (exemplo de como seriam os testes para outras funções isoladas), implementado em `src/shared/utils/validateCNPJ.spec.ts`.

## Scripts úteis

Consulte os scripts em [`package.json`](package.json):

- `npm run dev` — start em modo watch
- `npm run build` — compilação TypeScript
- `npm start` — executar build compilado
- `npm run test` — executar testes (com coverage)
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` — Prettier

## Observações

- Porta padrão da API: 3000 ([`src/server.ts`](src/server.ts)).
- Em ambiente Docker, as variáveis de ambiente são definidas no [`docker-compose.yml`](docker-compose.yml).
- O projeto contém repositórios in-memory utilizados para testes (ex.: `InMemoryCompanyRepository` e `InMemoryEmployeeRepository`).
