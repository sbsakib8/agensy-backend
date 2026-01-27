# Server (Express + TypeScript)

## Quick Start

### Install dependencies:

```bash
cd "server"
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FIREBASE_API_KEY` - Firebase API key
- `ADMIN_SECRET` - Admin authentication secret
- `SMTP_*` - Email service configuration
- `FRONTEND_URL` - Frontend application URL

### Development:

```bash
npm run dev
```

This runs the server on `http://localhost:4000` by default.

### Build and start (production):

```bash
npm run build
npm run start
```

## Architecture Notes

This project uses two MongoDB connection modules:
- `src/db.ts` - Legacy connection with collection helpers, indexes, and type interfaces (used by auth, user, product routes)
- `src/config/db.ts` - Newer native driver connection (used by newer modules: pricing, products, projects, services, team)

Both connections point to the same database and work concurrently.
