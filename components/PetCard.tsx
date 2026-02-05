"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Dog, Cat, Bird, Rabbit } from "lucide-react";
import { Pet } from "@/types/pet";

interface PetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pet: Pet;
}

export function PetCard({ pet, className, style, onClick }: PetCardProps) {
  const [imageError, setImageError] = useState(false);

  const image =
    pet.main_image && !imageError ? pet.main_image : "/placeholder-pet.jpg";

  const icons: Record<string, React.ElementType> = {
    dog: Dog,
    cat: Cat,
    bird: Bird,
    rabbit: Rabbit,
  };

  const Icon = icons[pet.pet_category?.toLowerCase() ?? ""] || Dog;

  const personalityList = pet.personality
    ? pet.personality.split(",").map((p) => p.trim())
    : [];

  return (
    <div
      onClick={onClick}
      style={style}
      className={`
        bg-white/60 backdrop-blur-xl
        rounded-2xl shadow-lg
        hover:shadow-2xl
        border border-white/40
        transition-all duration-500
        hover:scale-[1.04]
        cursor-pointer
        overflow-hidden
        ${className ?? ""}
      `}
    >
      {/* IMAGE */}
      <div className="relative h-64 w-full overflow-hidden group">
        <img
          src={image}
          alt={pet.pet_name}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        <div className="absolute top-3 right-3 bg-white/80 p-2 rounded-full">
          <Heart size={18} />
        </div>

        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full">
          <Icon size={18} />
        </div>

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
          <h3 className="text-lg font-semibold">{pet.pet_name}</h3>
          <p className="text-sm capitalize">{pet.age_type}</p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="p-4">
        <div className="flex justify-between text-sm text-gray-700">
          <span className="flex items-center">
            <MapPin size={14} className="mr-1" />
            {pet.location || "Unknown"}
          </span>

          <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">
            <Icon size={12} />
            {pet.pet_category}
          </span>
        </div>

        {personalityList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {personalityList.slice(0, 3).map((p) => (
              <Badge key={p} className="text-[10px] bg-blue-100 text-blue-700">
                {p}
              </Badge>
            ))}
          </div>
        )}

        {pet.vacsination && (
          <div className="mt-3">
            <Badge className="bg-green-500 text-white text-xs">
              {pet.vacsination}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
