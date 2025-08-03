import { nestJSClient } from '../../utils/api-client';
import { generateDummySections } from '../../utils/dummy-data';
import { getServerConfig } from '../../utils/config';
import { GenerateSectionsRequest, GenerateSectionsResponse } from '../../types';

export async function generateSectionsHandler(requestBody: GenerateSectionsRequest): Promise<GenerateSectionsResponse> {
  const { prompt } = requestBody;

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt is required and must be a string');
  }

  const config = getServerConfig();

  try {
    // Try to get data from NestJS API
    const response = await nestJSClient.generateSections(prompt);
    return response;
  } catch (error) {
    console.error('NestJS API request failed:', error);
    
    // Return dummy data in development mode
    if (config.isDevelopment) {
      console.log('Returning dummy data for development');
      const dummySections = generateDummySections(prompt);
      return { sections: dummySections };
    }

    // Re-throw error in production
    throw error;
  }
} 