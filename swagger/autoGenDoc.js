const mongooseToSwagger = require('mongoose-to-swagger');
const EsquemaLivros = require('../src/models/livro.js');
const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  language: 'pt-BR'
});

const outputFile = './swagger_output.json';
const endpointsFiles = ["../index.js", "../src/routes.js"];


let doc = {
  info: {
    version: "1.0.0",
    title: "API Desafio 5",
    description: "Documentação da API - Desafio 5"
  },
  servers: [
    {
      url: "http://localhost:4000/",
      description: "Servidor localhost"
    },
    {
      url: "https://desafio5-dnc-back.vercel.app/",
      description: "Servidor de produção"
    }
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    schemas: {
      Livros: mongooseToSwagger(EsquemaLivros)
    }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  if (process.env.NODE_ENV !== 'production') require("../index.js");
})