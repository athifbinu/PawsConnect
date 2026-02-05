"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Dog, Cat, Bird, Rabbit } from "lucide-react";

interface PetCardProps {
  pet: any;
  onClick: () => void;
  className?: string; // ✅ added
  style?: React.CSSProperties; // ✅ added
}

export function PetCard({ pet, onClick, className = "", style }: PetCardProps) {
  const [imageError, setImageError] = useState(false);

  const mainImage =
    pet?.main_image && !imageError ? pet.main_image : "/placeholder-pet.jpg";

  const personalityList = pet?.personality
    ? pet.personality.split(",").map((p: string) => p.trim())
    : [];

  const categoryIcons: Record<string, any> = {
    dog: Dog,
    cat: Cat,
    bird: Bird,
    rabbit: Rabbit,
  };

  const Icon = categoryIcons[pet?.pet_category?.toLowerCase()] || Dog;

  return (
    <div
      onClick={onClick}
      style={style} // ✅ applied
      className={`
        bg-white/60 backdrop-blur-xl 
        rounded-2xl shadow-lg 
        hover:shadow-2xl 
        border border-white/40 
        transition-all duration-500 
        hover:scale-[1.04] 
        cursor-pointer 
        overflow-hidden
        mx-auto
        w-full sm:w-[350px]
        mb-10
        ${className}                    // ✅ applied
      `}
    >
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden group">
        <img
          src={mainImage}
          alt={pet?.pet_name ?? "Pet"}
          className="
            w-full h-full object-cover 
            transition-transform duration-[1000ms]
            group-hover:scale-105
          "
          onError={() => setImageError(true)}
        />

        {/* Heart Icon */}
        <div className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition">
          <Heart size={18} />
        </div>

        {/* Category Icon */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full shadow-md">
          <Icon size={20} />
        </div>

        {/* Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
          <h3 className="text-xl font-semibold">{pet?.pet_name}</h3>
          <p className="text-sm opacity-90 capitalize">{pet?.age_type}</p>
        </div>
      </div>

      {/* Details */}
      <div className="p-2">
        <div className="flex items-center justify-between text-gray-700 text-sm">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1 text-blue-600" />
            {pet?.location || "Unknown"}
          </div>

          <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            <Icon size={14} />
            {pet?.pet_category}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {personalityList.slice(0, 3).map((trait: string) => (
            <Badge
              key={trait}
              className="text-[10px] px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
            >
              {trait}
            </Badge>
          ))}
        </div>

        {pet?.vacsination && (
          <div className="mt-3">
            <Badge className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white">
              {pet.vacsination}
            </Badge>
          </div>
        )}

        <button className="mt-5 w-full py-2 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:shadow-xl transition">
          View Details
        </button>
      </div>
    </div>
  );
}
