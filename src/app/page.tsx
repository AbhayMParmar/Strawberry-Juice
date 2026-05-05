"use client";

import HeroAnimation from "@/components/HeroAnimation";
import Particles from "@/components/Particles";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function StorySection() {
  const { ref, isVisible } = useIntersectionObserver(0.3);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 py-24">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div 
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">Crafted with Love</h2>
        <p className="text-xl md:text-3xl text-gray-300 leading-relaxed font-light">
          Every bottle is cold-pressed from the freshest strawberries, delivering pure nutrition without compromise.
        </p>
      </div>
    </section>
  );
}

function IngredientsSection() {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div 
            className={`group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,23,68,0.3)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="text-5xl mb-6">🍓</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Fresh Strawberries</h3>
            <p className="text-gray-400">Hand-picked from organic farms at peak ripeness for maximum flavor.</p>
          </div>
          
          {/* Card 2 */}
          <div 
            className={`group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,23,68,0.3)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="text-5xl mb-6">💧</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Pure Spring Water</h3>
            <p className="text-gray-400">Filtered spring water that brings out the natural essence of the fruit.</p>
          </div>
          
          {/* Card 3 */}
          <div 
            className={`group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,23,68,0.3)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="text-5xl mb-6">🍃</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Natural Sweetness</h3>
            <p className="text-gray-400">No added sugars. Just the pure, unadulterated sweetness of nature.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

function CTASection() {
  const { ref, isVisible } = useIntersectionObserver(0.3);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,23,68,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div 
        className={`text-center z-10 transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Link href="/order" className="group relative inline-block px-12 py-6 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-bold text-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,23,68,0.6)] cursor-pointer">
          Order Now
          <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/50 transition-colors" />
        </Link>
        <p className="mt-8 text-gray-400 text-lg">Free delivery on your first order</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <Particles />
      <HeroAnimation />
      
      <div className="relative z-10 bg-transparent">
        <StorySection />
        <IngredientsSection />
        <CTASection />
      </div>
    </main>
  );
}
