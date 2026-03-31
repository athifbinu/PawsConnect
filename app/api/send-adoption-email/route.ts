import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Supabase admin client
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

    if (!adoption) {
      return Response.json({ success: false, error: "No adoption found" });
    }

    // 2️⃣ Get pet data
    const { data: pet } = await supabase
      .from("pets")
      .select("*")
      .eq("id", adoption.pet_id)
      .single();

    if (!pet) {
      return Response.json({ success: false, error: "No pet found" });
    }

    // 3️⃣ Send email to adopter
    await resend.emails.send({
      from: "Pet Adoption <onboarding@resend.dev>",
      to: [adoption.email],
      subject: "Adoption Successful 🎉",
      html: `
        <h2>Congratulations ${adoption.full_name} 🎉</h2>
        <p>You have successfully adopted <strong>${pet.pet_name}</strong></p>

        <h3>Owner Contact Details</h3>
        <p><strong>Name:</strong> ${pet.owner_name}</p>
        <p><strong>Email:</strong> ${pet.owner_email}</p>
        <p><strong>Phone:</strong> ${pet.owner_contact}</p>

        <br/>
        <p>Please contact the owner for next steps.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return Response.json({ success: false, error: err.message });
  }
}
