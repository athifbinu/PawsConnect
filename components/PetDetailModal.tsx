'use client';

import { Pet } from '@/types/pet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, MapPin, Calendar, Phone, Mail, Check, X, Star } from 'lucide-react';
import { useState } from 'react';

interface PetDetailModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
  onAdopt: (pet: Pet) => void;
}

export function PetDetailModal({ pet, isOpen, onClose, onAdopt }: PetDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const getAgeLabel = (age: string) => {
    switch (age) {
      case 'puppy': return 'Puppy';
      case 'young': return 'Young';
      case 'adult': return 'Adult';
      case 'senior': return 'Senior';
      default: return age;
    }
  };

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-zoomIn">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 animate-slideInLeft hover:text-orange-600 transition-colors duration-300">{pet.name}</DialogTitle>
              <p className="text-lg text-gray-600 mt-1 animate-slideInLeft animate-delay-100 hover:text-gray-800 transition-colors duration-300">{pet.breed}</p>
            </div>
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-125 hover-bounce"
            >
              <Heart 
                className={`h-6 w-6 transition-all duration-300 ${
                  isFavorited ? 'text-red-500 fill-red-500 animate-heartbeat' : 'text-gray-400'
                }`} 
              />
            </button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4 animate-slideInLeft">
            <div className="relative">
              <img
                src={pet.images[currentImageIndex]}
                alt={`${pet.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-80 object-cover rounded-lg transition-all duration-700 hover:scale-110 hover:rotate-1"
              />
              {pet.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {pet.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 hover-bounce ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {pet.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {pet.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 hover-lift ${
                      index === currentImageIndex ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-125" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Details */}
          <div className="space-y-6 animate-slideInRight">
            {/* Basic Info */}
            <div className="animate-fadeInUp">
              <div className="flex items-center gap-4 mb-3">
                <Badge className="flex items-center gap-1 hover-scale hover-bounce">
                  <Calendar className="h-3 w-3" />
                  {getAgeLabel(pet.age)}
                </Badge>
                <Badge variant="secondary" className="capitalize hover-scale hover-bounce">
                  {pet.size}
                </Badge>
                <Badge variant="secondary" className="capitalize hover-scale hover-bounce">
                  {pet.gender}
                </Badge>
                <Badge className={`hover-scale hover-bounce ${getEnergyColor(pet.energyLevel)}`}>
                  {pet.energyLevel} energy
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4 animate-bounce-slow" />
                <span>{pet.location}</span>
              </div>

              <p className="text-gray-700 leading-relaxed animate-slideInLeft animate-delay-200 hover:text-gray-900 transition-colors duration-300">{pet.description}</p>
            </div>

            <Separator />

            {/* Personality */}
            <div className="animate-fadeInUp animate-delay-100">
              <h3 className="font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors duration-300">Personality</h3>
              <div className="flex flex-wrap gap-2">
                {pet.personality.map((trait, index) => (
                  <Badge 
                    key={trait} 
                    variant="outline" 
                    className={`bg-orange-50 text-orange-700 border-orange-200 hover-scale hover-bounce animate-zoomIn`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Health & Care */}
            <div className="animate-fadeInUp animate-delay-200">
              <h3 className="font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors duration-300">Health & Care</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  {pet.vaccinated ? (
                    <Check className="h-4 w-4 text-green-500 animate-bounce-slow" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 animate-wiggle" />
                  )}
                  <span>Vaccinated</span>
                </div>
                <div className="flex items-center gap-2">
                  {pet.spayedNeutered ? (
                    <Check className="h-4 w-4 text-green-500 animate-bounce-slow animate-delay-100" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 animate-wiggle" />
                  )}
                  <span>Spayed/Neutered</span>
                </div>
                <div className="flex items-center gap-2">
                  {pet.houseTrained ? (
                    <Check className="h-4 w-4 text-green-500 animate-bounce-slow animate-delay-200" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 animate-wiggle" />
                  )}
                  <span>House Trained</span>
                </div>
                <div className="flex items-center gap-2">
                  {pet.goodWithKids ? (
                    <Check className="h-4 w-4 text-green-500 animate-bounce-slow animate-delay-300" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 animate-wiggle" />
                  )}
                  <span>Good with Kids</span>
                </div>
                <div className="flex items-center gap-2">
                  {pet.goodWithPets ? (
                    <Check className="h-4 w-4 text-green-500 animate-bounce-slow animate-delay-400" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 animate-wiggle" />
                  )}
                  <span>Good with Pets</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Health Status:</strong> {pet.healthStatus}
              </p>
            </div>

            <Separator />

            {/* Shelter Info */}
            <div className="animate-fadeInUp animate-delay-300">
              <h3 className="font-semibold text-gray-900 mb-3 hover:text-orange-600 transition-colors duration-300">Contact Shelter</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 hover-lift">
                <p className="font-medium hover:text-orange-600 transition-colors duration-300">{pet.shelterInfo.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 animate-bounce-slow" />
                  <a href={`tel:${pet.shelterInfo.phone}`} className="hover:text-orange-600 transition-colors duration-300">
                    {pet.shelterInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 animate-bounce-slow animate-delay-200" />
                  <a href={`mailto:${pet.shelterInfo.email}`} className="hover:text-orange-600 transition-colors duration-300">
                    {pet.shelterInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Adoption Fee & CTA */}
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 hover-lift hover-glow animate-zoomIn animate-delay-400">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Adoption Fee</p>
                  <p className="text-3xl font-bold text-orange-600 hover:scale-105 transition-transform duration-300">${pet.adoptionFee}</p>
                </div>
                <Star className="h-8 w-8 text-orange-400 animate-float" />
              </div>
              <Button 
                onClick={() => onAdopt(pet)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg font-semibold btn-animate hover-bounce hover-glow"
              >
                Start Adoption Process
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Application process typically takes 1-3 business days
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}