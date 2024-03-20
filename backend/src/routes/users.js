const express = require('express');
const connectBD = require('../middlewares/connectBD');
const router = express.Router();

/* GET users listing. */
router.get('/', connectBD, function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;