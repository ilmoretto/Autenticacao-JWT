const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');

// Importar rotas
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
const publicRoutes = require('./routes/public');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Registrar rotas
app.use('/', authRoutes);
app.use('/', privateRoutes);
app.use('/', publicRoutes);

// Middleware para capturar rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    mensagem: `A rota ${req.method} ${req.originalUrl} não existe`,
    rotasDisponiveis: [
      'GET / - Informações da API',
      'POST /login',
      'GET /private',
      'GET /status',
      'GET /usuarios-teste'
    ]
  });
});

// Middleware global de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    erro: 'Erro interno do servidor',
    mensagem: 'Algo deu errado no processamento da requisição'
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`   Servidor rodando na porta ${PORT}`);
  console.log(`   URL: http://localhost:${PORT}`);
});

module.exports = app;