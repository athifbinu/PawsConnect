import { createClient } from "@supabase/supabase-js";
import { CheckCircle, Home, Phone, Mail, User, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function AdoptionSuccessPage({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}) {
  const { id } = searchParams;

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900">Invalid Request</h1>
        <p className="text-gray-600 mt-2">No adoption ID provided.</p>
        <Link href="/" className="mt-6">
          <Button className="bg-orange-500 hover:bg-orange-600">Return Home</Button>
        </Link>
      </div>
    );
  }

  // Fetch from Supabase
  const { data: adoption } = await supabase
    .from("adoption_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (!adoption) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900">Application Not Found</h1>
        <p className="text-gray-600 mt-2">We couldn't locate your adoption record.</p>
        <Link href="/" className="mt-6">
          <Button className="bg-orange-500 hover:bg-orange-600">Return Home</Button>
        </Link>
      </div>
    );
  }

  const { data: pet } = await supabase
    .from("pets")
    .select("*")
    .eq("id", adoption.pet_id)
    .single();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 ring-8 ring-green-50 shadow-sm transition-transform hover:scale-105 duration-300">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Adoption Securely Processed!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for adopting <span className="font-semibold text-orange-600">{pet?.pet_name || 'a new friend'}</span>. 
            We've sent an email with the owner's contact details to <strong className="text-gray-800">{adoption.email}</strong>.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative z-10">
          
          {/* Adopter Details */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60 overflow-hidden transform transition duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 opacity-90" />
                <h2 className="text-2xl font-bold tracking-tight">Your Details</h2>
              </div>
            </div>
            <div className="p-7 space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors"><User className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{adoption.full_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900">{adoption.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Contact Number</p>
                  <p className="text-lg font-semibold text-gray-900">{adoption.phone || 'Not Provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group pt-2 border-t border-gray-100">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors"><Home className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Application ID</p>
                  <p className="text-sm font-mono font-semibold text-gray-900 break-all">{adoption.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Details */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transform transition duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] text-white relative">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>

            <div className="bg-white/5 backdrop-blur-sm p-6 flex items-center justify-between border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-500" />
                <h2 className="text-2xl font-bold tracking-tight text-white">Pet & Owner</h2>
              </div>
            </div>
            {pet ? (
              <div className="p-7 space-y-6 relative z-10">
                <div className="border-b border-gray-700/50 pb-6 mb-2 flex items-center gap-5">
                  {pet.main_image ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-orange-500/50 shadow-lg shrink-0 bg-gray-800">
                      <img src={pet.main_image} alt={pet.pet_name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-700 shrink-0 bg-gray-800 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{pet.pet_name}</h3>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300">
                      {pet.breed || pet.pet_category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="bg-white/5 p-3 rounded-xl text-pink-400 group-hover:bg-white/10 transition-colors"><User className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1">Owner Name</p>
                    <p className="text-lg font-semibold text-gray-100">{pet.owner_name || 'Shelter / Rescue'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="bg-white/5 p-3 rounded-xl text-pink-400 group-hover:bg-white/10 transition-colors"><Mail className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1">Owner Email</p>
                    <p className="text-lg font-semibold text-gray-100">{pet.owner_email || 'Not Provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="bg-white/5 p-3 rounded-xl text-pink-400 group-hover:bg-white/10 transition-colors"><Phone className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1">Owner Contact</p>
                    <p className="text-lg font-semibold text-gray-100">{pet.owner_contact || 'Not Provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="bg-white/5 p-3 rounded-xl text-pink-400 group-hover:bg-white/10 transition-colors"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1">Location</p>
                    <p className="text-lg font-semibold text-gray-100">{pet.location || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <p className="text-gray-400">Pet details unavailable.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center mt-12 pt-10 border-t border-gray-200/60 pb-10">
          <Link href="/pets">
            <Button variant="outline" className="text-lg px-8 py-6 h-auto mr-4 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 transition-all font-semibold">
              Browse More Pets
            </Button>
          </Link>
          <Link href="/">
            <Button className="text-lg px-8 py-6 h-auto bg-gray-900 hover:bg-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold hover:-translate-y-0.5">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
