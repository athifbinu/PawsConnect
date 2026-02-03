"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/supabace/config";
import Image from "next/image";
import {
  CheckCircle,
  PawPrint,
  MapPin,
  Heart,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdoptionSuccessPage() {
  const params = useSearchParams();
  const adoptionId = params.get("adoptionId");

  const [adoption, setAdoption] = useState<any>(null);
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const emailSentRef = useRef(false);

  useEffect(() => {
    if (!adoptionId) return;

    const fetchData = async () => {
      const { data: adoptionData } = await supabase
        .from("adoption_requests")
        .select("*")
        .eq("id", adoptionId)
        .single();

      if (!adoptionData) {
        setLoading(false);
        return;
      }

      setAdoption(adoptionData);

      const { data: petData } = await supabase
        .from("pets")
        .select("*")
        .eq("id", adoptionData.pet_id)
        .single();

      setPet(petData);
      setLoading(false);
    };

    fetchData();
  }, [adoptionId]);

  useEffect(() => {
    if (!adoptionId || !adoption || !pet || emailSentRef.current) return;

    const storageKey = `adoption-email-${adoptionId}`;
    if (typeof window !== "undefined") {
      const alreadySent = window.sessionStorage.getItem(storageKey);
      if (alreadySent) {
        emailSentRef.current = true;
        return;
      }
    }

    const sendEmail = async () => {
      try {
        emailSentRef.current = true;
        const response = await fetch("/api/adoption/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adoption: {
              full_name: adoption.full_name,
              email: adoption.email,
              phone: adoption.phone,
              state: adoption.state,
              location: adoption.location,
              landmark: adoption.landmark,
            },
            pet: {
              pet_name: pet.pet_name,
              pet_category: pet.pet_category,
              age_type: pet.age_type,
              sex: pet.sex,
              health_status: pet.health_status,
              vaccination: pet.vaccination,
              location: pet.location,
              owner_name: pet.owner_name,
              owner_email: pet.owner_email,
              owner_contact: pet.owner_contact,
            },
          }),
        });

        if (response.ok && typeof window !== "undefined") {
          window.sessionStorage.setItem(storageKey, "true");
        }
      } catch (error) {
        console.error("Failed to send adoption email", error);
      }
    };

    sendEmail();
  }, [adoption, adoptionId, pet]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!adoption || !pet) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Failed to load adoption details
      </div>
    );
  }

  /* 📲 WHATSAPP MESSAGE */
  const whatsappMessage = encodeURIComponent(`
Hello,

I have successfully adopted *${pet.pet_name}* 🐾

Pet Details:
• Name: ${pet.pet_name}
• Category: ${pet.pet_category}
• Age: ${pet.age_type}
• Gender: ${pet.sex}
• Health: ${pet.health_status}
• Vaccination: ${pet.vaccination}
• Location: ${pet.location}

Adopter Details:
• Name: ${adoption.full_name}
• Phone: ${adoption.phone}

Please guide me with the next steps.
Thank you!
`);

  const whatsappNumber = `91${pet.owner_contact}`; // Change country code if needed

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl w-full"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 blur-xl opacity-90" />

        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="text-3xl font-bold mt-3">Adoption Confirmed 🎉</h1>
            <p className="text-gray-600 mt-2">
              You’ve taken the first step toward a lifelong friendship.
            </p>
          </div>

          {/* PET CARD */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col md:flex-row gap-6 items-center border rounded-2xl p-6 mb-8 bg-white shadow-lg"
          >
            <div className="relative">
              <Image
                src={pet.main_image}
                alt={pet.pet_name}
                width={180}
                height={180}
                className="rounded-xl object-cover shadow-md"
              />
              <Heart className="absolute -top-3 -right-3 bg-white rounded-full p-1 text-pink-500 shadow" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <PawPrint className="text-indigo-500" />
                {pet.pet_name}
              </h2>

              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={16} />
                {pet.location}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
                <Detail label="Category" value={pet.pet_category} />
                <Detail label="Age" value={pet.age_type} />
                <Detail label="Gender" value={pet.sex} />
                <Detail label="Health" value={pet.health_status} />
                <Detail label="Vaccination" value={pet.vaccination} />
                <Detail label="Personality" value={pet.personality} />
              </div>
            </div>
          </motion.div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-2 gap-6">
            <InfoBox title="Your Details">
              <p>Name: {adoption.full_name}</p>
              <p>Email: {adoption.email}</p>
              <p>Phone: {adoption.phone}</p>
            </InfoBox>

            <InfoBox title="Owner Contact">
              <p>Owner Name : {pet.owner_name}</p>
              <p>Email: {pet.owner_email}</p>
              <p>Phone: {pet.owner_contact}</p>

              {pet.owner_contact && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              )}
            </InfoBox>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Our team will contact you shortly for the next steps.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 border rounded-lg px-3 py-2 text-center">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-medium text-gray-700">{value || "—"}</p>
    </div>
  );
}

function InfoBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white border rounded-xl p-5 shadow-md"
    >
      <h3 className="font-semibold mb-3 text-lg">{title}</h3>
      <div className="text-gray-600 text-sm space-y-1">{children}</div>
    </motion.div>
  );
}
