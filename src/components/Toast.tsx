"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function ToastContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const success = searchParams.get("success");
    if (success) {
      setMessage(success);
      setShow(true);
      
      // Clean up the URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("success");
      const newUrl = `${pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""}`;
      router.replace(newUrl, { scroll: false });

      // Hide toast after 4 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, pathname, router]);

  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-[#1a1a1a] border border-green-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-full px-6 py-3 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <p className="text-white text-sm font-medium tracking-wide">{message}</p>
      </div>
    </div>
  );
}

export default function Toast() {
  return (
    <Suspense fallback={null}>
      <ToastContent />
    </Suspense>
  );
}
