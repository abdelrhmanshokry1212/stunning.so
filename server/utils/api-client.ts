import { getServerConfig } from './config';
import { 
  NestJSGenerateSectionsRequest, 
  NestJSGenerateSectionsResponse,
  ApiError 
} from '../types';

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL || 'http://localhost:3002';

export class NestJSClient {
  private baseUrl: string;
  private config = getServerConfig();

  constructor() {
    this.baseUrl = this.config.nestjsApiUrl;
  }

  async generateSections(prompt: string): Promise<NestJSGenerateSectionsResponse> {
    const requestBody: NestJSGenerateSectionsRequest = { prompt };
    
    try {
      const response = await fetch(`${this.baseUrl}/generate-sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`NestJS API responded with status: ${response.status}`);
      }

      const data = await response.json();
      return data as NestJSGenerateSectionsResponse;
    } catch (error) {
      console.error('NestJS API request failed:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('NestJS health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const nestJSClient = new NestJSClient(); 