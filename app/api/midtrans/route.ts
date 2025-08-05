import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();
  if (!amount || typeof amount !== "number" || amount < 1000) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: "Server key not configured" }, { status: 500 });
  }
  const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");

  const body = {
    transaction_details: {
      order_id: "order-" + Date.now(),
      gross_amount: amount,
    }
  };

  const midtransRes = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64ServerKey}`,
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await midtransRes.json();
  if (result.status_code && result.status_code !== "201") {
    return NextResponse.json({ error: result.status_message || "Midtrans error" }, { status: 502 });
  }
  if (!result.redirect_url) {
    return NextResponse.json({ error: "Failed to get redirect_url" }, { status: 502 });
  }
  return NextResponse.json({ redirect_url: result.redirect_url });
}