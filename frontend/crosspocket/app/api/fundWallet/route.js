import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { address } = await req.json();

    const options = {
      method: 'POST',
      url: 'https://api.circle.com/v1/faucet/drips',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
      },
      data: {
        address,
        blockchain: 'ETH-SEPOLIA',
        native: false,
        usdc: true,
        eurc: false,
      },
    };

    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : 'Internal Server Error';

    if (status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      console.error(`Too Many Requests: Retry after ${retryAfter} seconds`);
      return NextResponse.json(
        { error: `Too Many Requests. Please try again after ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    console.error('Error response data:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
