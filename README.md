# Backend JWT - Autenticação

Backend Node.js/Express para implementação de autenticação JWT - Atividade IFRO.

## Quick Start

1. **Instalar dependências**: `npm install`
2. **Iniciar servidor**: `npm start`
3. **URL da API**: `http://localhost:3000`

## Credenciais de Teste

- **admin** / **senha123**
- **usuario** / **senha123**

## Endpoints

| Método | Rota              | Descrição                     |
| ------ | ----------------- | ----------------------------- |
| `GET`  | `/`               | Informações da API            |
| `POST` | `/login`          | Autenticação (retorna JWT)    |
| `GET`  | `/private`        | Rota protegida (requer token) |
| `GET`  | `/status`         | Status da API                 |
| `GET`  | `/usuarios-teste` | Lista credenciais de teste    |

## Integração com Frontend React

### 1. **Login - Obter Token**

- Fazer POST para `/login` com `{username, password}`
- Armazenar token retornado no `sessionStorage`
- Usar token para requisições autenticadas

### 2. **Requisições Autenticadas**

- Incluir header: `Authorization: Bearer <token>`
- Fazer GET para `/private` para testar
- Tratar erros 401/403 para tokens inválidos

### 3. **Fluxo Básico**

1. Login Receber token
2. Armazenar token no sessionStorage
3. Incluir token no header das requisições
4. Acessar rotas protegidas

## Checklist de Integração

- [ ] **Frontend consegue fazer login** (POST `/login`)
- [ ] **Token é armazenado** no `sessionStorage`
- [ ] **Token é enviado** no header `Authorization: Bearer <token>`
- [ ] **Rota protegida funciona** (GET `/private`)
- [ ] **Erros são tratados** (401/403 para token inválido)
- [ ] **Loading states** são mostrados durante requisições
- [ ] **Logout** remove token do storage

## Tecnologias

- **Express.js** - Framework web
- **jsonwebtoken** - Geração/validação de JWT
- **bcryptjs** - Hash de senhas
- **cors** - Configuração de CORS
- **dotenv** - Gerenciamento de variáveis de ambiente

---

**Desenvolvido para atividade IFRO - Autenticação JWT**
