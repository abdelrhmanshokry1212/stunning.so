# Server-Side Folder

This folder contains all server-side logic for the Stunning.so application, including API routes, utilities, and type definitions.

## Structure

```
server/
├── api/                    # Next.js API routes
│   └── generate-sections/  # Section generation endpoint
├── types/                  # TypeScript type definitions
├── utils/                  # Server utilities
│   ├── api-client.ts       # NestJS API client
│   ├── config.ts          # Server configuration
│   └── dummy-data.ts      # Dummy data generation
├── index.ts               # Main exports
└── README.md              # This file
```

## API Routes

### `/api/generate-sections`
- **Method**: POST
- **Purpose**: Generate website sections based on user prompt
- **Request Body**: `{ prompt: string }`
- **Response**: `{ sections: WebsiteSection[] }`

## Utilities

### `api-client.ts`
- NestJS API client for making requests to the backend
- Includes health check functionality
- Proper error handling and logging

### `config.ts`
- Server configuration management
- Environment variable handling
- Development/production mode detection

### `dummy-data.ts`
- Generates dummy sections for development
- Context-aware based on prompt keywords
- Supports bakery, tech, portfolio, and generic websites

## Types

### `WebsiteSection`
```typescript
interface WebsiteSection {
  name: string;
  description: string;
}
```

### `GenerateSectionsRequest`
```typescript
interface GenerateSectionsRequest {
  prompt: string;
}
```

### `GenerateSectionsResponse`
```typescript
interface GenerateSectionsResponse {
  sections: WebsiteSection[];
}
```

## Environment Variables

- `NESTJS_API_URL`: URL of the NestJS backend (default: http://localhost:3001)
- `NODE_ENV`: Environment mode (development/production)

## Usage

```typescript
import { nestJSClient, generateDummySections } from '@/server';

// Make API request
const response = await nestJSClient.generateSections("Landing page for bakery");

// Generate dummy data
const sections = generateDummySections("Tech startup website");
``` 