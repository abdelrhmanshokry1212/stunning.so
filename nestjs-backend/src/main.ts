import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT || 3002;
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stunningso';
  
  console.log('🔍 Environment check:');
  console.log('📋 MONGODB_URI exists:', !!process.env.MONGODB_URI);
  console.log('📋 MONGODB_URI length:', process.env.MONGODB_URI?.length || 0);
  console.log('📋 Using URI:', mongoUri.includes('atlas') ? 'Atlas' : 'Local');
  
  await app.listen(port);
  console.log(`🚀 NestJS backend is running on port ${port}`);
  console.log(`📊 MongoDB Atlas URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);
  console.log(`🗄️ Database: stunningDB | Collection: sections`);
  console.log(`🔗 Health check: http://localhost:${port}/generate-sections/health`);
  console.log(`📝 API endpoint: http://localhost:${port}/generate-sections`);
}
bootstrap(); 