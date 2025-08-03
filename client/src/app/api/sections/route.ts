import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const nestJSBaseUrl = process.env.NESTJS_BASE_URL || 'http://localhost:3002';
    
    console.log('Frontend API: Fetching sections from NestJS...');
    
    const response = await fetch(`${nestJSBaseUrl}/generate-sections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`NestJS API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Frontend API: Successfully fetched sections:', data.length);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Frontend API: Error fetching sections:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch sections', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 