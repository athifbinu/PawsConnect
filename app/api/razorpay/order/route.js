import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, petId } = body;

    if (!amount || !petId) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing amount or petId" }),
        { status: 400 }
      );
    }

    let razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_order_${petId}`,
    });

    return new Response(JSON.stringify({ success: true, orderId: order.id }), {
      status: 200,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
