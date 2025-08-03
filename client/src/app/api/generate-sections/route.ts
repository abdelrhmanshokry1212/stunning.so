import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    
    console.log('Frontend API: Received request with prompt:', requestBody.prompt);
    
    const response = await fetch('http://localhost:3002/generate-sections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: requestBody.prompt }),
    });

    if (!response.ok) {
      throw new Error(`NestJS API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Frontend API: Successfully received response from NestJS:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Frontend API: Error generating sections:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate sections', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Frontend API: Fetching all stored sections');
    
    const response = await fetch('http://localhost:3002/generate-sections', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`NestJS API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Frontend API: Successfully fetched stored sections:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Frontend API: Error fetching stored sections:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch stored sections', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 