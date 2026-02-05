"use client";

import { Pet } from "@/types/pet";
import { PetCard } from "@/components/PetCard";

interface PetGridProps {
  pets: Pet[];
  onPetSelect: (pet: Pet) => void;
  searchQuery: string;
}

export function PetGrid({ pets, onPetSelect, searchQuery }: PetGridProps) {
  if (pets.length === 0) {
    return <p className="text-center py-10">No pets found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
      {pets.map((pet, index) => (
        <PetCard
          key={pet.id}
          pet={pet}
          onClick={() => onPetSelect(pet)}
          style={{ animationDelay: `${(index % 6) * 0.1}s` }}
          className="animate-fadeInUp"
        />
      ))}
    </div>
  );
}
