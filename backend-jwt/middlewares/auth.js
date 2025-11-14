const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

// Middleware para validar JWT
const validarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      erro: 'Token não fornecido',
      mensagem: 'Header Authorization é obrigatório' 
    });
  }
  
  const token = authHeader.split(' ')[1]; // Remove "Bearer " do início
  
  if (!token) {
    return res.status(401).json({ 
      erro: 'Token inválido',
      mensagem: 'Formato esperado: Bearer <token>' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      erro: 'Token inválido',
      mensagem: 'Token expirado ou malformado' 
    });
  }
};

module.exports = { validarToken };