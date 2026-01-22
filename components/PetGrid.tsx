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
    return (
      <div className="text-center py-16 animate-zoomIn" id="pets-section">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-float">
          <span className="text-4xl animate-heartbeat">🐾</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 animate-slideInLeft animate-delay-200">
          No pets found
        </h3>
        <p className="text-gray-600 animate-slideInRight animate-delay-300">
          {searchQuery
            ? `No pets match your search for "${searchQuery}". Try adjusting your filters or search terms.`
            : "Try adjusting your filters to see more pets."}
        </p>
      </div>
    );
  }

  return (
    <div id="pets-section">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-slideInLeft hover-scale transition-transform duration-300">
          {searchQuery ? `Results for "${searchQuery}"` : "Available Pets"}
        </h2>
        <p className="text-gray-600 animate-slideInLeft animate-delay-100 hover:text-gray-800 transition-colors duration-300">
          {pets.length} {pets.length === 1 ? "pet" : "pets"} waiting for their
          forever home
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 ">
        {pets.map((pet, index) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onClick={() => onPetSelect(pet)}
            style={{
              animationDelay: `${(index % 6) * 0.1}s`,
            }}
            className={`animate-fadeInUp ${
              index % 3 === 0
                ? "animate-delay-100"
                : index % 3 === 1
                  ? "animate-delay-200"
                  : "animate-delay-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
