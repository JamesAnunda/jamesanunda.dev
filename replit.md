# James Anunda Portfolio

## Overview

A personal portfolio website for James Anunda, a software engineer. The application showcases projects, skills, and provides a contact form that sends emails via SendGrid. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **Theme Support**: Light/dark mode via custom ThemeProvider

The frontend follows a component-based architecture with:
- `pages/` - Route-level components (Home, NotFound)
- `components/sections/` - Major page sections (Hero, About, Projects, Contact)
- `components/shared/` - Reusable components (ProjectCard, SkillTag, SectionHeader)
- `components/ui/` - Base UI components from shadcn/ui
- `components/layout/` - Layout components (Navbar, Footer)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **Development**: Hot module replacement via Vite middleware

The server uses a simple architecture:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route definitions
- `server/storage.ts` - In-memory storage interface (prepared for database integration)
- `server/vite.ts` - Vite development server integration

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Current State**: Uses in-memory storage (`MemStorage` class) for development
- **Schema Location**: `shared/schema.ts` defines database tables using Drizzle
- **Database Ready**: Drizzle config points to PostgreSQL via `DATABASE_URL` environment variable

The schema currently defines a basic `users` table, but the portfolio doesn't require persistent storage for its main features (contact form sends emails directly).

### API Structure
Single API endpoint:
- `POST /api/contact` - Receives contact form submissions and sends emails via SendGrid

## External Dependencies

### Email Service
- **SendGrid**: Used for sending contact form emails
- **Environment Variable**: `SENDGRID_API_KEY` required for email functionality
- **Fallback**: Logs warning if API key not set, returns error on send attempts

### Database
- **Neon Database**: PostgreSQL serverless driver (`@neondatabase/serverless`)
- **Environment Variable**: `DATABASE_URL` required for database operations
- **Migration Tool**: Drizzle Kit (`db:push` script)

### Build & Development
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Server-side bundling for production
- **Replit Plugins**: Runtime error overlay and cartographer for development