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
import { Heart, MapPin, Calendar, Check, X, Star } from "lucide-react";
import { useState } from "react";

interface PetDetailModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
  onAdopt: (pet: Pet) => void;
}

export function PetDetailModal({
  pet,
  isOpen,
  onClose,
  onAdopt,
}: PetDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // ✅ FIXED: Use correct fields (main_image + sub_images)
  const images = [pet.main_image, ...(pet.sub_images || [])].filter(Boolean);

  if (images.length === 0) images.push("/placeholder-pet.jpg");

  // Safe personality
  const personalityArray = Array.isArray(pet.personality)
    ? pet.personality
    : typeof pet.personality === "string"
    ? pet.personality.split(",").map((p) => p.trim())
    : [];

  const getAgeLabel = (age: string) => {
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

  const getEnergyColor = (level: string) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-zoomIn">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              {/* ✅ CORRECT: pet.pet_name */}
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {pet.pet_name}
              </DialogTitle>

              {/* ✅ CORRECT: pet.pet_category */}
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
          {/* ===============================
                 IMAGE GALLERY
          =============================== */}
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

          {/* ===============================
                PET DETAILS
          =============================== */}
          <div className="space-y-6">
            {/* Badges */}
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
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{pet.location}</span>
              </div>

              <p className="text-gray-700">{pet.description}</p>
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

            {/* Health */}
            <div>
              <h3 className="font-semibold mb-3">Health & Care</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  {pet.vaccinated ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                  <span>Vaccinated</span>
                </div>

                <div className="flex items-center gap-2">
                  {pet.spayedNeutered ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                  <span>Spayed/Neutered</span>
                </div>

                <div className="flex items-center gap-2">
                  {pet.houseTrained ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                  <span>House Trained</span>
                </div>

                <div className="flex items-center gap-2">
                  {pet.goodWithKids ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                  <span>Good with Kids</span>
                </div>

                <div className="flex items-center gap-2">
                  {pet.goodWithPets ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                  <span>Good with Pets</span>
                </div>
              </div>
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
                onClick={() => onAdopt(pet)}
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
