const MONGOOSE = require('mongoose');

const esquema = new MONGOOSE.Schema(
  {
    titulo: {
      type: String,
      required: 'é obrigatório!',
    },
    paginas: {
      type: Number,
      required: 'é obrigatório!',
    },
    isbn: {
      type: String,
      required: 'é obrigatório!',
    },
    editora: {
      type: String,
      required: 'é obrigatório!',
    },
  },
  {
    timestamps: true
  }
);

const EsquemaLivros = MONGOOSE.models.Livros || MONGOOSE.model('Livros', esquema);
module.exports = EsquemaLivros;