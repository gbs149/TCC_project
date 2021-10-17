# Projeto do TCC — Domain-Driven Design e Programação Funcional no domínio da interoperabilidade de dados na área da saúde

Projeto desenvolvido para o trabalho de conclusão do curso de Sistemas de Informação — UNISINOS

## Para executar o projeto

### Inicialização do banco de dados

Inicie o container com docker-compose e inicie uma sessão bash

`docker-compose up -d fhirbase && docker-compose exec fhirbase bash`

No container crie o banco de dados `fb`:

`psql postgres`

`CREATE DATABASE fb`

Saia do psql (`CTRL+d`) e execute `fhirbase -d fb --fhir=4.0.0 init` para inicializar o Fhirbase

### Iniciar aplicação

Após inicializar o banco de dados a aplicação pode ser iniciada com o `docker-compose up --build`
