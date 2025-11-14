const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const { encontrarUsuarioPorUsername, validarSenha } = require('../config/database');

const router = express.Router();

// Rota POST /login - Gera JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validações básicas
    if (!username || !password) {
      return res.status(400).json({ 
        erro: 'Dados incompletos',
        mensagem: 'Username e password são obrigatórios' 
      });
    }
    
    // Buscar usuário na base de dados
    const usuario = encontrarUsuarioPorUsername(username);
    
    if (!usuario) {
      return res.status(401).json({ 
        erro: 'Credenciais inválidas',
        mensagem: 'Usuário não encontrado' 
      });
    }
    
    // Validar senha
    const senhaValida = await validarSenha(password, usuario.password);
    
    if (!senhaValida) {
      return res.status(401).json({ 
        erro: 'Credenciais inválidas',
        mensagem: 'Senha incorreta' 
      });
    }
    
    // Gerar JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        username: usuario.username,
        email: usuario.email 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    res.json({ 
      token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email
      },
      mensagem: 'Login realizado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      erro: 'Erro interno do servidor',
      mensagem: 'Tente novamente mais tarde' 
    });
  }
});

module.exports = router;