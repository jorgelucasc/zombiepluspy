# ZombiePlus Automation

## Descrição
Este projeto é a parte de automação de testes utilizando Playwright, focado em boas práticas com Page Objects. Ele faz parte de um ecossistema maior que inclui uma pasta separada para o projeto principal e a API. O banco de dados PostgreSQL é utilizado localmente para os testes.

## Funcionalidades
- Automação de testes end-to-end com Playwright.
- Implementação de Page Objects para melhor organização e reutilização de código.
- Arquivo `index.js` que generaliza o objeto `page` com todos os imports necessários, eliminando a necessidade de imports em cada arquivo `spec.js`.
- Foco em boas práticas de automação, incluindo estruturação modular e manutenção.

## Pré-requisitos
- Node.js (versão recomendada: 16 ou superior)
- PostgreSQL instalado e configurado localmente
- Playwright instalado globalmente ou via npm

## Instalação
1. Clone o repositório:
    ```
    git clone <url-do-repositorio>
    cd zombieplus
    ```

2. Instale as dependências:
    ```
    npm install
    ```

3. Configure o PostgreSQL localmente e ajuste as configurações de conexão nos arquivos de configuração.

4. Instale os navegadores do Playwright:
    ```
    npx playwright install
    ```

## Uso
- Execute os testes:
  ```
  npx playwright test
  ```

- Execute testes em modo headless:
  ```
  npx playwright test --headed
  ```

- Gere relatórios:
  ```
  npx playwright show-report
  ```

## Estrutura do Projeto
- `pages/`: Contém os Page Objects.
- `tests/`: Arquivos de teste `spec.js`.
- `index.js`: Arquivo de generalização dos imports para o objeto `page`.
- Outros arquivos de configuração e utilitários.

## Tecnologias Utilizadas
- Playwright
- Node.js
- PostgreSQL

## Contribuição
Contribuições são bem-vindas. Siga as boas práticas de commit e abra issues para discussões.

## Licença
Este projeto está sob a licença MIT.