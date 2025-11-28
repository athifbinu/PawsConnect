"use client";
import { useState } from "react";
import { supabase } from "@/supabace/config";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) return setError(error.message);

    router.push("/admin/dashboard");
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/admin/auth/callback",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-4">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl p-8 rounded-3xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-sm mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-800 shadow-inner focus:ring-4 focus:ring-pink-500 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/60 text-gray-800 shadow-inner focus:ring-4 focus:ring-purple-500 focus:outline-none"
            required
          />

          {error && (
            <p className="text-red-200 bg-red-500/30 py-2 px-3 rounded-lg text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-xl shadow-lg text-white text-lg font-semibold transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600"
          >
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white/90 text-gray-800 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-6 h-6"
            />
            Login with Google
          </button>
        </div>

        <p className="text-center mt-4 text-white/90 text-sm">
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
