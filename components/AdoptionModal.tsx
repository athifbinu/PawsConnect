"use client";

import { Pet } from "@/types/pet";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

interface AdoptionModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
}

export function AdoptionModal({ pet, isOpen, onClose }: AdoptionModalProps) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    housingType: "",
    ownRent: "",
    hasYard: false,
    hasOtherPets: false,
    petExperience: "",
    whyAdopt: "",
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderRes = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: pet.price || 500 }),
      });
      const orderData = await orderRes.json();

      if (!orderData.id) throw new Error("Could not create Razorpay order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TYpo9u8R4g2G1C",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PawsConnect",
        description: `Adoption Application for ${pet.pet_name}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          setSubmitted(true);
          try {
            const submitRes = await fetch("/api/submit-adoption", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                pet_id: pet.id,
                full_name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                housingType: formData.housingType,
                ownRent: formData.ownRent,
                hasYard: formData.hasYard,
                hasOtherPets: formData.hasOtherPets,
                petExperience: formData.petExperience,
                whyAdopt: formData.whyAdopt,
                payment_id: response.razorpay_payment_id,
              }),
            });
            const submitData = await submitRes.json();

            if (submitData.adoptionId) {
              await fetch("/api/send-adoption-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adoptionId: submitData.adoptionId }),
              });
              
              // Send WhatsApp notification
              try {
                await fetch("/api/send-adoption-whatsapp", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ adoptionId: submitData.adoptionId }),
                });
              } catch (e) {
                console.error("Failed to send WhatsApp message", e);
              }

              router.push(`/adoption-success?id=${submitData.adoptionId}`);
              onClose();
            } else {
              alert("Payment successful but failed to save record.");
            }
          } catch (err) {
            console.error(err);
            alert("Payment successful but an error occurred saving your record.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#f97316", // orange-500
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setIsProcessing(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Application...
            </h3>
            <p className="text-gray-600 mb-6 flex justify-center items-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              Finalizing your adoption with the shelter.
            </p>
            <Button
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Continue Browsing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Dialog open={isOpen} onOpenChange={onClose} modal={!isProcessing}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full p-4 sm:p-6"
        onInteractOutside={(e) => {
          if (isProcessing) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Heart className="h-6 w-6 text-orange-500 fill-orange-500" />
            Adopt {pet.pet_name}
          </DialogTitle>
          <p className="text-gray-600">
            Complete this application to start the adoption process for this
            wonderful {pet.pet_category}.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  required
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code *</Label>
                <Input
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Housing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Housing Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Housing Type *</Label>
                <Select
                  value={formData.housingType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, housingType: value })
                  }
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
                  onValueChange={(value) =>
                    setFormData({ ...formData, ownRent: value })
                  }
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
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasYard: !!checked })
                }
              />
              <Label htmlFor="hasYard">I have a yard or outdoor space</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasOtherPets"
                checked={formData.hasOtherPets}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasOtherPets: !!checked })
                }
              />
              <Label htmlFor="hasOtherPets">I currently have other pets</Label>
            </div>
          </div>

          {/* Experience & Motivation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Experience & Motivation
            </h3>

            <div>
              <Label htmlFor="petExperience">Pet Experience</Label>
              <Textarea
                id="petExperience"
                placeholder="Tell us about your experience with pets..."
                value={formData.petExperience}
                onChange={(e) =>
                  setFormData({ ...formData, petExperience: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="whyAdopt">
                Why do you want to adopt this pet? *
              </Label>
              <Textarea
                id="whyAdopt"
                placeholder="Tell us why you're interested in adopting this specific pet..."
                required
                value={formData.whyAdopt}
                onChange={(e) =>
                  setFormData({ ...formData, whyAdopt: e.target.value })
                }
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
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeTerms: !!checked })
                }
              />
              <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                I agree to the terms and conditions of adoption, including a
                home visit, reference checks, and the commitment to provide
                proper care, veterinary treatment, and a loving home for this
                pet. I understand that the adoption fee of ₹{pet.price || 0} is
                required upon approval. *
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Processing...
                  </>
                ) : (
                  "Proceed to Pay & Submit"
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              By submitting this application, you agree to be contacted by{" "}
              {pet.owner_name || 'the owner'}
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
