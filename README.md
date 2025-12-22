# Flip It Backend

A backend service for the Flip It learning platform built with Node.js, Express, and Prisma.

## Prerequisites

- Node.js (v16 or higher)
- pnpm or yarn
- Docker (optional, for database)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/agnesjuliana/flip-it-server.git
cd flip-it-server
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Copy `.env.sample` to `.env.development` and configure the required variables:

```env
DATABASE_NAME=your_db_name
DATABASE_USER=your_db_user
DATABASE_PASS=your_db_password
DATABASE_PORT=5432
DATABASE_HOST=localhost
PORT=3000
NODE_ENV=development
```

### 4. Setup database

**Option A: Using Docker**

```bash
pnpm run setup:dev
```

**Option B: Manual setup**

Ensure your database is running, then proceed to the next step.

### 5. Run migrations and seed data

```bash
pnpm run migrate:dev
pnpm run seed:dev
```

### 6. Start the development server

```bash
pnpm run start:dev
```

The server will be running at `http://localhost:3000`

## Testing API Endpoints

### Using REST Client Extension (Recommended)

1. Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.RestClient) extension in VS Code
2. Open `api.rest` file in the project
3. Click "Send Request" to test endpoints

### Using Postman

Import the API endpoints into Postman for testing.

## Project Structure

- `src/` - Source code
  - `controllers/` - Route controllers
  - `services/` - Business logic
  - `repositories/` - Data access layer
  - `models/` - Data models and schemas
  - `middleware/` - Express middleware
  - `validators/` - Input validation schemas
  - `utils/` - Utility functions
  - `strategy/` - Authentication strategies
- `prisma/` - Database schema and migrations
- `api.rest` - REST API endpoints for testing

## Available Scripts

- `pnpm run start:dev` - Start development server
- `pnpm run migrate:dev` - Run Prisma migrations
- `pnpm run seed:dev` - Seed database with initial data
- `pnpm run setup:dev` - Setup Docker database

## License

MIT
