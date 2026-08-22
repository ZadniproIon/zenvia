"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@zenvia.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      toast.error("Invalid credentials.");
    } else {
      toast.success("Welcome back! Redirecting to admin dashboard...");
      router.push("/admin");
    }
  };

  const fillAdminCredentials = () => {
    setEmail("admin@zenvia.com");
    setPassword("password");
    toast.info("Demo Admin credentials filled!");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-[#F9F9F9] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-black/60 hover:text-black transition"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Storefront</span>
        </Link>

        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-black/10 shadow-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-white">
              <Lock className="size-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-black">ZENVIA Login</h1>
            <p className="text-xs sm:text-sm text-black/60">
              Sign in to manage inventory, view orders, and access the store dashboard.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 text-center font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-xs font-semibold text-black">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-black/40" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl bg-[#F0F0F0] border-0 pl-10 text-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-xs font-semibold text-black">Password</Label>
              <div className="relative mt-1">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-black/40" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl bg-[#F0F0F0] border-0 pl-10 text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-black text-white text-sm font-bold hover:bg-black/90 cursor-pointer shadow-md mt-2"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </Button>
          </form>

          {/* Demo Quick-Fill Box */}
          <div className="rounded-2xl border border-black/10 bg-[#F9F9F9] p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-green-600" />
                Demo Credentials:
              </span>
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-black/60">
              Email: <strong>admin@zenvia.com</strong> <br />
              Password: <strong>password</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
