# NestJS Backend for Stunning.so

This is the NestJS backend API for the Stunning.so website generator application.

## Features

- **Generate Website Sections**: API endpoint to generate website sections based on user prompts
- **Smart Content Generation**: Context-aware section generation based on prompt keywords
- **Health Check**: Endpoint to verify API status
- **CORS Enabled**: Configured for frontend integration

## API Endpoints

### POST `/api/generate-sections`
Generate website sections based on a prompt.

**Request Body:**
```json
{
  "prompt": "Landing page for bakery"
}
```

**Response:**
```json
{
  "sections": [
    {
      "name": "Hero Section",
      "description": "A compelling hero section with a headline, subheading, and call-to-action button that captures the essence of your food business."
    },
    {
      "name": "About Section",
      "description": "An about section showcasing your business's story, values, and what makes your products special and unique."
    },
    {
      "name": "Contact Section",
      "description": "A contact section with your business's location, phone number, email, and business hours for easy customer communication."
    }
  ]
}
```

### GET `/api/generate-sections/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run start:dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm run start:prod
   ```

## Development

- **Port**: 3001 (configurable via PORT environment variable)
- **CORS**: Enabled for localhost:3000 and localhost:3001
- **Hot Reload**: Enabled in development mode

## Integration with Frontend

The frontend (Next.js) is configured to connect to this backend via the `NESTJS_API_URL` environment variable:

```bash
# In client/.env.local
NESTJS_API_URL=http://localhost:3001
```

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── app.module.ts             # Root module
└── sections/
    ├── sections.controller.ts # API controller
    ├── sections.service.ts    # Business logic
    ├── dto/
    │   └── generate-sections.dto.ts
    └── interfaces/
        └── generate-sections.interface.ts
```

## Future Enhancements

- AI/ML integration for smarter content generation
- Database integration for storing generated sections
- Authentication and user management
- Rate limiting and API security
- Caching for improved performance 