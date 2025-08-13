# Overview

TaskFlow is a full-stack task management application built with React, Express, and PostgreSQL. It provides a modern web interface for creating, managing, and organizing tasks with features like search, filtering, priority levels, and assignee management. The application follows a monorepo structure with shared schemas and clean separation between client and server code.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation integration

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with CRUD operations for tasks
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot module replacement with Vite integration

## Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless hosting
- **Migrations**: Drizzle Kit for schema migrations
- **Schema**: Centralized schema definitions in shared directory

## Data Storage Solutions
- **Primary Database**: PostgreSQL for persistent task storage
- **In-Memory Storage**: Fallback MemStorage class for development/testing
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Schema Design**: Tasks table with fields for title, description, status, priority, due dates, and assignee information

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL backend storage
- **Security**: CORS configuration and request validation
- **No Authentication**: Currently implements basic session handling without user authentication

## Development and Build Process
- **Monorepo Structure**: Shared types and schemas between client and server
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)
- **Development**: Concurrent development server with hot reload
- **Type Safety**: End-to-end TypeScript with shared schema validation

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting service
- **Connection**: @neondatabase/serverless driver for database connectivity

## UI and Styling
- **Shadcn/ui**: Complete UI component library built on Radix UI
- **Radix UI**: Headless UI primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Frontend build tool with React plugin and hot reload
- **Drizzle Kit**: Database schema management and migrations
- **TypeScript**: Type checking and development experience
- **ESBuild**: Server-side bundling for production builds

## Runtime Dependencies
- **Express**: Web server framework with middleware support
- **React Query**: Server state management and caching
- **React Hook Form**: Form validation and handling
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation and formatting utilities

## Optional Integrations
- **Replit Integration**: Development environment plugins and error overlays
- **Font Loading**: Google Fonts integration for typography
- **Development Banner**: Replit development environment indicators