import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, petId, petName, userName } = await req.json();
    if (!amount)
      return NextResponse.json({ error: "Missing amount" }, { status: 400 });

    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: Math.round(amount * 100), // amount is rupees -> paise
      currency: "INR",
      receipt: `adoption_rcpt_${Date.now()}`,
      payment_capture: 1,
    });

    // Optionally: Save a temporary order record in your DB with status 'created'
    // (Use Supabase or your DB) - We'll verify & finalize after signature verification.

    return NextResponse.json({ order });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
