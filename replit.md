# Overview

This is a comprehensive personal dashboard application built with React and Express that helps users track and manage various aspects of their daily life. The app provides a centralized view for music listening, todos, project management, habit tracking, fitness activities, daily scheduling, meal planning, budget tracking, and calendar integration. It's designed as a modern web application with a dark theme and responsive design using shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom dark theme variables and gradients
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **API Design**: RESTful endpoints following standard HTTP conventions
- **Development Setup**: Hot reload with Vite middleware integration
- **Storage Interface**: Abstract storage layer allowing for easy database switching

## Database Design
- **ORM**: Drizzle for type-safe SQL queries and schema management
- **Schema**: Comprehensive data models for users, music entries, todos, projects, habits, workouts, schedule items, and meals
- **Validation**: Zod schemas for runtime type validation on both client and server
- **Migrations**: Drizzle Kit for database schema versioning and deployment

## Component Architecture
- **Design System**: Modular widget-based dashboard with consistent styling patterns
- **Accessibility**: Full ARIA support through Radix UI components
- **Responsive Design**: Mobile-first approach with breakpoint-aware layouts
- **Error Handling**: Toast notifications for user feedback and error reporting
- **Loading States**: Skeleton components and loading indicators for better UX

## Development Workflow
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Code Organization**: Clear separation between client, server, and shared code
- **Path Aliases**: Configured import paths for cleaner code organization
- **Hot Reload**: Development environment with instant feedback

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Drizzle ORM**: Type-safe database operations and schema management

## UI and Styling
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants

## Development Tools
- **Vite**: Build tool and development server
- **TanStack Query**: Server state management and caching
- **Zod**: Schema validation library
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Autoprefixer

## Planned Integrations
- **Calendar Integration**: iCal API support for calendar events
- **Budget Tracking**: Copilot API integration for financial data
- **RSS Feeds**: External RSS feed aggregation
- **Reading Progress**: Goodreads or similar book tracking services

## Runtime Environment
- **Replit**: Cloud-based development and deployment platform
- **Node.js**: JavaScript runtime for server-side execution
- **Express.js**: Web application framework for API endpoints