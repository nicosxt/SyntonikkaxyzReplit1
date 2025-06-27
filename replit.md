# Replit.md - Nico Shi Portfolio

## Overview

This is a modern portfolio website for Nico Shi, a multi-disciplinary designer specializing in Protopian brands, AI, XR, and immersive art. The application is built as a full-stack web application using React for the frontend and Express.js for the backend, with PostgreSQL as the database.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom theme variables
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Database**: PostgreSQL (configured for development and production)
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL-based session storage

### Database Architecture
- **Primary Database**: PostgreSQL 16
- **ORM**: Drizzle ORM with Zod schema validation
- **Migrations**: Managed through Drizzle Kit
- **Current Schema**: Basic user management (users table with id, username, password)

## Key Components

### Frontend Components
1. **Navigation System**: Fixed navigation with theme toggle and responsive design
2. **Theme System**: Dark/light mode toggle with CSS variables and localStorage persistence
3. **Image Optimization**: Custom image loading with lazy loading, progressive enhancement, and modal viewing
4. **Case Study System**: Structured case study presentation with detailed content pages
5. **UI Components**: Comprehensive shadcn/ui component library integration

### Backend Components
1. **Route Handler**: Centralized route registration system
2. **Storage Interface**: Abstracted storage layer supporting both memory and database backends
3. **Development Server**: Vite integration for hot reload in development
4. **Static File Serving**: Production-ready static file serving

### Content Structure
- **Home Page**: Designer introduction and navigation
- **Case Studies**: Portfolio showcases (Edge City, Agartha projects)
- **Services**: Service offerings and capabilities
- **Info**: Personal philosophy and contact information

## Data Flow

1. **Client Requests**: React Router (Wouter) handles client-side navigation
2. **API Communication**: TanStack Query manages server state and caching
3. **Database Operations**: Drizzle ORM provides type-safe database interactions
4. **File Serving**: Vite dev server in development, Express static serving in production
5. **Asset Management**: Custom image optimization utilities for performance

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router
- **@radix-ui/***: Accessible UI component primitives

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **tsx**: TypeScript execution for development

### Font Assets
- **PP Neue Montreal**: Custom font family with multiple weights and styles
- **Inter**: Fallback system font

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Development Server**: Concurrent frontend (Vite) and backend (Express) servers
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend

### Production Build
- **Frontend Build**: Vite builds static assets to `dist/public`
- **Backend Build**: esbuild bundles server code to `dist/index.js`
- **Asset Serving**: Express serves static files in production
- **Database**: PostgreSQL with connection pooling via Neon/serverless

### Environment Configuration
- **Ports**: Frontend on 5000, API on 5001 (proxied to port 80/3000 externally)
- **Database URL**: Configured via `DATABASE_URL` environment variable
- **Build Commands**: `npm run build` for production, `npm run dev` for development
- **Deployment Target**: design.syntonikka.xyz via Replit Deployments

### Deployment Preparation
- **Production Build**: Static assets built to `dist/public` via Vite
- **Server Bundle**: Express server bundled to `dist/index.js` via esbuild
- **Asset Optimization**: Images and fonts optimized for production serving
- **Custom Domain**: Configured for design.syntonikka.xyz subdomain

### Image Optimization Strategy
The application uses a lightweight, CSS-based image optimization approach rather than build-time processing:
- **Lazy Loading**: Browser-native lazy loading for thumbnails
- **Progressive Enhancement**: Skeleton animations during image load
- **Hover Preloading**: Smooth modal transitions through preloading
- **Responsive Rendering**: Optimized classes for thumbnail vs full-size viewing

## Recent Changes
- **June 27, 2025 - STABLE CHECKPOINT**: Game integration and navigation system completed
  - Added GAME button to HOME page (bottom left, symmetrical to MORE button)
  - Created `/game` route leading to PlatformerPage component  
  - Enhanced PlatformerPage with starfield background for transparent game viewing
  - Added BACK button on PlatformerPage with consistent styling and left arrow navigation
  - Fixed TypeScript errors in Home.tsx animation system for proper type safety
  - Both GAME and BACK buttons use identical styling to MORE button for consistency
  - **STATUS**: Fully functional, tested, and stable - ready for major changes

- **June 23, 2025**: Implemented comprehensive site-wide animation system
  - Homepage text animations: 50% slower timing with 300ms staggered delays for smooth left-to-right reveal
  - Navigation bar: Graceful slide-down entrance with individual nav item stagger animations
  - All pages now feature consistent fade-in animations: Case Studies, Services, Info pages
  - Created global CSS animation utilities for consistent motion design
  - Built reusable `usePageAnimation` hook with customizable delays and stagger timing
  - Enhanced hover effects: scale transforms on buttons and interactive elements

## Animation System
- **CSS Animation Classes**: `.animate-fade-in`, `.animate-slide-in-left/right/up/down`, `.animate-scale-in`, `.animate-float`, `.animate-pulse-soft`
- **Stagger Delays**: `.animate-delay-100` through `.animate-delay-800` for sequential animations
- **React Hook**: `usePageAnimation` for consistent page load animations with customizable delays
- **Implementation**: Homepage demonstrates sophisticated text animations, navigation uses smooth entrance effects

## Complete Project State Checkpoint - June 27, 2025

### Current File Structure
- **Frontend Pages**: Home, CaseStudies, EdgeCityCaseStudy, AgarthaCaseStudy, Services, Info, PlatformerPage
- **Components**: Navigation, ThemeToggle, PlatformerGame, StarfieldBackground, ClickableImage, ImageModal
- **Routes**: /, /case-studies, /case-studies/edge-city, /case-studies/agartha, /services, /info, /game
- **Database**: PostgreSQL with Drizzle ORM, users table with basic authentication
- **Styling**: Tailwind CSS with custom animations, dark/light theme support

### Key Features Working
1. **Navigation System**: Fixed header with theme toggle, responsive design
2. **Animation System**: Text animations with staggered reveals, page transitions
3. **Theme System**: Dark/light mode with starfield background in dark mode
4. **Game Integration**: PlatformerGame component with canvas-based 2D platformer
5. **Case Study System**: Detailed portfolio showcases with image optimization
6. **Image System**: Modal viewing, lazy loading, optimization utilities

### Current Button Layout on HOME Page
- **Bottom Left**: GAME button (links to /game)
- **Bottom Right**: MORE button (links to /case-studies)
- Both buttons use identical styling with hover effects and animations

### Technical Stack Status
- React 18 + TypeScript + Vite
- Express.js backend with session management
- PostgreSQL database with connection pooling
- Wouter for client-side routing
- TanStack Query for server state
- Radix UI + shadcn/ui components
- All dependencies installed and working

### Environment Status
- Development server running on port 5000
- Hot reload functioning properly
- No TypeScript errors
- All routes accessible and functional

## Changelog
- June 27, 2025 - STABLE CHECKPOINT: Game integration completed
- June 23, 2025 - Initial setup with animation system

## User Preferences

Preferred communication style: Simple, everyday language.