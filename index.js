const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = { customCssUrl: '/swagger-ui.css' };
const routes = require('./src/routes');
const authDocProduction = require('./src/middlewares/authDoc');
const app = express();
require('dotenv').config();

// Permitindo acesso de origens específicas
const allowedOrigins = ['https://backend-api-weld.vercel.app', 'http://localhost:4000']; // Adicione aqui os URLs de suas aplicações clientes
app.use(cors({
  origin: function (origin, callback) {
    // Verificando se a origem está na lista de origens permitidas ou se não está definida (o que indica uma requisição de API)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'test') {
  const swaggerFile = require('./swagger/swagger_output.json');
  app.get('/', (req, res) => { /* #swagger.ignore = true */ res.redirect('/doc'); });
  app.use('/doc', /*authDocProduction*/ swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));
}

routes(app);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
