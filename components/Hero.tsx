'use client';

import { useState } from 'react';
import { Search, Heart, MapPin, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    document.getElementById('pets-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/30 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Morphing Shapes */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-purple-400/20 animate-morph"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-morph animate-delay-500"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 animate-bounceIn">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-spin" />
              <span className="text-yellow-300 font-semibold text-lg">Welcome to PawsConnect</span>
              <Sparkles className="h-8 w-8 text-yellow-300 animate-spin" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              <span className="block animate-slideInLeft">Find Your</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-slideInRight animate-delay-300">
                Perfect Pet
              </span>
              <span className="block animate-slideInLeft animate-delay-600">Companion</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fadeInUp animate-delay-800">
            Discover thousands of adorable pets waiting for their forever homes. 
            Every adoption saves a life and brings endless joy to your family.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto animate-slideInUp animate-delay-1000">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative flex flex-col sm:flex-row gap-4 p-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 animate-pulse" />
                  <Input
                    type="text"
                    placeholder="Search by name, breed, or type..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pl-12 h-16 text-lg border-0 focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl bg-gray-50 hover:bg-white transition-all duration-300"
                  />
                </div>
                <Button 
                  type="submit"
                  className="h-16 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-xl btn-shine group"
                >
                  <Search className="h-5 w-5 mr-2 group-hover:animate-wiggle" />
                  Find Pets
                </Button>
              </div>
            </div>
          </form>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90 animate-fadeInUp animate-delay-1000">
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-110 transition-all duration-300">
              <div className="relative">
                <Heart className="h-8 w-8 text-pink-300 fill-pink-300 animate-heartbeat" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm opacity-80">Happy Adoptions</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-110 transition-all duration-300">
              <div className="relative">
                <MapPin className="h-8 w-8 text-blue-300 animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping animate-delay-300"></div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm opacity-80">Partner Shelters</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-110 transition-all duration-300">
              <div className="relative">
                <Star className="h-8 w-8 text-yellow-300 fill-yellow-300 animate-spin" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping animate-delay-600"></div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm opacity-80">User Rating</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounceIn animate-delay-1000">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl group"
            >
              <Heart className="h-5 w-5 mr-2 group-hover:animate-heartbeat" />
              Browse All Pets
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl group"
            >
              <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
              How It Works
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}