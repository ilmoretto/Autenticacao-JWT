const express = require('express');
const { users } = require('../config/database');

const router = express.Router();

// Rota para a raiz da API
router.get('/', (req, res) => {
  res.json({
    api: 'Backend JWT - IFRO',
    status: 'online',
    endpoints: [
      'GET / - Esta página',
      'POST /login - Autenticação',
      'GET /private - Rota protegida',
      'GET /status - Status da API',
      'GET /usuarios-teste - Credenciais de teste'
    ],
    documentacao: 'Consulte o README.md para instruções detalhadas'
  });
});

// Rota para verificar status da API
router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    mensagem: 'API de Autenticação JWT funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rota para listar usuários de teste (apenas para desenvolvimento)
router.get('/usuarios-teste', (req, res) => {
  const usuariosPublicos = users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email
    // senha omitida por segurança
  }));
  
  res.json({
    usuarios: usuariosPublicos,
    instrucoes: 'Use estes usuários para testar a autenticação'
  });
});

module.exports = router;