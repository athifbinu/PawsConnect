"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PetGrid } from "@/components/PetGrid";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Footer } from "@/components/Footer";
import { PetDetailModal } from "@/components/PetDetailModal";
import { AdoptionModal } from "@/components/AdoptionModal";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { pets } from "@/data/pets";
import { Pet, FilterState } from "@/types/pet";

export default function Home() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [adoptionPet, setAdoptionPet] = useState<Pet | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    age: "all",
    size: "all",
    location: "all",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === "all" || pet.type === filters.type;
    const matchesAge = filters.age === "all" || pet.age === filters.age;
    const matchesSize = filters.size === "all" || pet.size === filters.size;
    const matchesLocation =
      filters.location === "all" || pet.location === filters.location;

    return (
      matchesSearch &&
      matchesType &&
      matchesAge &&
      matchesSize &&
      matchesLocation
    );
  });

  const handleAdopt = (pet: Pet) => {
    setAdoptionPet(pet);
    setSelectedPet(null);
    setShowAdoptionModal(true);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading amazing pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-floatReverse animate-delay-500"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-float animate-delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-floatReverse animate-delay-700"></div>
      </div>

      <Header />

      <main className="relative z-10">
        <Hero onSearch={setSearchQuery} />

        <StatsSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                resultsCount={filteredPets.length}
              />
            </aside>

            <div className="flex-1">
              <PetGrid
                pets={filteredPets}
                onPetSelect={setSelectedPet}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>

        <TestimonialsSection />
      </main>

      <Footer />

      {selectedPet && (
        <PetDetailModal
          pet={selectedPet}
          isOpen={!!selectedPet}
          onClose={() => setSelectedPet(null)}
          onAdopt={handleAdopt}
        />
      )}

      {showAdoptionModal && adoptionPet && (
        <AdoptionModal
          pet={adoptionPet}
          isOpen={showAdoptionModal}
          onClose={() => {
            setShowAdoptionModal(false);
            setAdoptionPet(null);
          }}
        />
      )}
    </div>
  );
}
