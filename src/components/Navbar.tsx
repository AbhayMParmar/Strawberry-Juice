"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  if (pathname === "/account" || pathname === "/order") {
    return null;
  }


  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-8 flex justify-between items-center bg-transparent pointer-events-none">
      <Link href="/" className="flex items-center gap-3 pointer-events-auto cursor-pointer">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,23,68,0.8)]" />
        <span className="text-white font-bold tracking-[0.2em] uppercase text-sm">Pure</span>
      </Link>

      <div className="flex items-center gap-8 pointer-events-auto">
        <Link
          href={user ? "/account" : "/login"}
          className="text-gray-300 hover:text-white transition-colors text-[11px] font-semibold tracking-[0.2em] uppercase"
        >
          Account
        </Link>
        <a href="/#shop" className="text-gray-300 hover:text-white transition-colors text-[11px] font-semibold tracking-[0.2em] uppercase">Shop</a>

        <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-black transition-all duration-300 group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

