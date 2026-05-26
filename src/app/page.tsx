"use client";

import HeroAnimation from "@/components/HeroAnimation";
import Particles from "@/components/Particles";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Link from "next/link";

const HOMEPAGE_PRODUCTS = [
  {
    id: "genesis",
    name: "Original Strawberry Blend",
    edition: "Genesis Edition",
    price: 150,
    image: "/products/original.png",
    description: "Pure organic cold-pressed strawberries. Pure nutrition, zero compromise."
  },
  {
    id: "rose-mint",
    name: "Rose Strawberry Mint",
    edition: "Botanical Edition",
    price: 180,
    image: "/products/rose_mint.png",
    description: "Infused with organic rose petals and fresh field mint for natural rejuvenation."
  },
  {
    id: "berry-ginger",
    name: "Wild Berry Ginger",
    edition: "Wellness Edition",
    price: 200,
    image: "/products/wild_berry.png",
    description: "Wild forest berries with a fiery kick of fresh cold-pressed ginger root."
  },
  {
    id: "lemonade",
    name: "Strawberry Lemonade Spark",
    edition: "Zesty Edition",
    price: 150,
    image: "/products/lemonade.png",
    description: "Zesty Meyer lemon juice infused with sweet field strawberries and fresh mint."
  },
  {
    id: "coconut",
    name: "Strawberry Coconut Splash",
    edition: "Tropical Edition",
    price: 30,
    image: "/products/coconut.png",
    description: "Pure refreshing organic coconut water blended with ripe cold-pressed strawberries."
  },
  {
    id: "basil",
    name: "Strawberry Basil Fusion",
    edition: "Herbal Edition",
    price: 160,
    image: "/products/basil.png",
    description: "A sophisticated pairing of sweet sun-ripened strawberries and peppery sweet basil."
  }
];

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

function ProductsSection() {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  return (
    <section id="shop" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-transparent">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 space-y-8">
        <div className={`text-center space-y-2 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Our <span className="text-primary">Blends</span>
          </h2>
          <p className="text-gray-400 font-light text-[10px] md:text-xs tracking-[0.2em] uppercase">
            Collection 001 - Pure Organic Cold-Pressed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOMEPAGE_PRODUCTS.map((prod, idx) => (
            <div
              key={prod.id}
              className={`group p-4 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,23,68,0.15)] flex flex-col justify-between min-h-[420px] h-full transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Product Visual Container */}
              <div className="relative w-full h-[180px] flex items-center justify-center bg-white/[0.01] rounded-[1.5rem] overflow-hidden">
                {/* Glow behind image */}
                <div className="absolute w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="h-[140px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-1.5 mt-3 px-1">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-primary font-bold uppercase tracking-widest">{prod.edition}</span>
                  <span className="text-xs text-white font-medium">₹{prod.price}</span>
                </div>
                <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">{prod.name}</h3>
                <p className="text-[12px] text-gray-400 font-light leading-relaxed line-clamp-2 min-h-[40px]">{prod.description}</p>
              </div>

              {/* Call to Action */}
              <div className="mt-3 px-1">
                <Link
                  href={`/order?variant=${prod.id}`}
                  className="w-full py-2.5 bg-white hover:bg-primary hover:text-white text-black text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,23,68,0.4)] cursor-pointer"
                >
                  Order Variant
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        <ProductsSection />
        <CTASection />
      </div>
    </main>
  );
}
