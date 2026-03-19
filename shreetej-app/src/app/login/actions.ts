"use server";

import { cookies } from "next/headers";

// ── Rate Limiting (in-memory, per serverless instance) ──
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes lockout
const WINDOW_MS = 15 * 60 * 1000; // 15 minute sliding window

function getRateLimitKey(email: string): string {
  return email.toLowerCase().trim();
}

function checkRateLimit(email: string): { allowed: boolean; remainingMs?: number } {
  const key = getRateLimitKey(email);
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) return { allowed: true };

  // Check if locked out
  if (record.lockedUntil > now) {
    return { allowed: false, remainingMs: record.lockedUntil - now };
  }

  // Reset if outside the window
  if (now - record.lastAttempt > WINDOW_MS) {
    loginAttempts.delete(key);
    return { allowed: true };
  }

  // Check if too many attempts
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    return { allowed: false, remainingMs: LOCKOUT_DURATION_MS };
  }

  return { allowed: true };
}

function recordFailedAttempt(email: string) {
  const key = getRateLimitKey(email);
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) {
    loginAttempts.set(key, { count: 1, lastAttempt: now, lockedUntil: 0 });
  } else {
    record.count += 1;
    record.lastAttempt = now;
    if (record.count >= MAX_ATTEMPTS) {
      record.lockedUntil = now + LOCKOUT_DURATION_MS;
    }
  }
}

function clearAttempts(email: string) {
  loginAttempts.delete(getRateLimitKey(email));
}

// ── Actions ──

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // Rate limit check
  const rateLimit = checkRateLimit(email);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.remainingMs || 0) / 60000);
    return { error: `Too many failed attempts. Account locked for ${minutes} minute(s). Try again later.`, locked: true, remainingMs: rateLimit.remainingMs };
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    clearAttempts(email);
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }

  // Record failed attempt
  recordFailedAttempt(email);
  const updated = loginAttempts.get(getRateLimitKey(email));
  const remaining = MAX_ATTEMPTS - (updated?.count || 0);

  if (remaining <= 0) {
    return { error: "Too many failed attempts. Account locked for 5 minutes.", locked: true, remainingMs: LOCKOUT_DURATION_MS };
  }

  return { error: `Invalid credentials. ${remaining} attempt(s) remaining.` };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

export async function checkAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return !!session?.value;
}
