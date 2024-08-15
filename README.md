# Electron React Spring

> Aplicação Desktop (Electron) utilizando front-end em React + Bootstrap + PrimeReact e backend em Spring Boot Java (17).

1. `electron`:  Versão: 31.3.1
2. `build`: Contendo scripts para build do dist do Electron e para rodar localmente.
2. `test-data-generator-ui`: Uma aplicação React + Bootstrap como front-end, baseada no projeto creado com create-react-app. 
`Npm: 10.8.2`
`Node: V22.6.0`
3. `testDataGenerator`: Uma aplicação Spring Boot 3 como backend, baseada num projeto Gradle creado pelo [Spring Initializer](https://start.spring.io/) utilizando Spring Web, Lombok, JPA e H2.

## Build Setup

O executavel pode ser encontrado na pasta `dist`.

* Não esqueça de instalar o npm, node e yarn.

Para criar o executavel siga os passos abaixo:

``` bash
# na pasta principal instalar as depedencias:
npm install

# instalar dependencias para o projeto react
cd test-data-generator-ui
npm install

# na pasta principal
# para buildar o projeto inteiro (spring e executavel)
npm run build

# para testar
npm run start
```