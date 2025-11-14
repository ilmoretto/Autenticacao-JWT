const bcrypt = require("bcryptjs");

// Base de dados simulada (em produção usar um banco real)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0.9Y.UJ.5SaD.bJ6T8P9.QP.tE5.rO5HO', // senha: 123456
    email: 'admin@teste.com'
  },
  {
    id: 2,
    username: 'usuario',
    password: '$2a$10$QzGjguoTwYECtNN5uzMK0ecpPHQC3/Jo8bf8iC668/1l7IttpxHNW', // senha: senha123
    email: 'usuario@teste.com'
  }
];

// Função para gerar hash de senha (útil para criar novos usuários)
const gerarHashSenha = async (senha) => {
	return await bcrypt.hash(senha, 10);
};

// Função para encontrar usuário por username
const encontrarUsuarioPorUsername = (username) => {
	return users.find((user) => user.username === username);
};

// Função para validar senha
const validarSenha = async (senha, hash) => {
	return await bcrypt.compare(senha, hash);
};

module.exports = {
	users,
	gerarHashSenha,
	encontrarUsuarioPorUsername,
	validarSenha,
};
