// Server-side types for API communication

export interface GenerateSectionsRequest {
  prompt: string;
}

export interface WebsiteSection {
  name: string;
  description: string;
}

export interface GenerateSectionsResponse {
  sections: WebsiteSection[];
}

export interface ApiError {
  error: string;
  status?: number;
}

// NestJS API types
export interface NestJSGenerateSectionsRequest {
  prompt: string;
}

export interface NestJSGenerateSectionsResponse {
  sections: WebsiteSection[];
}

// Environment configuration
export interface ServerConfig {
  nestjsApiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
} 