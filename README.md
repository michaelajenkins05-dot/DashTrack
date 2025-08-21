# DashTrack - Personal Dashboard

A comprehensive personal dashboard built with React and Express that helps users track and manage various aspects of their daily life.

## Features

- **Music Tracking** - Manually track music listening history
- **Todo Management** - Create and manage todo lists
- **Project Management** - Track project progress and tasks
- **Habit Tracking** - Monitor daily habits and routines
- **Fitness Tracking** - Log workouts and fitness activities
- **Meal Planning** - Plan and track meals
- **Daily Schedule** - Organize daily activities
- **Calendar Integration** - Connect with iCal calendars
- **RSS Feed** - Aggregate RSS feeds
- **Budget Tracking** - Monitor expenses and budget
- **Reading Progress** - Track reading through Goodreads integration

## GitHub Pages Deployment

This application is configured to deploy to GitHub Pages at: `https://michaelajenkins05-dot.github.io/DashTrack/`

### Deployment Setup

1. **Repository Configuration**:
   - Ensure the repository is named appropriately
   - Enable GitHub Pages in repository settings
   - Set source to "GitHub Actions"

2. **Automatic Deployment**:
   - The included GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys the application
   - Triggers on pushes to the `main` branch
   - Builds the application and deploys to the `/DashTrack/` subdirectory

3. **URL Structure**:
   - Main application: `https://michaelajenkins05-dot.github.io/DashTrack/`
   - Automatic redirect from root: `https://michaelajenkins05-dot.github.io/` → `/DashTrack/`

## Development

### Prerequisites
- Node.js 20+
- npm

### Setup
```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

### Building
```bash
npm run build
```

## Architecture

- **Frontend**: React 18 with TypeScript, Vite build system
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom warm color scheme (#DD5423 based)
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing with GitHub Pages base path support
- **Backend**: Express.js with in-memory storage for MVP
- **Database**: Drizzle ORM with schema for future PostgreSQL integration

## Color Scheme

The application uses a warm color palette based on **#DD5423** (HSL: 13, 75%, 51%):
- Primary accent: Warm orange-red (#DD5423)
- Background: Dark variations of the primary hue
- Text: Light cream with orange undertones
- Cards: Dark brown gradients with orange accents

## Configuration

The application automatically detects the deployment environment:
- **Development**: Standard localhost configuration
- **Production**: GitHub Pages configuration with `/DashTrack/` base path

Environment-specific settings are managed in `client/src/config/env.ts`.