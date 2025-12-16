"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/supabace/config";

export default function CheckoutPage() {
  const params = useSearchParams();
  const petId = params.get("petId");

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    state: "",
    location: "",
    landmark: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Save form to Supabase
      const { error } = await supabase.from("adoption_requests").insert([
        {
          pet_id: petId,
          ...form,
        },
      ]);

      if (error) {
        alert("Failed to save adoption details");
        console.error(error);
        setLoading(false);
        return;
      }

      // 2️⃣ Create Razorpay order
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Order creation failed");
        setLoading(false);
        return;
      }

      // 3️⃣ Razorpay popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "PawsConnect (Test)",
        description: "Pet Adoption Fee",
        order_id: data.orderId,

        handler: function () {
          window.location.href = "/adopt/success";
        },

        prefill: {
          name: form.full_name,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#f97316",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Adoption Details
        </h1>

        <div className="space-y-4">
          <input
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="phone"
            placeholder="Contact Number"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            name="landmark"
            placeholder="Nearby Landmark"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Adoption Fee (Test)"}
        </button>
      </div>
    </div>
  );
}
