"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";

interface PetCardProps {
  pet: any;
  onClick: () => void;
}

export function PetCard({ pet, onClick }: PetCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback image if pet.images[0] is missing
  const mainImage =
    pet.images && pet.images.length > 0 && pet.images[0]
      ? pet.images[0]
      : "/placeholder-pet.jpg";

  // Convert personality string → array
  const personalityList = pet.personality
    ? pet.personality.split(",").map((p: string) => p.trim())
    : [];

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pet.main_image || "/placeholder-pet.jpg"} // correct field
            alt={pet.pet_name} // correct field
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
            onError={() => setImageError(true)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/placeholder-pet.jpg"
            alt="fallback"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Name + Type */}
      <h3 className="text-xl font-semibold">{pet.pet_name}</h3>
      <p className="text-gray-500 capitalize">{pet.type}</p>

      {/* Location */}
      <div className="flex items-center text-gray-600 text-sm mt-2">
        <MapPin size={16} className="mr-1" />
        {pet.location || "Unknown Location"}
      </div>

      {/* Personality Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {personalityList.slice(0, 3).map((trait: string) => (
          <Badge key={trait} variant="secondary" className="text-xs px-2 py-1">
            {trait}
          </Badge>
        ))}
      </div>

      {/* Adopt Button */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        View Details
      </button>
    </div>
  );
}
