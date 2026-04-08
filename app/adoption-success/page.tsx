import { createClient } from "@supabase/supabase-js";
import { CheckCircle, Home, Phone, Mail, User, MapPin, Heart, Sparkles, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 selection:bg-orange-200">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-orange-400/20 to-transparent blur-3xl -z-10 rounded-full"></div>
      
      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="relative inline-flex items-center justify-center w-28 h-28 mb-4 group">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute inset-2 bg-green-200 rounded-full animate-pulse opacity-40"></div>
            <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full w-full h-full flex items-center justify-center shadow-xl shadow-green-500/30 transform transition-transform group-hover:scale-105 duration-300">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-4 w-8 h-8 text-orange-400 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Adoption Confirmed!
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium">
            You're a hero. Thank you for giving <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">{pet?.pet_name || 'a new friend'}</span> a forever home. 🐾
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100/50 border border-orange-200 text-sm font-medium text-orange-800 shadow-sm mt-2">
            <Mail className="w-4 h-4 mr-2 text-orange-500" />
            Owner details sent to {adoption.email}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          
          {/* Adopter Details (Glassmorphic Light) */}
          <div className="relative group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-200 to-amber-200 rounded-[2.5rem] blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 overflow-hidden text-slate-800">
              <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-6 flex items-center justify-between border-b border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm border border-orange-100">
                    <User className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your Receipt</h2>
                </div>
              </div>
              <div className="p-7 space-y-6">
                {[
                  { icon: User, label: "Full Name", value: adoption.full_name },
                  { icon: Mail, label: "Email Address", value: adoption.email },
                  { icon: Phone, label: "Contact Number", value: adoption.phone || 'Not Provided' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group/item">
                    <div className="bg-orange-50 p-3.5 rounded-2xl text-orange-600 group-hover/item:bg-orange-500 group-hover/item:text-white group-hover/item:shadow-md transition-all duration-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">{item.label}</p>
                      <p className="text-lg font-semibold text-slate-800">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-5 group/item pt-4 border-t border-slate-100">
                  <div className="bg-slate-100 p-3.5 rounded-2xl text-slate-600 group-hover/item:bg-slate-200 transition-all duration-300">
                    <Home className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-1">Application ID</p>
                    <p className="text-sm font-mono font-bold text-slate-600 break-all bg-slate-100 px-2 py-1 rounded inline-block">{adoption.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Details (Premium Dark) */}
          <div className="relative group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 animate-pulse"></div>
            <div className="relative h-full bg-slate-950 rounded-3xl shadow-2xl overflow-hidden text-slate-100 border border-slate-800">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="bg-white/5 backdrop-blur-md p-6 flex items-center justify-between border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-pink-500/20 rounded-xl border border-pink-500/30">
                    <Heart className="h-6 w-6 text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Owner Contact</h2>
                </div>
              </div>

              {pet ? (
                <div className="p-7 space-y-7 relative z-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-800 pb-7">
                    {pet.main_image ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl shrink-0 bg-slate-900 shadow-pink-500/10">
                        <img src={pet.main_image} alt={pet.pet_name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-800 shrink-0 bg-slate-900 flex items-center justify-center shadow-inner">
                        <Heart className="h-10 w-10 text-slate-700" />
                      </div>
                    )}
                    <div className="text-center sm:text-left mt-2 sm:mt-0">
                      <h3 className="text-3xl font-black text-white mb-2">{pet.pet_name}</h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/20">
                        {pet.breed || pet.pet_category}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { icon: User, label: "Owner Name", value: pet.owner_name || 'Shelter / Rescue' },
                      { icon: Mail, label: "Owner Email", value: pet.owner_email || 'Not Provided' },
                      { icon: Phone, label: "Owner Contact", value: pet.owner_contact || 'Not Provided' },
                      { icon: MapPin, label: "Location", value: pet.location || 'Not specified' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5 group/item">
                        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-pink-400 group-hover/item:bg-pink-500 group-hover/item:text-white group-hover/item:border-pink-400 transition-all duration-300 shadow-sm">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-1">{item.label}</p>
                          <p className="text-lg font-semibold text-slate-100">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center h-full opacity-60">
                  <Heart className="w-12 h-12 text-slate-700 mb-4" />
                  <p className="text-slate-400 text-lg">Pet details currently unavailable.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 pt-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Link href="/pets" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 rounded-2xl border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all font-bold shadow-sm">
              Browse More Pets
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto text-lg px-8 py-7 bg-slate-900 hover:bg-orange-500 text-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-orange-500/30 transition-all font-bold hover:-translate-y-1 group">
              Back to Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
