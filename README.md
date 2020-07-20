<h1 align="center"> Condições climáticas.</h1>

<p align="center">Aplicativo que utiliza o GPS do seu dispositivo móvel para informar as condições climáticas</p>

### Pré-requisitos

- Instalar gerenciador de pacotes
  - [NPM](https://www.npmjs.com/get-npm) ou [YARN](https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable)

- Baixar as dependência do projeto de acordo com o gerenciador de pacotes
  - yarn install
  - npm install
  

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)

### API utilizada

  - [Open Weather](https://openweathermap.org/current)

  - Criando seu appid para usar na API
     - Bastar criar uma conta no [OPEN WEATHER](https://home.openweathermap.org/users/sign_up), e será enviado seu 
     appid via email.

     - Com appid, basta colocar no trecho de código seguinte: 

  ```
  const response = await api.get('weather',{
        params: {
          lat:latitude,
          lon: longitude,
          appid: "colocar seu app id"
        }
  })
```





