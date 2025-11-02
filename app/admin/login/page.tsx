"use client";
import { useState } from "react";
import { supabase } from "@/supabace/config";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Update function here
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
    } else {
      // ✅ Added success message before redirect
      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: "Welcome to Admin Dashboard",
        timer: 2000,
        showConfirmButton: false,
      });

      // redirect to dashboard after delay
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          No account?{" "}
          <a
            href="/admin/signup"
            className="text-purple-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
