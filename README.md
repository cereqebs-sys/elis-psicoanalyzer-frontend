# Elis Psicoanalyzer

Uma plataforma completa para gerenciar sessões de análise e documentos, desenvolvida com React, Vite, Tailwind CSS e Node.js/Express.

## 📋 Características

- **Autenticação de Usuários**: Registro e login com JWT
- **Gerenciamento de Sessões**: Criar, visualizar, atualizar e deletar sessões de análise
- **Sistema de Documentos**: Upload e gerenciamento de documentos
- **Interface Responsiva**: Design moderno com Tailwind CSS
- **API RESTful**: Backend robusto com Express.js

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

#### 1. Frontend

```bash
cd elis-psicoanalyzer
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

#### 2. Backend

```bash
cd elis-backend
npm install
npm start
```

O backend estará disponível em `http://localhost:3001`

## 📁 Estrutura do Projeto

### Frontend (Vite + React)

```
elis-psicoanalyzer/
├── src/
│   ├── pages/           # Páginas da aplicação
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Sessions.jsx
│   │   └── Documents.jsx
│   ├── services/        # Serviços de API
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

### Backend (Express.js)

```
elis-backend/
├── routes/              # Rotas da API
│   ├── auth.js
│   ├── sessions.js
│   └── documents.js
├── middleware/          # Middlewares
│   └── auth.js
├── utils/               # Utilitários
│   └── mockData.js
├── server.js
├── .env
└── package.json
```

## 🔐 Autenticação

A aplicação usa JWT (JSON Web Tokens) para autenticação. O token é armazenado no `localStorage` do navegador.

### Endpoints de Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter dados do usuário autenticado

### Exemplo de Registro

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Exemplo de Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

## 📊 Endpoints da API

### Sessões

- `GET /api/sessions` - Listar todas as sessões
- `GET /api/sessions/:id` - Obter uma sessão específica
- `POST /api/sessions` - Criar nova sessão
- `PUT /api/sessions/:id` - Atualizar sessão
- `DELETE /api/sessions/:id` - Deletar sessão

### Documentos

- `GET /api/documents` - Listar todos os documentos
- `GET /api/documents/:id` - Obter um documento específico
- `POST /api/documents` - Criar novo documento
- `PUT /api/documents/:id` - Atualizar documento
- `DELETE /api/documents/:id` - Deletar documento

## 🎨 Customização de Cores

O projeto usa Tailwind CSS com variáveis de cor customizadas. Para alterar as cores, edite o arquivo `tailwind.config.js` e `src/index.css`.

### Variáveis de Cor Disponíveis

- `--background` - Cor de fundo
- `--foreground` - Cor de texto principal
- `--primary` - Cor primária
- `--secondary` - Cor secundária
- `--muted` - Cor muted
- `--accent` - Cor de destaque
- `--destructive` - Cor de ação destrutiva

## 🔧 Variáveis de Ambiente

### Backend (.env)

```
PORT=3001
JWT_SECRET=seu_secret_jwt_muito_seguro_aqui_2024
NODE_ENV=development
```

### Frontend (vite.config.js)

```javascript
VITE_API_URL=http://localhost:5173/api
```

## 📦 Dependências Principais

### Frontend

- **React** - Biblioteca UI
- **Vite** - Build tool
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Ícones

### Backend

- **Express** - Framework web
- **CORS** - Middleware CORS
- **bcryptjs** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **dotenv** - Variáveis de ambiente

## 🚢 Deploy

### Deploy do Frontend (Vercel/Netlify)

1. Faça o build do projeto:
```bash
npm run build
```

2. Faça upload da pasta `dist` para Vercel ou Netlify

### Deploy do Backend (Heroku/Railway)

1. Crie um arquivo `Procfile`:
```
web: npm start
```

2. Faça o push para o provedor de hosting

## 🐛 Troubleshooting

### Erro de CORS

Se receber erro de CORS, verifique se o backend está configurado com a URL correta do frontend no arquivo `server.js`.

### Token Expirado

Se o token expirar, o usuário será redirecionado para a página de login automaticamente.

### Conexão Recusada

Certifique-se de que tanto o frontend quanto o backend estão rodando nas portas corretas.

## 📝 Notas

- Os dados são armazenados em memória (mock data). Para produção, integre um banco de dados real como MongoDB ou PostgreSQL.
- As senhas são hasheadas com bcryptjs antes de serem armazenadas.
- O JWT expira em 24 horas por padrão.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença ISC.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ para gerenciamento de sessões de análise.

---

**Versão:** 1.0.0  
**Última Atualização:** Dezembro de 2024
