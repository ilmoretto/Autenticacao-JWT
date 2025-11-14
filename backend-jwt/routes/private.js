const express = require('express');
const { validarToken } = require('../middlewares/auth');

const router = express.Router();

// Rota GET /private - Protegida por JWT
router.get('/private', validarToken, (req, res) => {
  res.json({
    mensagem: 'Acesso autorizado à rota protegida!',
    usuario: req.usuario,
    timestamp: new Date().toISOString(),
    dados: {
      info: 'Estes são dados sensíveis que só usuários autenticados podem ver',
      nivel: 'private',
      servidor: 'Backend JWT - IFRO'
    }
  });
});

module.exports = router;