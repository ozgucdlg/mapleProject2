# Hospital Management System - Restructuring Plan

This document outlines the steps to reorganize the project into a more professional structure.

## Current Structure Issues
- Mixing client and server code at the same level
- Lack of clear separation between different types of components
- Scripts scattered across different directories
- Inconsistent organization pattern

## Target Structure
```
hospital-management/
├── client/                      # Frontend Angular application
│   ├── src/                     # Source files
│   │   ├── app/                 # Application code
│   │   │   ├── components/      # UI components
│   │   │   ├── core/            # Core functionality (guards, interceptors)
│   │   │   ├── features/        # Feature modules
│   │   │   ├── models/          # Data models/interfaces
│   │   │   └── services/        # Angular services
│   │   ├── assets/              # Static assets
│   │   └── environments/        # Environment configurations
│   ├── angular.json             # Angular CLI configuration
│   └── package.json             # Frontend dependencies
│
├── server/                      # Backend Node.js/Express application
│   ├── config/                  # Configuration files
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Express middleware
│   ├── models/                  # Mongoose models
│   ├── routes/                  # API routes
│   ├── utils/                   # Utility functions
│   ├── scripts/                 # Utility scripts (data seeding, testing)
│   ├── server.js                # Express app entry point
│   └── package.json             # Backend dependencies
│
├── scripts/                     # Project-level scripts
└── package.json                 # Root package.json for running both services
```

## Implementation Steps

### 1. Create Directory Structure
- [x] Create client directory
- [x] Create server/scripts directory
- [x] Create client/src/app/core directory
- [x] Create client/src/app/models directory
- [x] Create client/src/app/features directory
- [x] Create scripts directory

### 2. Move Files
1. Move current Angular app files into client directory:
   - Move src/ to client/src/
   - Move angular.json to client/
   - Create a new package.json for client based on current

2. Move server-related files:
   - Move test scripts into server/scripts/
   - Make sure models, controllers, etc. are in appropriate folders

### 3. Reorganize Components
1. Reorganize Angular app structure:
   - Move guards to core/guards/
   - Move interceptors to core/interceptors/
   - Organize components into feature modules where appropriate

### 4. Update Configuration Files
1. Create proper package.json files:
   - Root package.json with concurrency scripts
   - Client package.json with Angular dependencies
   - Server package.json with Express dependencies

### 5. Update Import Paths
- Update all import paths in Angular components
- Update all require paths in Node.js modules

### 6. Testing
- Test all key routes
- Test build process
- Test concurrent running

## Commands

Basic commands for running the restructured app:

```bash
# Install all dependencies
npm run install:all

# Run both client and server in development mode
npm run dev

# Run just the client
npm run start:client

# Run just the server
npm run start:server

# Build the client for production
npm run build
``` 