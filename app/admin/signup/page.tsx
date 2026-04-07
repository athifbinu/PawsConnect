"use client";

import { useState } from "react";
import { supabase } from "@/supabace/config";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { Mail, Lock, User, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    if (data.session) {
      router.push("/admin/dashboard");
    } else {
      setError("Account created! Please check your email to verify your account before logging in. If you are the owner, you can disable Email Confirmations in Supabase.");
      setIsLoading(false);
      setFormData({ name: "", email: "", password: "" });
    }
  };

  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      {/* Left Side - Brand / Image Panel */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-orange-500 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_10%,_transparent_20%)] bg-[length:24px_24px]"></div>
        <div className="relative z-10 text-center space-y-6">
          <ShieldCheck className="w-24 h-24 mx-auto text-white drop-shadow-lg" />
          <h1 className="text-5xl font-extrabold tracking-tight">Join PawsConnect</h1>
          <p className="text-lg text-orange-100 max-w-md mx-auto">
            Create an admin account to manage pet adoptions, user accounts, and oversee your entire shelter operations.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative bg-gray-50/50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm lg:hidden">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
            <p className="text-gray-500 font-medium">Sign up for an admin access</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Admin Email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center p-3.5 bg-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create Account securely"
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 p-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all active:bg-gray-100 disabled:opacity-70 disabled:pointer-events-none"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Google
          </button>

          <p className="text-center text-sm text-gray-500 font-medium pt-4">
            Already have an account?{" "}
            <Link
              href="/admin/login"
              className="text-orange-500 font-semibold hover:text-orange-600 hover:underline transition-all"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
