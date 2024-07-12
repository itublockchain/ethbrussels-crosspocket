import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const options = {
    method: 'GET',
    url: 'https://api.circle.com/v1/w3s/config/entity',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
    }
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
