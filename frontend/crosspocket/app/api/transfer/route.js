import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const {
      idempotencyKey,
      userId,
      destinationAddress,
      refId,
      amounts,
      tokenId,
      walletId,
      userToken
    } = await req.json();

    const options = {
      method: 'POST',
      url: 'https://api.circle.com/v1/w3s/user/transactions/transfer',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
        'X-User-Token': userToken,
      },
      data: {
        idempotencyKey,
        userId,
        destinationAddress,
        refId,
        amounts,
        feeLevel: "HIGH",
        tokenId,
        walletId,
      },
    };

    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : 'Internal Server Error';

    console.error('Error response data:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
