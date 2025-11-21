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
import { Pet, FilterState } from "@/types/pet";
import { supabase } from "@/supabace/config"; // IMPORTANT

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
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

  // ===============================
  // 🚀 Fetch Pets From Supabase
  // ===============================
  useEffect(() => {
    fetchPets();
    setIsLoaded(true);
  }, []);

  const fetchPets = async () => {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching pets:", error);
      return;
    }

    setPets(data as Pet[]);
  };

  // ===============================
  // 🔍 Search + Filters
  // ===============================
  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.pet_name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesType =
      filters.type === "all" ||
      pet.pet_category?.toLowerCase() === filters.type.toLowerCase();

    const matchesAge =
      filters.age === "all" ||
      pet.age_type?.toLowerCase() === filters.age.toLowerCase();

    const matchesSize =
      filters.size === "all" ||
      pet.size?.toLowerCase() === filters.size.toLowerCase();

    const matchesLocation =
      filters.location === "all" ||
      pet.location?.toLowerCase() === filters.location.toLowerCase();

    return (
      matchesSearch &&
      matchesType &&
      matchesAge &&
      matchesSize &&
      matchesLocation
    );
  });

  // ===============================
  // 🐾 Adoption Trigger
  // ===============================
  const handleAdopt = (pet: Pet) => {
    setAdoptionPet(pet);
    setSelectedPet(null);
    setShowAdoptionModal(true);
  };

  // ===============================
  // ⏳ Loading Screen
  // ===============================
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

  // ===============================
  // 🌟 Main Page
  // ===============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated floating background */}
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
            {/* Sidebar Filters */}
            <aside className="lg:w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                resultsCount={filteredPets.length}
              />
            </aside>

            {/* Pets Grid */}
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

      {/* Pet Details Modal */}
      {selectedPet && (
        <PetDetailModal
          pet={selectedPet}
          isOpen={!!selectedPet}
          onClose={() => setSelectedPet(null)}
          onAdopt={handleAdopt}
        />
      )}

      {/* Adoption Modal */}
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
