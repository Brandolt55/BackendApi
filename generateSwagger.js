const mongooseToSwagger = require('mongoose-to-swagger');
const EsquemaLivros = require('./src/models/livro.js');
const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  language: 'pt-BR'
});

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./src/routes.js']; // Verifique o caminho correto do seu arquivo de rotas

const doc = {
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
      url: "https://backend-api-ten-chi.vercel.app/",
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
};

// Gera a documentação Swagger com base nas rotas e no documento especificado
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Documentação Swagger gerada com sucesso!");
}).catch((err) => {
  console.error("Erro ao gerar a documentação Swagger:", err);
});
