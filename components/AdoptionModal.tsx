'use client';

import { Pet } from '@/types/pet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface AdoptionModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
}

export function AdoptionModal({ pet, isOpen, onClose }: AdoptionModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    housingType: '',
    ownRent: '',
    hasYard: false,
    hasOtherPets: false,
    petExperience: '',
    whyAdopt: '',
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in adopting {pet.name}. The shelter will review your application and contact you within 1-3 business days.
            </p>
            <Button onClick={onClose} className="bg-orange-500 hover:bg-orange-600">
              Continue Browsing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Heart className="h-6 w-6 text-orange-500 fill-orange-500" />
            Adopt {pet.name}
          </DialogTitle>
          <p className="text-gray-600">
            Complete this application to start the adoption process for this wonderful {pet.type}.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code *</Label>
                <Input
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Housing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Housing Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Housing Type *</Label>
                <Select 
                  value={formData.housingType} 
                  onValueChange={(value) => setFormData({...formData, housingType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select housing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Do you own or rent? *</Label>
                <Select 
                  value={formData.ownRent} 
                  onValueChange={(value) => setFormData({...formData, ownRent: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own">Own</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasYard"
                checked={formData.hasYard}
                onCheckedChange={(checked) => setFormData({...formData, hasYard: !!checked})}
              />
              <Label htmlFor="hasYard">I have a yard or outdoor space</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasOtherPets"
                checked={formData.hasOtherPets}
                onCheckedChange={(checked) => setFormData({...formData, hasOtherPets: !!checked})}
              />
              <Label htmlFor="hasOtherPets">I currently have other pets</Label>
            </div>
          </div>

          {/* Experience & Motivation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Experience & Motivation</h3>
            
            <div>
              <Label htmlFor="petExperience">Pet Experience</Label>
              <Textarea
                id="petExperience"
                placeholder="Tell us about your experience with pets..."
                value={formData.petExperience}
                onChange={(e) => setFormData({...formData, petExperience: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="whyAdopt">Why do you want to adopt this pet? *</Label>
              <Textarea
                id="whyAdopt"
                placeholder="Tell us why you're interested in adopting this specific pet..."
                required
                value={formData.whyAdopt}
                onChange={(e) => setFormData({...formData, whyAdopt: e.target.value})}
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                required
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreeTerms: !!checked})}
              />
              <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                I agree to the terms and conditions of adoption, including a home visit, reference checks, 
                and the commitment to provide proper care, veterinary treatment, and a loving home for this pet. 
                I understand that the adoption fee of ${pet.adoptionFee} is required upon approval. *
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                Submit Application
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              By submitting this application, you agree to be contacted by {pet.shelterInfo.name}
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}