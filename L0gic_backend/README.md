# Logic Backend - API REST com TypeORM e PostgreSQL

API REST desenvolvida em Node.js com TypeScript, utilizando TypeORM para ORM e PostgreSQL como banco de dados. A API possui validações robustas para email, telefone brasileiro e datas.

## 🚀 Funcionalidades

- ✅ CRUD completo de usuários
- ✅ Validação de email válido
- ✅ Validação de telefone brasileiro
- ✅ Validação de data de nascimento
- ✅ Todos os campos obrigatórios
- ✅ TypeORM com PostgreSQL
- ✅ Documentação Swagger
- ✅ Validações com class-validator
- ✅ Transformações com class-transformer

## 📋 Campos do Usuário

Todos os campos são **obrigatórios** e possuem validações específicas:

- **name**: Nome completo (2-255 caracteres)
- **email**: Email válido (formato padrão)
- **phone**: Telefone brasileiro válido (formato +5511999999999)
- **position**: Cargo/posição (2-255 caracteres)
- **birthDate**: Data de nascimento válida (formato YYYY-MM-DD, não pode ser no futuro)
- **message**: Mensagem (10-1000 caracteres)

## 🛠️ Tecnologias

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados
- **class-validator** - Validação de dados
- **class-transformer** - Transformação de dados
- **Swagger** - Documentação da API
- **CORS** - Cross-Origin Resource Sharing

## 📦 Instalação

### 1. Clone o repositório
\`\`\`bash
git clone <url-do-repositorio>
cd L0gic_backend
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

### 3. Configure o PostgreSQL

#### Instalar PostgreSQL:
- **Windows**: Baixe em https://www.postgresql.org/download/windows/
- **macOS**: \`brew install postgresql\`
- **Linux**: \`sudo apt-get install postgresql postgresql-contrib\`

#### Criar banco de dados:
\`\`\`sql
-- Conecte ao PostgreSQL como superuser
createdb logic_backend
\`\`\`

### 4. Configure as variáveis de ambiente
\`\`\`bash
cp .env.example .env
\`\`\`

Edite o arquivo \`.env\` com suas configurações do PostgreSQL:
\`\`\`env
# Configuração do Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=logic_backend

# Configuração do Servidor
PORT=3001
NODE_ENV=development
\`\`\`

### 5. Execute a aplicação
\`\`\`bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
\`\`\`

## 📚 Documentação da API

Após iniciar o servidor, acesse:
- **Swagger UI**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/health

## 🛠️ Endpoints

### Base URL: \`http://localhost:3001/api\`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | \`/users\` | Listar todos os usuários |
| GET | \`/users/{id}\` | Buscar usuário por ID |
| POST | \`/users\` | Criar novo usuário |
| PUT | \`/users/{id}\` | Atualizar usuário |
| DELETE | \`/users/{id}\` | Excluir usuário |

## 📝 Exemplos de Uso

### Criar Usuário
\`\`\`bash
curl -X POST http://localhost:3001/api/users \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "João Silva",
    "email": "joao.silva@exemplo.com",
    "phone": "+5511999999999",
    "position": "Desenvolvedor",
    "birthDate": "1990-05-15",
    "message": "Olá, esta é uma mensagem de teste com mais de 10 caracteres."
  }'
\`\`\`

### Resposta de Sucesso
\`\`\`json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao.silva@exemplo.com",
  "phone": "+5511999999999",
  "position": "Desenvolvedor",
  "birthDate": "1990-05-15",
  "message": "Olá, esta é uma mensagem de teste com mais de 10 caracteres.",
  "createdAt": "2025-01-02T10:30:00.000Z",
  "updatedAt": "2025-01-02T10:30:00.000Z"
}
\`\`\`

## ✅ Validações Implementadas

### Email
- Formato válido (exemplo@dominio.com)
- Unicidade (não permite emails duplicados)

### Telefone
- Formato brasileiro válido
- Aceita formatos: +5511999999999, 5511999999999, 11999999999

### Data de Nascimento
- Formato YYYY-MM-DD
- Não pode ser data futura
- Deve ser uma data válida

### Outros Campos
- **Nome**: 2-255 caracteres
- **Cargo**: 2-255 caracteres  
- **Mensagem**: 10-1000 caracteres

## 🗂️ Estrutura do Projeto

\`\`\`
src/
├── app.ts                 # Arquivo principal da aplicação
├── config/
│   ├── database.ts        # Configuração do TypeORM/PostgreSQL
│   └── swagger.ts         # Configuração do Swagger
├── controllers/
│   └── userController.ts  # Controladores da API
├── dto/
│   └── userDto.ts         # Data Transfer Objects com validações
├── entities/
│   └── User.ts            # Entidade TypeORM do usuário
├── repositories/
│   └── userRepository.ts  # Repositório de dados
├── routes/
│   ├── index.ts           # Rotas principais
│   └── userRoutes.ts      # Rotas de usuário
└── services/
    └── userService.ts     # Lógica de negócio
\`\`\`

## 🔧 Scripts Disponíveis

\`\`\`bash
npm run dev        # Executar em modo desenvolvimento
npm run build      # Compilar TypeScript
npm start          # Executar versão compilada
\`\`\`

## 🐛 Tratamento de Erros

A API retorna erros estruturados com mensagens em português:

\`\`\`json
{
  "error": "Dados inválidos: Email deve ser válido, Telefone deve ser um número brasileiro válido"
}
\`\`\`

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/nova-feature\`)
3. Commit suas mudanças (\`git commit -am 'Adiciona nova feature'\`)
4. Push para a branch (\`git push origin feature/nova-feature\`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.