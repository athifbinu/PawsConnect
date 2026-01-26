"use client";

import { useState } from "react";
import { supabase } from "@/supabace/config";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  /* ✅ FIX: typed event */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ✅ FIX: typed submit event */
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/dashboard");
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        /* ⚠ IMPORTANT: change after deploy */
        redirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/admin/auth/callback",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-4">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl p-8 rounded-3xl w-full max-w-md transition-all duration-500 hover:scale-[1.02]">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-800 focus:ring-4 focus:ring-pink-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-800 focus:ring-4 focus:ring-purple-500 outline-none"
          />

          {error && (
            <p className="text-red-200 bg-red-500/30 py-2 px-3 rounded-lg text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-xl text-white font-semibold transition hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white/90 text-gray-800 py-3 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 hover:scale-105 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-6 h-6"
            />
            Login with Google
          </button>
        </div>

        <p className="text-center mt-4 text-white text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/admin/signup"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
