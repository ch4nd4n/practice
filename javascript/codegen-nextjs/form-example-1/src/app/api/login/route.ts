import { NextResponse } from 'next/server';

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Simulate authentication check
    // In a real application, you would validate against a database
    if (email === 'test@example.com' && password === 'password123') {
      // Successful login
      return NextResponse.json(
        {
          success: true,
          user: {
            id: 1,
            email: email,
            name: 'Test User'
          },
          token: 'mock-jwt-token'
        },
        { status: 200 }
      );
    }

    // Failed login
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid email or password'
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}