import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/stunningso', {
      connectionFactory: (connection) => {
        console.log('🔌 Setting up MongoDB connection listeners...');
        
        connection.on('connected', () => {
          console.log('✅ MongoDB Atlas connected successfully');
          console.log('📊 Database name:', connection.name);
          console.log('🔗 Connection state:', connection.readyState);
        });
        
        connection.on('error', (error) => {
          console.error('❌ MongoDB Atlas connection error:', error);
        });
        
        connection.on('disconnected', () => {
          console.log('⚠️ MongoDB Atlas disconnected');
        });
        
        connection.on('connecting', () => {
          console.log('🔄 Connecting to MongoDB Atlas...');
        });
        
        return connection;
      },
    }),
    SectionsModule,
  ],
})
export class AppModule {} 