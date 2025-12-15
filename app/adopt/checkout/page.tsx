"use client";

import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const params = useSearchParams();
  const petId = params.get("petId");

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Order creation failed");
        console.error("Order API response:", data);
        return;
      }

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

        theme: {
          color: "#f97316",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Adoption Checkout</h1>

      <button
        onClick={handlePayment}
        className="w-full bg-orange-500 text-white py-3 rounded-lg"
      >
        Pay Adoption Fee (Test Mode)
      </button>
    </div>
  );
}
