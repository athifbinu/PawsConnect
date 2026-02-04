import { Resend } from "resend";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

/* ✅ Create Resend client */
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    /* ✅ Read body */
    const body = await req.json();
    const adoptionId = body.adoptionId;

    if (!adoptionId) {
      return NextResponse.json(
        { error: "Missing adoptionId" },
        { status: 400 },
      );
    }

    console.log("📨 Email request for adoptionId:", adoptionId);

    /* 1️⃣ Fetch adoption */
    const { data: adoption, error: adoptionError } = await supabaseServer
      .from("adoption_requests")
      .select("*")
      .eq("id", adoptionId)
      .single();

    if (adoptionError || !adoption) {
      console.error("❌ Adoption fetch failed", adoptionError);
      return NextResponse.json(
        { error: "Adoption not found" },
        { status: 404 },
      );
    }

    /* 2️⃣ Fetch pet */
    const { data: pet, error: petError } = await supabaseServer
      .from("pets")
      .select("*")
      .eq("id", adoption.pet_id)
      .single();

    if (petError || !pet) {
      console.error("❌ Pet fetch failed", petError);
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    console.log("📤 Sending email to:", adoption.email);

    /* 3️⃣ Send email (IMPORTANT FIX HERE) */
    const emailResponse = await resend.emails.send({
      from: "Resend <onboarding@resend.dev>", // ✅ MUST BE THIS
      to: adoption.email, // binuathif@gmail.com
      subject: `Adoption Confirmed – ${pet.pet_name} 🐾`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>🎉 Adoption Successful</h2>

          <p>Hello <strong>${adoption.full_name}</strong>,</p>

          <p>
            You have successfully adopted 
            <strong>${pet.pet_name}</strong>.
          </p>

          <h3>🐶 Pet Details</h3>
          <ul>
            <li><b>Category:</b> ${pet.pet_category}</li>
            <li><b>Age:</b> ${pet.age_type}</li>
            <li><b>Gender:</b> ${pet.sex}</li>
            <li><b>Health:</b> ${pet.health_status}</li>
            <li><b>Vaccination:</b> ${pet.vaccination}</li>
          </ul>

          <h3>📞 Owner Contact</h3>
          <ul>
            <li><b>Name:</b> ${pet.owner_name}</li>
            <li><b>Email:</b> ${pet.owner_email}</li>
            <li><b>Phone:</b> ${pet.owner_contact}</li>
          </ul>

          <p>
            Our team will contact you shortly with next steps.
          </p>

          <p><strong>PawsConnect Team ❤️</strong></p>
        </div>
      `,
    });

    console.log("✅ Email sent response:", emailResponse);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 Email API error:", error);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 },
    );
  }
}
