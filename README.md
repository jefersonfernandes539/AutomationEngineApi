# 🤖 Automation Engine API

API desenvolvida em **NestJS** que atua como **orquestrador** para o Engine.  
Ela publica mensagens no **Kafka** para que o Worker em **C# (RPA/Jobs)** processe e retorne os resultados.

---

## 🚀 Tecnologias
- [NestJS](https://nestjs.com/) — Framework Node.js
- [KafkaJS](https://kafka.js.org/) — Cliente Kafka para Node
- [Docker](https://www.docker.com/) — Contêinerização dos serviços
- [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Estrutura do Projeto

```bash
src
├── infra/ # Infraestrutura (Kafka, conexões, adapters)
│ ├── kafka.module.ts
│ └── kafka.service.ts
├── robots/ # Domínio principal (Robôs / Jobs)
│ ├── robots.controller.ts # Endpoints REST
│ ├── robots.module.ts # Módulo de robôs
│ └── robots.service.ts # Regras de negócio
├── app.module.ts # Módulo raiz
└── main.ts # Bootstrap da aplicação e config swagger
```
## ⚙️ Configuração
1. Variáveis de Ambiente (.env)

Crie um arquivo .env na raiz com as seguintes configs:

# Aplicação
PORT=3000

# Kafka
KAFKA_BROKER=localhost:9092
KAFKA_CONSUME_TOPIC=robot-results
KAFKA_PRODUCE_TOPIC=robot-jobs

# Banco
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=automation_db

2. Instalação
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run start:dev

## 📡 Endpoints
➤ Criar uma nova Quote (dispara job no Worker)
POST /quotes


Request Body

{
  "taskId": "123",
  "payload": {
    "type": "quote-extraction"
  }
}

