"use client";

import { supabase } from "@/supabace/config";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
    >
      Login with Google
    </button>
  );
}
