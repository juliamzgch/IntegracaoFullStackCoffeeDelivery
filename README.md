# ☕ Integração FullStack - Coffee Delivery

Este projeto é uma aplicação fullstack construída com **NestJS (backend)** e **React + Vite (frontend)** para gerenciar e exibir cafés disponíveis em uma loja virtual, incluindo funcionalidades como visualização de detalhes e integração entre os sistemas.

---

## 🗂 Estrutura do Projeto

```
IntegracaoFullStackCoffeeDelivery/
│
├── backend/     # API NestJS + Prisma + PostgreSQL
├── frontend/    # Aplicação React com consumo da API
└── README.md
```

---

## 🚀 Como Rodar o Projeto

### 🔧 Pré-requisitos

- Node.js v18+
- PostgreSQL (ou usar Neon DB)
- Yarn ou npm

---

### 🛠️ Configuração de Ambiente

#### 1. Clone o repositório

```bash
git clone https://github.com/juliamzgch/IntegracaoFullStackCoffeeDelivery.git
cd IntegracaoFullStackCoffeeDelivery
```

#### 2. Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` com:

```
DATABASE_URL="postgresql://seu_usuario:senha@host:porta/database"
```

Rodar as migrações:

```bash
npx prisma migrate dev
```

Opcional (popular dados):

```bash
npx ts-node prisma/seed.ts
```

Iniciar o servidor:

```bash
npm run start:dev
```

#### 3. Frontend

```bash
cd ../frontend
npm install
```

Crie um arquivo `.env` com:

```
VITE_API_URL=http://localhost:3000
```

Iniciar o projeto:

```bash
npm run dev
```

---

## ✅ Funcionalidades

- [x] Listagem de cafés disponíveis (via API)
- [x] Visualização de detalhes de um café
- [x] Dados reais do banco de dados (sem mocks)
- [ ] (Opcional) Carrinho de compras e finalização de pedido

---

## 📦 Endpoints Principais (API)

- `GET /coffees` → Lista todos os cafés
- `GET /coffees/:id` → Detalhes de um café
- `POST /coffees` → Cadastrar café
- `PATCH /coffees/:id` → Atualizar café
- `DELETE /coffees/:id` → Remover café

---

## 👩‍💻 Autora

**Julia Matias Mizuguchi**  
[GitHub](https://github.com/juliamzgch)

---

## 📌 Observações

- O arquivo `.env` está corretamente oculto pelo `.gitignore`.
- Para testes locais, certifique-se de que a API esteja rodando antes de abrir o frontend.

---

## 🧪 Testando a Aplicação

1. Acesse [http://localhost:5173](http://localhost:5173)
2. Confira os cafés listados vindo do banco de dados
3. Clique para ver os detalhes (rota dinâmica)