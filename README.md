# API de Usuários — Node.js + PostgreSQL

API RESTful para cadastro e gerenciamento de usuários, desenvolvida com Node.js, Express e PostgreSQL.

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg](https://node-postgres.com/) — cliente PostgreSQL para Node
- [bcrypt](https://www.npmjs.com/package/bcrypt) — hash de senhas
- [dotenv](https://www.npmjs.com/package/dotenv) — variáveis de ambiente

---

## Estrutura do Projeto

```
projeto/
│
├── src/
│   ├── controllers/
│   │   └── usuarioController.js
│   ├── database/
│   │   └── db.js
│   ├── routes/
│   │   └── usuarioRoutes.js
│   └── services/
│       └── usuarioService.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e rodando

### Passo a passo

1. Clone o repositório
```bash
git clone https://github.com/Marcoz-VS/Backend_Usuarios.git
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente

Preencha o `.env` com suas credenciais do PostgreSQL.

4. Rode o projeto em desenvolvimento
```bash
npm run dev
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
```

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /usuarios | Cadastrar novo usuário |
| GET | /usuarios | Listar todos os usuários |
| GET | /usuarios/:id | Buscar usuário por ID |
| PUT | /usuarios/:id | Atualizar usuário |
| DELETE | /usuarios/:id | Remover usuário |

---

## Exemplo de Body — POST /usuarios

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

---

## Segurança

- Senhas armazenadas com hash `bcrypt`
- Senha nunca retornada nas respostas da API
- E-mails duplicados não são permitidos
- Validação de formato de e-mail
- Senha com mínimo de 6 caracteres

---

## Projeto desenvolvido para

SENAI SC — Prof. Luciano Jandrey
