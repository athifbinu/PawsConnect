"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabace/config";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function AdoptionSuccessPage() {
  const params = useSearchParams();
  const adoptionId = params.get("adoptionId");

  const [adoption, setAdoption] = useState<any>(null);
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adoptionId) return;

    const fetchData = async () => {
      /* 1️⃣ Get adoption details */
      const { data: adoptionData, error: adoptionError } = await supabase
        .from("adoption_requests")
        .select("*")
        .eq("id", adoptionId)
        .single();

      if (adoptionError || !adoptionData) {
        setLoading(false);
        return;
      }

      setAdoption(adoptionData);

      /* 2️⃣ Get pet details */
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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-8">
        {/* SUCCESS HEADER */}
        <div className="text-center mb-6">
          <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
          <h1 className="text-2xl font-bold mt-2">Adoption Successful</h1>
        </div>

        {/* PET INFO */}
        <div className="flex gap-5 items-center border p-4 rounded-xl mb-6">
          <Image
            src={pet.main_image}
            alt={pet.pet_name}
            width={140}
            height={140}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold">{pet.pet_name}</h2>
            <p className="text-gray-600">{pet.location}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Your Details</h3>
            <p>Name: {adoption.full_name}</p>
            <p>Email: {adoption.email}</p>
            <p>Phone: {adoption.phone}</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Owner Contact</h3>
            <p>Email: {pet.owner_email}</p>
            <p>Phone: {pet.owner_contact}</p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          We will contact you if verification is needed.
        </p>
      </div>
    </div>
  );
}
