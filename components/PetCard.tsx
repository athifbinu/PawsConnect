'use client';

import { Pet } from '@/types/pet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Calendar, Star } from 'lucide-react';
import { useState } from 'react';

interface PetCardProps {
  pet: Pet;
  onClick: () => void;
}

export function PetCard({ pet, onClick }: PetCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getAgeLabel = (age: string) => {
    switch (age) {
      case 'puppy': return 'Puppy';
      case 'young': return 'Young';
      case 'adult': return 'Adult';
      case 'senior': return 'Senior';
      default: return age;
    }
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case 'small': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'large': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-0 shadow-md hover-lift hover-glow animate-fadeInUp">
      <div className="relative">
        {!imageError ? (
          <img
            src={pet.images[0]}
            alt={pet.name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-1"
            onClick={onClick}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <span className="text-6xl opacity-50 animate-float">🐾</span>
          </div>
        )}
        
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-white hover:scale-125 hover:shadow-lg hover-bounce"
        >
          <Heart 
            className={`h-5 w-5 transition-all duration-500 ${
              isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-600'
            } ${isFavorited ? 'animate-heartbeat' : ''}`} 
          />
        </button>

        {/* Status badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {pet.vaccinated && (
            <Badge className="bg-green-500 text-white text-xs animate-slideInLeft hover-bounce">
              <Star className="h-3 w-3 mr-1 animate-pulse-slow animate-rotateIn" />
              Vaccinated
            </Badge>
          )}
          {pet.age === 'puppy' && (
            <Badge className="bg-purple-500 text-white text-xs animate-zoomIn animate-delay-100 hover-bounce">New</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6" onClick={onClick}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-all duration-500 group-hover:scale-105">
              {pet.name}
            </h3>
            <p className="text-gray-600 font-medium transition-all duration-300 group-hover:text-gray-800">{pet.breed}</p>
          </div>
          <div className="text-right">
            <Badge className={`text-xs capitalize transition-all duration-300 hover:scale-110 hover-bounce ${getSizeColor(pet.size)}`}>
              {pet.size}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {getAgeLabel(pet.age)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {pet.location.split(',')[0]}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {pet.personality.slice(0, 3).map((trait) => (
            <Badge key={trait} variant="secondary" className="text-xs hover-scale transition-all duration-200">
              {trait}
            </Badge>
          ))}
          {pet.personality.length > 3 && (
            <Badge variant="secondary" className="text-xs hover-scale transition-all duration-200">
              +{pet.personality.length - 3} more
            </Badge>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pet.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-orange-600">
            ${pet.adoptionFee}
            <span className="text-sm font-normal text-gray-500 transition-colors duration-300 group-hover:text-gray-700"> adoption fee</span>
          </div>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 btn-animate hover-bounce">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}