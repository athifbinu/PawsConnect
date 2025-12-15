"use client";

import { Pet } from "@/types/pet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, MapPin, Calendar, Star } from "lucide-react";
import { useState } from "react";

export function PetDetailModal({ pet, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const images = [pet.main_image, ...(pet.sub_images || [])].filter(Boolean);
  if (images.length === 0) images.push("/placeholder-pet.jpg");

  const personalityArray = Array.isArray(pet.personality)
    ? pet.personality
    : typeof pet.personality === "string"
    ? pet.personality.split(",").map((p) => p.trim())
    : [];

  const getAgeLabel = (age) => {
    switch (age) {
      case "puppy":
        return "Puppy";
      case "young":
        return "Young";
      case "adult":
        return "Adult";
      case "senior":
        return "Senior";
      default:
        return age;
    }
  };

  const getEnergyColor = (level) => {
    switch (level) {
      case "low":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  /*  
  =================================================================
    🚀 RAZORPAY PAYMENT FUNCTION
  =================================================================
  */
  const handlePayment = async () => {
    try {
      // 1️⃣ Create order in backend
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: pet.adoptionFee,
          petId: pet.id,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert("Order Generation Failed!");
        return;
      }

      // 2️⃣ Open Razorpay popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "PawsConnect",
        description: `Adoption Fee for ${pet.pet_name}`,
        order_id: orderData.orderId,

        handler: async function (response) {
          // 3️⃣ Verify payment backend
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              petId: pet.id,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            window.location.href = "/adopt/success";
          } else {
            alert("Payment Verification Failed!");
          }
        },

        prefill: {
          name: "User",
          email: "user@example.com",
        },

        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-zoomIn">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {pet.pet_name}
              </DialogTitle>
              <p className="text-lg text-gray-600 mt-1">{pet.pet_category}</p>
            </div>

            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ---------------------------------------------------
                  IMAGE GALLERY
          --------------------------------------------------- */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`${pet.pet_name}-image`}
                className="w-full h-80 object-cover rounded-lg"
              />

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-3 h-3 rounded-full ${
                        i === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      i === currentImageIndex
                        ? "border-orange-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img src={image} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------------------------------------------------
                PET DETAILS
          --------------------------------------------------- */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <Badge className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {getAgeLabel(pet.age_type)}
                </Badge>

                <Badge variant="secondary" className="capitalize">
                  {pet.size}
                </Badge>

                <Badge variant="secondary" className="capitalize">
                  {pet.sex}
                </Badge>

                <Badge className={getEnergyColor(pet.energyLevel)}>
                  {pet.health_status}
                </Badge>

                <Badge className="bg-green-100 text-green-700">
                  {pet.vacsination}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{pet.location}</span>
              </div>
            </div>

            <Separator />

            {/* Personality */}
            <div>
              <h3 className="font-semibold mb-3">Personality</h3>
              <div className="flex flex-wrap gap-2">
                {personalityArray.map((trait, i) => (
                  <Badge key={i} variant="outline">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* About Section */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                About {pet.pet_name}
              </h3>

              <p className="text-gray-700 leading-relaxed mb-4">{pet.about}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-gray-600">Health Status</p>
                  <p className="text-base font-semibold text-orange-700">
                    {pet.health_status}
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-gray-600">Vaccinated</p>
                  <p className="text-base font-semibold text-green-700">
                    {pet.vacsination}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="text-base font-semibold text-blue-700 capitalize">
                    {pet.age_type}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="text-base font-semibold text-purple-700 capitalize">
                    {pet.sex}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                {pet.description}
              </p>
            </div>

            <Separator />

            {/* CTA */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Adoption Fee</p>
                  <p className="text-3xl font-bold text-orange-600">
                    ₹{pet.adoptionFee}
                  </p>
                </div>
                <Star className="h-8 w-8 text-orange-400" />
              </div>

              <Button
                onClick={() => {
                  // navigate to checkout page with pet id
                  window.location.href = `/adopt/checkout?petId=${pet.id}`;
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg"
              >
                Start Adoption Process
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
