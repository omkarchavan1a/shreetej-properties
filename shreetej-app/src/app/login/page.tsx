"use client";

import { useState, useEffect } from "react";
import { loginAction } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  // Countdown timer for lockout
  useEffect(() => {
    if (!lockedUntil) return;
    const remaining = Math.max(0, lockedUntil - Date.now());
    if (remaining <= 0) {
      setLockedUntil(null);
      setCountdown(0);
      setError("");
      return;
    }
    setCountdown(Math.ceil(remaining / 1000));

    const interval = setInterval(() => {
      const r = Math.max(0, lockedUntil - Date.now());
      if (r <= 0) {
        setLockedUntil(null);
        setCountdown(0);
        setError("");
        clearInterval(interval);
      } else {
        setCountdown(Math.ceil(r / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockedUntil]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil && lockedUntil > Date.now()) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await loginAction(formData) as any;

    if (result.error) {
      setError(result.error);
      if (result.locked && result.remainingMs) {
        setLockedUntil(Date.now() + result.remainingMs);
      }
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isLocked = lockedUntil !== null && lockedUntil > Date.now();

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">Admin Portal</h1>
          <p className="text-text-mid text-sm">Shreetej Properties Builders & Developers CMS</p>
        </div>

        {error && (
          <div className={`mb-6 p-4 border rounded-xl text-sm ${isLocked ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-red-50 border-red-200 text-red-600"}`}>
            {error}
            {isLocked && countdown > 0 && (
              <div className="mt-2 font-bold text-lg text-center">
                🔒 {formatCountdown(countdown)}
              </div>
            )}
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
              className="w-full px-5 py-4 bg-[#f8f6f2] border-[1.5px] border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold transition-all disabled:opacity-50"
              required
              disabled={isLocked}
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
              className="w-full px-5 py-4 bg-[#f8f6f2] border-[1.5px] border-gold/20 rounded-xl text-sm outline-none focus:bg-white focus:border-gold transition-all disabled:opacity-50"
              required
              disabled={isLocked}
            />
          </div>

          <button
            type="submit"
            disabled={loading || isLocked}
            className="w-full bg-gold text-navy font-bold tracking-[1px] uppercase py-4 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLocked ? `Locked (${formatCountdown(countdown)})` : loading ? "Authenticating..." : "Login to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
