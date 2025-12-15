import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { petId } = await req.json();

    const order = await razorpay.orders.create({
      amount: 500 * 100,
      currency: "INR",
      receipt: `pet_${petId}`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
