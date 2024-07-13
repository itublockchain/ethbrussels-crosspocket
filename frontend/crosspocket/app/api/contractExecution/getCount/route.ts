import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    
  const options = {
    method: "POST",
    url: "https://api.circle.com/v1/w3s/contracts/0190a9b6-c68e-774c-9add-9944f2a41d8d/read",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`,
      accept: "application/json",
      "content-type": "application/json",
    },
    data: { abiFunctionSignature: "getCount()" },
  };

  try {
    const { data } = await axios.request(options);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Request failed:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
