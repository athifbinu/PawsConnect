'use client';

import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 animate-slideInLeft">
            <div className="flex items-center space-x-2 hover-scale cursor-pointer">
              <Heart className="h-8 w-8 text-orange-500 fill-orange-500 animate-heartbeat" />
              <span className="text-2xl font-bold hover:text-orange-400 transition-colors duration-300">PawsHome</span>
            </div>
            <p className="text-gray-400 leading-relaxed animate-slideInLeft animate-delay-100 hover:text-gray-300 transition-colors duration-300">
              Connecting loving families with adorable pets who need forever homes. Every adoption saves a life and brings joy to your family.
            </p>
            <div className="flex space-x-4 animate-slideInLeft animate-delay-200">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover-bounce">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover-bounce">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover-bounce">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-slideInLeft animate-delay-100">
            <h3 className="text-lg font-semibold hover:text-orange-400 transition-colors duration-300">Quick Links</h3>
            <div className="space-y-2">
              <a href="#pets" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105">
                Available Pets
              </a>
              <a href="#adoption" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105">
                Adoption Process
              </a>
              <a href="#volunteer" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105">
                Volunteer
              </a>
              <a href="#donate" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105">
                Donate
              </a>
              <a href="#success" className="block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105">
                Success Stories
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-slideInLeft animate-delay-200">
            <h3 className="text-lg font-semibold hover:text-orange-400 transition-colors duration-300">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 hover-scale cursor-pointer hover:translate-x-2 transition-transform duration-300">
                <Phone className="h-5 w-5 text-orange-500 animate-bounce-slow" />
                <span className="text-gray-400">(555) 123-PETS</span>
              </div>
              <div className="flex items-center space-x-3 hover-scale cursor-pointer hover:translate-x-2 transition-transform duration-300">
                <Mail className="h-5 w-5 text-orange-500 animate-bounce-slow animate-delay-100" />
                <span className="text-gray-400">hello@pawshome.org</span>
              </div>
              <div className="flex items-start space-x-3 hover-scale cursor-pointer hover:translate-x-2 transition-transform duration-300">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 animate-bounce-slow animate-delay-200" />
                <span className="text-gray-400">
                  123 Pet Adoption Lane<br />
                  Pawsville, PA 12345
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 animate-slideInLeft animate-delay-300">
            <h3 className="text-lg font-semibold hover:text-orange-400 transition-colors duration-300">Stay Updated</h3>
            <p className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300">
              Get notified about new pets available for adoption and upcoming events.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 hover:bg-gray-700 transition-colors duration-300"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 btn-animate hover-bounce">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 animate-slideInLeft animate-delay-400">
            <div className="text-gray-400 text-sm">
              © 2025 PawsHome. All rights reserved. Made with ❤️ for pets and their families.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-all duration-300 hover:scale-105 hover-bounce">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-all duration-300 hover:scale-105 hover-bounce">
                Terms of Service
              </a>
              <a href="#accessibility" className="hover:text-white transition-all duration-300 hover:scale-105 hover-bounce">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}