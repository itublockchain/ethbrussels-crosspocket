import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { idempotencyKey, userToken, blockchains } = await req.json();

  const options = {
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/user/initialize',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
      'X-User-Token': userToken
    },
    data: { idempotencyKey, blockchains }
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
