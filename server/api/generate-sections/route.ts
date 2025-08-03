import { nestJSClient } from '../../utils/api-client';
import { getServerConfig } from '../../utils/config';
import { GenerateSectionsRequest, GenerateSectionsResponse } from '../../types';

export async function generateSectionsHandler(requestBody: GenerateSectionsRequest): Promise<GenerateSectionsResponse> {
  const { prompt } = requestBody;

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Prompt is required and must be a string');
  }

  try {
    // Always use the real NestJS API
    console.log('Calling NestJS API with prompt:', prompt);
    const response = await nestJSClient.generateSections(prompt);
    console.log('Received response from NestJS API:', response);
    return response;
  } catch (error) {
    console.error('NestJS API request failed:', error);
    
    // In case of API failure, throw the error instead of using dummy data
    throw new Error(`Failed to generate sections: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 