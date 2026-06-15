# Continuous Integration Project

## Descrição

Este projeto foi desenvolvido como trabalho final da disciplina de Integração Contínua da pós-graduação.

A aplicação consiste em um serviço simples de pagamentos desenvolvido em JavaScript, contendo testes automatizados para validar regras de negócio relacionadas ao processamento de pagamentos.

O principal objetivo deste trabalho é demonstrar a implementação de uma pipeline de Integração Contínua (CI) utilizando GitHub Actions.

---

## Tecnologias Utilizadas

* JavaScript
* Node.js
* Mocha
* GitHub Actions

---

## Estrutura do Projeto

```text
.
├── .github
│   └── workflows
│       └── ci.yml
├── src
│   └── servicoDePagamento.js
├── test
│   └── servicoDePagamento.test.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Funcionalidade

O sistema permite registrar pagamentos e classificá-los de acordo com seu valor:

* Pagamentos acima de R$ 100,00 são classificados como **cara**.
* Pagamentos menores ou iguais a R$ 100,00 são classificados como **padrão**.
* É possível consultar o último pagamento realizado.

---

## Testes Automatizados

Foram implementados testes automatizados para validar os seguintes cenários:

* Cadastro de pagamento acima de R$ 100,00.
* Cadastro de pagamento abaixo de R$ 100,00.
* Validação do valor exato de R$ 100,00.
* Consulta do último pagamento realizado.

Os testes são executados automaticamente pela pipeline durante cada execução.

---

## Pipeline de Integração Contínua

A pipeline foi implementada utilizando GitHub Actions através do arquivo:

```text
.github/workflows/ci.yml
```

### Execução por Push

A pipeline é executada automaticamente sempre que um push é realizado na branch principal.

```yaml
on:
  push:
    branches:
      - main
```

### Execução Manual

Também é possível executar a pipeline manualmente através da opção **Run workflow** disponível na aba Actions do GitHub.

```yaml
on:
  workflow_dispatch:
```

### Execução Agendada

A pipeline possui execução automática agendada utilizando cron.

```yaml
schedule:
  - cron: '*/10 * * * *'
```

---

## Etapas da Pipeline

Durante sua execução, a pipeline realiza:

1. Checkout do código-fonte.
2. Configuração do ambiente Node.js.
3. Instalação das dependências do projeto.
4. Execução dos testes automatizados.
5. Geração do relatório de testes.
6. Armazenamento do relatório como Artifact.

---

## Relatório de Testes

O relatório é gerado utilizando o pacote `mocha-junit-reporter`.

Script utilizado:

```json
"test:report": "mocha --reporter mocha-junit-reporter --reporter-options mochaFile=reports/test-results.xml"
```

O relatório é disponibilizado como Artifact em cada execução da pipeline.

```yaml
- name: Salvando relatórios de testes
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: reports/
```

---

## Autor

Kevin Blair

Trabalho desenvolvido para a disciplina de Integração Contínua da Pós-Graduação.
