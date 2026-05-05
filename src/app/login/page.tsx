"use client";

import { Suspense, useState } from "react";
import { login, signup } from "./actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="flex bg-black min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden font-outfit">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-800/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Card */}
      <div className="max-w-[400px] w-full space-y-8 bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 z-10 relative shadow-2xl">
        {/* Close Button */}
        <Link 
          href="/" 
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            {isLogin ? "Access your premium profile." : "Join our premium community."}
          </p>
        </div>

        {/* Form */}
        <form className="mt-10 space-y-4" action={isLogin ? login : signup}>
          <div className="space-y-4">
            <div className="relative">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-[1.2rem] relative block w-full px-5 py-4 border-none placeholder-gray-400 text-black bg-[#E8F0FE] focus:outline-none focus:ring-2 focus:ring-red-500/50 sm:text-sm font-medium transition-all duration-300"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-[1.2rem] relative block w-full px-5 py-4 border-none placeholder-gray-400 text-black bg-[#E8F0FE] focus:outline-none focus:ring-2 focus:ring-red-500/50 sm:text-sm font-medium transition-all duration-300"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xs font-bold rounded-[1.2rem] text-white bg-[#FF1744] hover:bg-[#D50000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 uppercase tracking-[0.2em] shadow-[0_8px_20px_-6px_rgba(255,23,68,0.5)]"
            >
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>
          </div>

          {/* Toggle */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-gray-500 font-medium hover:text-white transition-colors tracking-wide"
            >
              {isLogin ? (
                <>Don&apos;t have an account? <span className="text-white font-bold ml-1">Sign Up</span></>
              ) : (
                <>Already have an account? <span className="text-white font-bold ml-1">Sign In</span></>
              )}
            </button>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-red-500/10 text-red-400 text-center text-[11px] rounded-xl border border-red-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
