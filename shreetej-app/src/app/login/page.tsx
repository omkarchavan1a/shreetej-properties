"use client";

import { useState } from "react";
import { loginAction } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await loginAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Admin Portal</h1>
          <p className="text-text-mid text-sm">Shreetej Properties CMS</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold tracking-[1px] uppercase text-text-mid mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-[#f8f6f2] border-[1.5px] border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-[1px] uppercase text-text-mid mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-[#f8f6f2] border-[1.5px] border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-navy font-bold tracking-[1px] uppercase py-4 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
