"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../../supabace/config";

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  state: string;
  location: string;
  landmark: string;
};

export default function CheckoutPage() {
  const params = useSearchParams();
  const petId = params.get("petId");

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    full_name: "",
    email: "",
    phone: "",
    state: "",
    location: "",
    landmark: "",
  });

  // ✅ Properly typed change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!petId) {
      alert("Pet ID missing");
      return;
    }

    try {
      setLoading(true);

      // Save adoption data
      const { data: adoption, error } = await supabase
        .from("adoption_requests")
        .insert([{ pet_id: petId, ...form }])
        .select("id")
        .single();

      if (error || !adoption) {
        alert("Failed to save adoption");
        return;
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 50000,
        currency: "INR",
        name: "Pet Adoption",
        description: "Adoption Fee",
        handler: () => {
          window.location.href = `/adopt/success?adoptionId=${adoption.id}`;
        },
      };

      // ✅ Browser safety
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        new (window as any).Razorpay(options).open();
      } else {
        alert("Razorpay not loaded");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Adoption Details
        </h1>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key as keyof FormState]}
            placeholder={key.replace("_", " ").toUpperCase()}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-3"
            required
          />
        ))}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg"
        >
          {loading ? "Processing..." : "Pay & Adopt"}
        </button>
      </div>
    </div>
  );
}
