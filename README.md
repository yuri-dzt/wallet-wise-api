# 💸 WalletWise — AI Expense Categorizer

> Categorize automaticamente seus gastos com Inteligência Artificial.  
> Um projeto experimental criado com **Node.js**, **Express.js**, **TypeScript** e **OpenAI API**, focado em Clean Architecture, DDD e TDD.

---

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5.x-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-API-purple)

---

## 🚀 Tecnologias

- ⚡ **Express.js** — servidor web rápido e flexível  
- 🧩 **TypeScript** — segurança e clareza no código  
- 🤖 **OpenAI API** — categorização automática de despesas  
- 🧰 **pnpm** — gerenciador de pacotes eficiente  
- 🧪 **Vitest** — para testes automatizados  

---

## ✨ Features

- ✅ Adicionar gastos manualmente  
- ✅ Categorizar despesas automaticamente usando IA  
- ✅ Listar despesas por categoria  
- ✅ Validação de dados no domínio (ex.: valor positivo, descrição não vazia)   

---

## 📂 Estrutura do projeto

```bash
src/
 ├── app/
 │    └── use-cases/ 
 ├── contracts/
 │    ├── controllers/
 │    └── services/
 ├── infra/
 │    ├── controllers/
 │    ├── factories/
 │    ├── routes/
 │    ├── schemas/
 │    ├── services/
 │    ├── app.ts
 │    ├── logger.ts
 │    └── server.ts
__tests__/
  ├── app/
  │    └── use-cases/
.env
package.json
tsconfig.json
```

O projeto foi estruturado para facilitar manutenção, testes e evolução futura (Clean Architecture, DDD, TDD).

⚙️ Instalação e uso

1️⃣ Clonar o repositório
```bash
git clone https://github.com/yuri-dzt/wallet-wise-api.git
cd wallet-wise-api
```

2️⃣ Instalar dependências
```bash
pnpm install
```

3️⃣ Criar o arquivo .env na raiz:
```bash
OPENAI_API_KEY=coloque_sua_chave_aqui
DATABASE_URL=coloque_a_url_do_seu_banco_aqui
PORT=coloque_a_porta_que_sua_api_ira_rodar_aqui
```

4️⃣ Rodar o servidor
```bash
pnpm dev
```

O servidor estará rodando em:
```bash
http://localhost:4000
```

🧩 Endpoints principais
Adicionar gasto
```bash
POST /expenses
```

📥 Request body:
```bash
{
  "description": "Uber até o trabalho",
  "amount": 25.50
}
```

📤 Response:
```bash
{
  "id": 1,
  "description": "Uber até o trabalho",
  "amount": 25.50,
  "category": "Transporte"
}
```

Listar gastos por categoria
```bash
GET /api/expenses?category=transporte
```

🧠 Como funciona
- O usuário envia a descrição do gasto.
- O servidor envia para a API da OpenAI para sugerir a categoria.
- O gasto é salvo no banco com a categoria sugerida.
- O usuário pode consultar ou listar gastos filtrando por categoria.

🧭 Objetivo do projeto
- Aprender integração com IA (OpenAI)
- Praticar boas práticas de arquitetura (DDD, TDD, Clean Architecture)
- Criar uma API modular, testável e escalável

🛠 Contribuição
- Contribuições são bem-vindas!

Para contribuir:
- Faça um fork do projeto
- Crie uma branch para sua feature: git checkout -b feature/nome-da-feature
- Faça commit das alterações: git commit -m "feat: descrição"
- Envie para o repositório remoto: git push origin feature/nome-da-feature
- Abra um Pull Request

💡 Futuras melhorias
- 🔑 Sistema de login e contas de usuário
- 🌐 Interface web para gerenciamento de gastos
- 🗂 Histórico de despesas e relatórios
- 📊 Estatísticas e gráficos de gastos
- 🚀 Suporte a múltiplas moedas e formatos de importação

🧑‍💻 Autor
- Feito por Yuri Donizete