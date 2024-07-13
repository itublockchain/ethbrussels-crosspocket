import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { userToken, walletId, idempotencyKey } = await req.json();

  const options = {
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/user/transactions/contractExecution',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
      accept: 'application/json',
      'content-type': 'application/json',
      'X-User-Token': userToken,
    },
    data: {
      abiFunctionSignature: 'decrement()',
      idempotencyKey: idempotencyKey,
      contractAddress: '0xdc7348edd310eade876683a2d3aeacea309c6830',
      feeLevel: 'MEDIUM',
      walletId: walletId
    }
  };

  try {
    const { data } = await axios.request(options);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}