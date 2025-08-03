import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const nestJSBaseUrl = process.env.NESTJS_BASE_URL || 'http://localhost:3002';
    
    console.log('Frontend API: Fetching section by ID:', id);
    
    const response = await fetch(`${nestJSBaseUrl}/generate-sections/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Section not found' },
          { status: 404 }
        );
      }
      throw new Error(`NestJS API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Frontend API: Successfully fetched section:', id);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Frontend API: Error fetching section:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch section', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const nestJSBaseUrl = process.env.NESTJS_BASE_URL || 'http://localhost:3002';
    
    console.log('Frontend API: Deleting section by ID:', id);
    
    const response = await fetch(`${nestJSBaseUrl}/generate-sections/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Section not found' },
          { status: 404 }
        );
      }
      throw new Error(`NestJS API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Frontend API: Successfully deleted section:', id);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Frontend API: Error deleting section:', error);
    
    return NextResponse.json(
      { error: 'Failed to delete section', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 