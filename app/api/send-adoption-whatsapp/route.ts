import { createClient } from "@supabase/supabase-js";
import twilio from "twilio";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(req: Request) {
  try {
    const { adoptionId } = await req.json();

    // 1️⃣ Get adoption data
    const { data: adoption } = await supabase
      .from("adoption_requests")
      .select("*")
      .eq("id", adoptionId)
      .single();

    if (!adoption || !adoption.phone) {
      return NextResponse.json({ success: false, error: "No adoption found or missing phone" });
    }

    // 2️⃣ Get pet data
    const { data: pet } = await supabase
      .from("pets")
      .select("*")
      .eq("id", adoption.pet_id)
      .single();

    if (!pet) {
      return NextResponse.json({ success: false, error: "No pet found" });
    }

    // 3️⃣ Format Phone Number (Assuming India format if no country code provided - +91)
    let formattedPhone = adoption.phone.trim();
    if (!formattedPhone.startsWith("+")) {
       formattedPhone = "+91" + formattedPhone;
    }

    // 4️⃣ Send WhatsApp using Twilio
    // Note: To actually send WhatsApp messages, TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are needed in .env.local
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      const messageBody = `*Congratulations ${adoption.full_name}!* 🎉\n\nYou have successfully adopted *${pet.pet_name}*.\n\n*Owner Details:*\nName: ${pet.owner_name || 'Shelter/Rescue'}\nEmail: ${pet.owner_email || 'N/A'}\nPhone: ${pet.owner_contact || 'N/A'}\n\nPlease contact the owner for next steps. Thank you for using PawsConnect! 🐾`;

      await client.messages.create({
        body: messageBody,
        from: process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886", // Default sandbox number
        to: `whatsapp:${formattedPhone}`
      });
    } else {
      console.warn("Twilio credentials not found in .env.local. Skipping WhatsApp notification.");
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("WhatsApp error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
