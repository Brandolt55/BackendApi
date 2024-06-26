const express = require('express');
const connectBD = require('../middlewares/connectBD');
const EsquemaLivros = require('../models/livro');
const router = express.Router();

router.post('/criar', connectBD, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    let { titulo, paginas, isbn, editora } = req.body;
    const respostaBD = await EsquemaLivros.create({ titulo, paginas, isbn, editora });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro criado com sucesso",
      resposta: respostaBD
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao criar o livro." });
  }
});

router.put('/editar/:id', connectBD, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    let idBook = req.params.id
    let { titulo, paginas, isbn, editora } = req.body;

    const checkBook = await EsquemaLivros.findOne({ _id: idBook });
    if (!checkBook) throw new Error("Livro não encontrado")

    const updateBooks = await EsquemaLivros.updateOne({ _id: idBook }, { titulo, paginas, isbn, editora });

    if (updateBooks?.modifiedCount > 0) {
      const dataBooks = await EsquemaLivros.findOne({ _id: idBook });

      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro atualizado com sucesso",
        resposta: dataBooks
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao atualizar o livro." });
  }
});

router.get('/obter/livros', connectBD, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    // #swagger.description = "Endpoint para obter todos os livros no banco de dados."
    const respostaBD = await EsquemaLivros.find();

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livros obtidos com sucesso",
      resposta: respostaBD
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao obter os livros." });
  }
});

router.get('/obter/livros/:id', connectBD, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    // #swagger.description = "Endpoint para obter o livro via ID no banco de dados."

    let idBook = req.params.id;

    const checkBook = await EsquemaLivros.findOne({ _id: idBook })
    if (!checkBook) throw new Error(`Livro não encontrado.`)

    const respostaBD = await EsquemaLivros.findOne({ _id: idBook });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro listado na resposta com sucesso",
      resposta: respostaBD
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao obter o livro." });
  }
});

router.delete('/deletar/:id', connectBD, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    // #swagger.description = "Endpoint para deletar um livro pelo ID no banco de dados."

    let idBook = req.params.id;

    const checkBook = await EsquemaLivros.findOne({ _id: idBook })
    if (!checkBook) throw new Error(`Livro não encontrado.`)

    const respostaBD = await EsquemaLivros.deleteOne({ _id: idBook });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro deletado com sucesso",
      resposta: respostaBD
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao deletar o livro." });
  }
});

module.exports = router;
