"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  PawPrint,
} from "lucide-react";

/* --------------------------------------------------
   STATIC DISPLAY DATA (UI ONLY)
-------------------------------------------------- */

const adoptionIncludes = [
  "Basic health check",
  "Vaccination record",
  "Behavior assessment",
  "Post-adoption guidance",
];

const idealHome = [
  "Indoor friendly environment",
  "Patient and caring family",
  "Regular vet checkups",
];

const careLevelMap: Record<string, string> = {
  Good: "Low Maintenance",
  "Need care": "High Maintenance",
  Bad: "Special Attention Required",
};

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

export function PetDetailModal({ pet, isOpen, onClose }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const images = [
    pet.main_image,
    pet.sub_image_1,
    pet.sub_image_2,
    pet.sub_image_3,
  ].filter(Boolean);

  const personalityArray =
    typeof pet.personality === "string"
      ? pet.personality.split(",").map((p: string) => p.trim())
      : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-3xl font-bold">
                {pet.pet_name}
              </DialogTitle>
              <p className="text-gray-600 text-lg">{pet.pet_category}</p>
            </div>

            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Heart
                className={`h-6 w-6 ${
                  isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-10 mt-6">
          {/* --------------------------------------------------
              IMAGE GALLERY
          -------------------------------------------------- */}
          <div>
            <img
              src={images[currentImageIndex] || "/placeholder-pet.jpg"}
              className="w-full h-80 object-cover rounded-xl"
            />

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      i === currentImageIndex
                        ? "border-orange-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --------------------------------------------------
              PET DETAILS
          -------------------------------------------------- */}
          <div className="space-y-6">
            {/* BADGES */}
            <div className="flex flex-wrap gap-3">
              <Badge className="flex gap-1">
                <Calendar className="h-3 w-3" />
                {pet.age_type}
              </Badge>

              <Badge variant="secondary">{pet.sex}</Badge>

              <Badge className="bg-green-100 text-green-700">
                {pet.vaccination}
              </Badge>

              <Badge className="bg-blue-100 text-blue-700">
                {pet.health_status}
              </Badge>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              {pet.location}
            </div>

            <Separator />

            {/* QUICK INFO CARDS */}
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                title="Care Level"
                value={careLevelMap[pet.health_status] || "Normal"}
                color="orange"
              />

              <InfoCard title="Gender" value={pet.sex} color="purple" />

              <InfoCard title="Age Type" value={pet.age_type} color="blue" />

              <InfoCard
                title="Vaccination"
                value={pet.vaccination}
                color="green"
              />
            </div>

            <Separator />

            {/* PERSONALITY */}
            <div>
              <h3 className="font-semibold mb-3">Personality</h3>
              <div className="flex flex-wrap gap-2">
                {personalityArray.map((p: string, i: number) => (
                  <Badge key={i} variant="outline">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* ABOUT */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <h3 className="font-semibold text-lg mb-2">
                About {pet.pet_name}
              </h3>
              <p className="text-gray-700 leading-relaxed">{pet.about}</p>
            </div>

            {/* ADOPTION INCLUDES */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <PawPrint className="h-5 w-5 text-orange-500" />
                Adoption Includes
              </h3>

              <ul className="space-y-2 text-gray-700">
                {adoptionIncludes.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* IDEAL HOME */}
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-lg mb-3 text-blue-800">
                Ideal Home
              </h3>
              <div className="flex flex-wrap gap-2">
                {idealHome.map((rule, i) => (
                  <Badge key={i} variant="outline">
                    {rule}
                  </Badge>
                ))}
              </div>
            </div>

            {/* SAFETY NOTE */}
            <div className="bg-gray-50 border p-4 rounded-xl text-sm text-gray-600 flex gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Owner details are shared only after adoption confirmation to
              ensure safety and privacy.
            </div>

            {/* CTA */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">Adoption Fee</p>
                  <p className="text-3xl font-bold text-orange-600">
                    ₹{pet.price || 0}
                  </p>
                </div>
                <Star className="h-8 w-8 text-orange-400" />
              </div>

              <Button
                onClick={() => {
                  window.location.href = `/adopt/checkout?petId=${pet.id}`;
                }}
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

/* --------------------------------------------------
   SMALL REUSABLE CARD
-------------------------------------------------- */

function InfoCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`p-4 rounded-xl bg-${color}-50 border border-${color}-200`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`font-semibold text-${color}-700`}>{value}</p>
    </div>
  );
}
