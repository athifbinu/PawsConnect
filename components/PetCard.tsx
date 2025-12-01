"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Dog, Cat, Bird, Rabbit } from "lucide-react";
import Image from "next/image";

interface PetCardProps {
  pet: any;
  onClick: () => void;
}

export function PetCard({ pet, onClick }: PetCardProps) {
  const [imageError, setImageError] = useState(false);

  const mainImage =
    pet.main_image && !imageError ? pet.main_image : "/placeholder-pet.jpg";

  const personalityList = pet.personality
    ? pet.personality.split(",").map((p: string) => p.trim())
    : [];

  // Category Icons
  const categoryIcons: any = {
    dog: Dog,
    cat: Cat,
    bird: Bird,
    rabbit: Rabbit,
  };

  const Icon =
    categoryIcons[pet.pet_category?.toLowerCase()] || categoryIcons["dog"];

  return (
    <div
      onClick={onClick}
      className="
        bg-white/60 backdrop-blur-xl 
        rounded-2xl 
        shadow-lg 
        hover:shadow-2xl 
        border border-white/40 
        transition-all duration-500 
        hover:scale-[1.04] 
        cursor-pointer 
        overflow-hidden
        mx-auto
        w-full sm:w-[350px]
      "
    >
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden group">
        {/* Main Image */}
        <img
          src={mainImage}
          alt={pet.pet_name}
          className="
            w-full h-full object-cover 
            transition-transform duration-[1000ms] 
            group-hover:scale-100
          "
          onError={() => setImageError(true)}
        />

        {/* Heart Floating Icon */}
        <div
          className="
            absolute top-3 right-3 
            bg-white/80 backdrop-blur-md 
            p-2 rounded-full shadow 
            hover:bg-red-500 hover:text-white 
            transition-all duration-300
            
          "
        >
          <Heart size={18} />
        </div>

        {/* Category Icon */}
        <div
          className="
            absolute top-3 left-3 
            bg-gradient-to-r from-purple-600 to-pink-600 
            text-white p-2 rounded-full 
            shadow-md 
            animate-[wiggle_2s_ease-in-out_infinite]
          "
        >
          <Icon size={20} />
        </div>

        {/* Bottom Overlay */}
        <div
          className="
            absolute bottom-0 left-0 right-0 
            bg-gradient-to-t from-black/60 to-transparent 
            p-4 text-white
          "
        >
          <h3 className="text-xl font-semibold">{pet.pet_name}</h3>
          <p className="text-sm opacity-90 capitalize">{pet.age_type}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-2">
        {/* Location + Category */}
        <div className="flex items-center justify-between text-gray-700 text-sm">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1 text-blue-600" />
            {pet.location || "Unknown"}
          </div>

          <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            <Icon size={14} />
            {pet.pet_category}
          </div>
        </div>

        {/* Personality */}
        <div className="flex flex-wrap gap-2 mt-3">
          {personalityList.slice(0, 3).map((trait: string) => (
            <Badge
              key={trait}
              className="
                text-[10px] px-2 py-1 
                bg-blue-100 text-blue-700 
                rounded-full shadow-sm
                animate-fadeIn
              "
            >
              {trait}
            </Badge>
          ))}
        </div>

        {/* Vaccination Badge */}
        {pet.vacsination && (
          <div className="mt-3">
            <Badge
              className="
                text-xs px-3 py-1 rounded-full 
                bg-gradient-to-r from-green-400 to-emerald-600 
                text-white shadow-md
                animate-pulse
              "
            >
              {pet.vacsination}
            </Badge>
          </div>
        )}

        {/* Button */}
        <button
          className="
            mt-5 w-full py-2 
            text-white font-semibold 
            rounded-xl 
            bg-gradient-to-r from-purple-600 to-pink-600 
            shadow-md 
            hover:shadow-xl hover:scale-[1.03]
            transition-all duration-300
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
}
