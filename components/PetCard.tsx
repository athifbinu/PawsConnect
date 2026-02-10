"use client";

import { Pet } from "@/types/pet";
import React from "react";

export interface PetCardProps {
  pet: Pet;
  onClick?: () => void;
  className?: string;

  // ✅ REQUIRED to fix deployment error
  style?: React.CSSProperties;
}

export function PetCard({ pet, onClick, className, style }: PetCardProps) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md transition ${className}`}
    >
      <img
        src={pet.main_image}
        alt={pet.pet_name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-semibold">{pet.pet_name}</h3>
      <p className="text-sm text-gray-600 capitalize">{pet.pet_category}</p>

      {pet.vaccination && (
        <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          Vaccinated
        </span>
      )}
    </div>
  );
}
