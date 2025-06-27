# Coffee Delivery – Full-Stack Integration

Projeto final: integração completa entre Front‑end (Coffee Delivery) e Back‑end (NestJS + Prisma + PostgreSQL), consumindo dados reais via API.

---

## 🔗 Links
- Front‑end: folder `frontend/`
- Back‑end: folder `backend/`

---

## ⚙️ Requisitos

- Node.js ≥ 16
- npm ou yarn
- PostgreSQL rodando localmente ou via container Docker

---

## 🧩 Configurando o Back‑end

1. Entre na pasta:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a variável de ambiente:
   Crie `.env` em `backend/` com:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/coffee_delivery"
   ```

4. Rode as migrações:
   ```bash
   npx prisma migrate dev
   ```

5. Gere o client Prisma:
   ```bash
   npx prisma generate
   ```

6. Rode o servidor:
   ```bash
   npm run start:dev
   ```
   Ele deve rodar em `http://localhost:3000`.

---

## ☕ Testando a API

- `GET /coffees` – lista todos os cafés
- `GET /coffees/:id` – detalhes de um café
- Você pode usar ainda:
  - `POST /coffees` – criar novo café
  - `PATCH /coffees/:id` – atualizar
  - `DELETE /coffees/:id` – remover

---

## 🖥️ Configurando o Front‑end

1. Entre na pasta:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Faça o build ou rode o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Certifique‑se de que as **variáveis de ambiente** estejam apontadas para o back‑end (`http://localhost:3000`).

---

## ✅ Funcionalidades

- 🎯 Exibe lista de cafés com dados reais
- 📄 Exibe detalhes de cada café (nome, descrição, preço, tags, imagem)
- 💻 Não há dados mockados — tudo vem da API

---

## 🛠️ Sugestões de melhoria (opcional)

- Implementar carrinho (`Cart` + `Checkout`)
- Autenticação de usuário
- Adição de filtros por tags/preço no front-end
- Deploy com Heroku/Vercel/Cloudflare Pages

---

## 🚀 Como testar

1. Suba o banco (PostgreSQL) e o back‑end (`npm run start:dev`)
2. Rode o front‑end (`npm run dev`)
3. Acesse `http://localhost:5173` ou conforme sua configuração
4. Navegue entre listas de cafés e detalhes para confirmação

---

## 🧬 Estrutura dos Repositórios

```
/
├─ backend/
│   └─ src/
│       ├─ main.ts
│       ├─ coffees/
│       ├─ cart/ (opcional)
│       ├─ prisma/
│       └─ ...
└─ frontend/
    └─ src/
        ├─ App.tsx
        ├─ components/
        ├─ pages/
        └─ ...
```

---

## 💡 Contato

Qualquer problema, me chame!  
Por Julia Matias