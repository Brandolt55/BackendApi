const MONGOOSE = require('mongoose');
const handleExpectedErrors = require('../functions/handleExpectedErrors');

async function connectBD(req = null, res = null, next = null) {
  try {
    await MONGOOSE.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao banco de dados!')
    try { next(); } catch { };
    return MONGOOSE
  } catch (err) {
    console.error(err);
    handleExpectedErrors(res, 'Error: Erro ao conectar no banco de dados.')
    return err;
  }
}

module.exports = connectBD;