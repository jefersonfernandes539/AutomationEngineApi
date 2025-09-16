📌 Automation Engine API (NestJS)

API Backend desenvolvida em NestJS que atua como orquestrador de jobs.
Ela publica mensagens no Kafka para que o Worker em C# (RPA/Jobs) processe os dados e salve resultados no banco de dados (Postgres).

🚀 Tecnologias

NestJS
 — Framework Node.js para construir APIs escaláveis

Kafka
 — Mensageria para comunicação com o Worker

PostgreSQL
 — Banco de dados relacional

Docker
 — Contêinerização dos serviços

TypeORM
 — ORM para manipulação do banco de dados

📂 Estrutura do Projeto
```bash
src
├── app.module.ts         # Módulo principal
├── main.ts               # Bootstrap da aplicação
├── quotes
│   ├── quotes.controller.ts   # Endpoints REST
│   ├── quotes.service.ts      # Regras de negócio
│   ├── dto
│   │   └── create-quote.dto.ts
│   └── entities
│       └── quote.entity.ts
└── kafka
    ├── kafka.module.ts        # Configuração do Kafka
    └── kafka.service.ts       # Producer para enviar mensagens
```
⚙️ Configuração
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

📡 Endpoints
➤ Criar uma nova Quote (dispara job no Worker)
POST /quotes


Request Body

{
  "taskId": "123",
  "payload": {
    "type": "quote-extraction"
  }
}


Fluxo:

API publica mensagem no Kafka (robot-jobs).

Worker C# consome a mensagem, executa RPA/WebCrawler e salva no Postgres.

Worker publica resultado em robot-results.

API pode consumir robot-results (via consumer ou endpoint de callback).

🗄️ Banco de Dados

Tabela quotes:

Campo	Tipo	Descrição
id	uuid	Identificador único da Quote
text	text	Texto extraído do crawler/RPA
createdAt	timestamp	Data de criação
