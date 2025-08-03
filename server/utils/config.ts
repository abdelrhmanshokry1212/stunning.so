import { ServerConfig } from '../types';

export const getServerConfig = (): ServerConfig => {
  return {
    nestjsApiUrl: process.env.NESTJS_API_URL || 'http://localhost:3001',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  };
};

export const validateEnvironment = (): void => {
  const config = getServerConfig();
  
  if (!config.nestjsApiUrl) {
    console.warn('NESTJS_API_URL not set, using default: http://localhost:3001');
  }
  
  if (config.isDevelopment) {
    console.log('Running in development mode');
  }
  
  if (config.isProduction) {
    console.log('Running in production mode');
  }
}; 