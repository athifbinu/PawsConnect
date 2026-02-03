import { NextResponse } from "next/server";
import { Resend } from "resend";

type AdoptionPayload = {
  adoption: {
    full_name: string;
    email: string;
    phone: string;
    state?: string;
    location?: string;
    landmark?: string;
  };
  pet: {
    pet_name: string;
    pet_category: string;
    age_type: string;
    sex: string;
    health_status: string;
    vaccination: string;
    location: string;
    owner_name: string;
    owner_email: string;
    owner_contact: string;
  };
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "PawsConnect <onboarding@resend.dev>";
    const ownerDestination = process.env.ADOPTION_OWNER_TO_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as AdoptionPayload;
    const { adoption, pet } = payload;

    if (!adoption?.email || !pet?.owner_email) {
      return NextResponse.json(
        { error: "Missing required adoption or owner email" },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    const ownerTo = ownerDestination || pet.owner_email;
    const adopterMessage = buildAdopterEmail(adoption, pet);
    const ownerMessage = buildOwnerEmail(adoption, pet);

    const sendResults = await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: [adoption.email],
        subject: `Adoption confirmed for ${pet.pet_name}`,
        text: adopterMessage,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [ownerTo],
        replyTo: adoption.email,
        subject: `New adoption for ${pet.pet_name}`,
        text: ownerMessage,
      }),
    ]);

    const hasFailure = sendResults.some(
      (result) => result.status === "rejected",
    );

    if (hasFailure) {
      return NextResponse.json(
        { error: "Failed to send adoption email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Adoption email error", error);
    return NextResponse.json(
      { error: "Unable to send adoption email" },
      { status: 500 },
    );
  }
}

function buildAdopterEmail(
  adoption: AdoptionPayload["adoption"],
  pet: AdoptionPayload["pet"],
) {
  return [
    `Hi ${adoption.full_name},`,
    "",
    "Your adoption payment was successful. Here are the details we sent:",
    "",
    "Pet Details:",
    `• Name: ${pet.pet_name}`,
    `• Category: ${pet.pet_category}`,
    `• Age: ${pet.age_type}`,
    `• Gender: ${pet.sex}`,
    `• Health: ${pet.health_status}`,
    `• Vaccination: ${pet.vaccination}`,
    `• Location: ${pet.location}`,
    "",
    "Owner Contact Details:",
    `• Name: ${pet.owner_name}`,
    `• Email: ${pet.owner_email}`,
    `• Phone: ${pet.owner_contact}`,
    "",
    "Your Contact Details:",
    `• Name: ${adoption.full_name}`,
    `• Email: ${adoption.email}`,
    `• Phone: ${adoption.phone}`,
    `• State: ${adoption.state ?? "—"}`,
    `• Location: ${adoption.location ?? "—"}`,
    `• Landmark: ${adoption.landmark ?? "—"}`,
    "",
    "Thank you for adopting with PawsConnect!",
  ].join("\n");
}

function buildOwnerEmail(
  adoption: AdoptionPayload["adoption"],
  pet: AdoptionPayload["pet"],
) {
  return [
    `Hello ${pet.owner_name},`,
    "",
    "A payment has been completed for adoption. Please reach out to the adopter with next steps.",
    "",
    "Pet Details:",
    `• Name: ${pet.pet_name}`,
    `• Category: ${pet.pet_category}`,
    `• Age: ${pet.age_type}`,
    `• Gender: ${pet.sex}`,
    `• Health: ${pet.health_status}`,
    `• Vaccination: ${pet.vaccination}`,
    `• Location: ${pet.location}`,
    "",
    "Adopter Details:",
    `• Name: ${adoption.full_name}`,
    `• Email: ${adoption.email}`,
    `• Phone: ${adoption.phone}`,
    `• State: ${adoption.state ?? "—"}`,
    `• Location: ${adoption.location ?? "—"}`,
    `• Landmark: ${adoption.landmark ?? "—"}`,
    "",
    "Please contact the adopter to arrange the next steps.",
  ].join("\n");
}
