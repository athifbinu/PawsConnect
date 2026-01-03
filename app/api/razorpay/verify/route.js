import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Check Razorpay secret
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Razorpay secret not configured" },
        { status: 500 }
      );
    }

    // Generate signature
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Compare signature
    const isValid = generatedSignature === razorpay_signature;

    return NextResponse.json({ success: isValid });
  } catch (error) {
    console.error("Razorpay verification error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
