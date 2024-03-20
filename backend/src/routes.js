function routes(app) {
    app.use('/livros', require('./routes/books.js'));
    return;
  }
  
  module.exports = routes;