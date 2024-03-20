async function authDocProduction(req, res, next) {
    const { senhaDigitada } = req.body;
  
    if (req.headers.host.includes('localhost') || req.originalUrl !== '/doc/') {
      return next();
    }
  
    if (senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
      return next();
    }
  
    if (senhaDigitada) {
      res.status(401).set('Content-Type', 'text/html');
      res.send(Buffer.from(`
        <form method="post">
          <p style="color: red;">Senha Errada!</p>
          <label for="senhaDigitada">Senha da documentação:</label>
          <input type="password" name="senhaDigitada" id="senhaDigitada"/>
          <button type "submit">Entrar</button>
        </form>
      `))
    } else {
      res.status(200).set('Content-Type', 'text/html');
      res.send(Buffer.from(`
        <form method="post">
          <label for="senhaDigitada">Senha da documentação:</label>
          <input type="password" name="senhaDigitada" id="senhaDigitada"/>
          <button type "submit">Entrar</button>
        </form>
      `))
    }
  }
  
  module.exports = authDocProduction;