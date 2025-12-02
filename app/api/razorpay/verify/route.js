import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// initialize Supabase client (you likely have this in your lib or supabace folder — just reuse that)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // or anon key based on your setup
);

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      petId,
      userId,
    } = data;

    // verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid signature" }),
        { status: 400 }
      );
    }

    // signature valid → save adoption/payment record
    const { data: saved, error } = await supabase
      .from("adoptions") // you need to create this table in Supabase
      .insert({
        pet_id: petId,
        user_id: userId,
        razorpay_order_id,
        razorpay_payment_id,
        status: "completed",
        paid_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true, adoption: saved }), {
      status: 200,
    });
  } catch (err) {
    console.error("Verify route error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
