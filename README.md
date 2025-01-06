# ShortLink - URL Shortener with Traffic Monitoring

## Overview
ShortLink is a modern URL shortening service built for traffic monitoring and analysis purposes, specifically designed to support research for a diploma thesis. The application allows users to create shortened URLs while collecting valuable traffic metrics for monitoring and analysis.

## Features
- **User Authentication**
  - GitHub OAuth integration
  - Google OAuth integration
  - Secure user sessions

- **URL Management**
  - Create custom short URLs
  - Track URL usage and traffic
  - Manage personal URL collection
  - Delete unused short links


## Tech Stack
- **Frontend**
  - Next.js 14
  - TypeScript
  - Framer Motion (animations)
  - Tailwind CSS
  - Lucide React (icons)

- **Backend**
  - Next.js API routes
  - DrizzleORM
  - PostgreSQL
  - NextAuth.js

- **Monitoring**
  - Prometheus
  - Metrics collection (prom-client)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- GitHub OAuth credentials
- Google OAuth credentials

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# OAuth Providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
## Database Management Commands
Generate database schema: ```npm run db:generate```

Push changes to database: ```npm run db:push```

Open database studio: ```npm run db:studio```
