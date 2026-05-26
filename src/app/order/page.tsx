"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { confirmPayment, createRazorpayOrder } from "./actions";

const PRODUCTS = [
  {
    id: "genesis",
    name: "Original Strawberry Blend",
    edition: "Genesis Edition",
    collection: "Collection 001",
    price: 150.00,
    image: "/products/original.png",
    description: "Hand-picked organic berries, cold-pressed to perfection. Experience the taste of pure luxury in every bottle."
  },
  {
    id: "rose-mint",
    name: "Rose Strawberry Mint",
    edition: "Botanical Edition",
    collection: "Collection 002",
    price: 180.00,
    image: "/products/rose_mint.png",
    description: "Fragrant organic rose petals and cool field mint combined with our classic strawberry base for ultimate rejuvenation."
  },
  {
    id: "berry-ginger",
    name: "Wild Berry Ginger",
    edition: "Wellness Edition",
    collection: "Collection 003",
    price: 200.00,
    image: "/products/wild_berry.png",
    description: "A bold, invigorating twist. Wild forest strawberries blended with fresh cold-pressed ginger root for a zesty kick."
  },
  {
    id: "lemonade",
    name: "Strawberry Lemonade Spark",
    edition: "Zesty Edition",
    collection: "Collection 004",
    price: 150.00,
    image: "/products/lemonade.png",
    description: "Zesty Meyer lemon juice infused with sweet field strawberries and fresh mint."
  },
  {
    id: "coconut",
    name: "Strawberry Coconut Splash",
    edition: "Tropical Edition",
    collection: "Collection 005",
    price: 30.00,
    image: "/products/coconut.png",
    description: "Pure refreshing organic coconut water blended with ripe cold-pressed strawberries."
  },
  {
    id: "basil",
    name: "Strawberry Basil Fusion",
    edition: "Herbal Edition",
    collection: "Collection 006",
    price: 160.00,
    image: "/products/basil.png",
    description: "A sophisticated pairing of sweet sun-ripened strawberries and peppery sweet basil."
  }
];

function OrderPageContent() {
  const searchParams = useSearchParams();
  const variantParam = searchParams.get("variant");
  const initialIndex = PRODUCTS.findIndex((p) => p.id === variantParam);

  const [selectedProductIdx, setSelectedProductIdx] = useState(initialIndex !== -1 ? initialIndex : 0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageTransition, setImageTransition] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const activeProduct = PRODUCTS[selectedProductIdx];

  // Initialize independent quantities for all variants: 0 by default, 1 for initial variant
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initialQuantities: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      initialQuantities[p.id] = 0;
    });
    const activeId = PRODUCTS[initialIndex !== -1 ? initialIndex : 0]?.id;
    if (activeId) {
      initialQuantities[activeId] = 1;
    }
    return initialQuantities;
  });

  // Load state from localStorage on mount
  useEffect(() => {
    const savedQuantities = localStorage.getItem("strawberry_juice_quantities");
    if (savedQuantities) {
      try {
        setQuantities(JSON.parse(savedQuantities));
      } catch (e) {
        console.error("Failed to parse quantities", e);
      }
    }

    const savedIsConfirmed = localStorage.getItem("strawberry_juice_is_confirmed");
    if (savedIsConfirmed) {
      setIsConfirmed(savedIsConfirmed === "true");
    }

    const savedSelectedIdx = localStorage.getItem("strawberry_juice_selected_idx");
    if (savedSelectedIdx) {
      const idx = parseInt(savedSelectedIdx, 10);
      if (!isNaN(idx) && idx >= 0 && idx < PRODUCTS.length) {
        setSelectedProductIdx(idx);
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Save state to localStorage when it changes (only after client-side hydration is complete)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("strawberry_juice_quantities", JSON.stringify(quantities));
    }
  }, [quantities, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("strawberry_juice_is_confirmed", isConfirmed.toString());
    }
  }, [isConfirmed, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("strawberry_juice_selected_idx", selectedProductIdx.toString());
    }
  }, [selectedProductIdx, isInitialized]);

  // Calculate sum of selected variant prices
  const total = PRODUCTS.reduce((sum, prod) => {
    const qty = quantities[prod.id] || 0;
    return sum + qty * prod.price;
  }, 0).toFixed(2);

  const totalItemsCount = PRODUCTS.reduce((sum, prod) => sum + (quantities[prod.id] || 0), 0);

  // Sync index if URL param changes after mount
  useEffect(() => {
    if (variantParam) {
      const idx = PRODUCTS.findIndex((p) => p.id === variantParam);
      if (idx !== -1) {
        setSelectedProductIdx(idx);
        setQuantities((prev) => {
          if ((prev[variantParam] || 0) === 0) {
            return { ...prev, [variantParam]: 1 };
          }
          return prev;
        });
      }
    }
  }, [variantParam]);

  // Trigger smooth fade/scale transition when switching products
  useEffect(() => {
    setImageTransition(true);
    const timer = setTimeout(() => setImageTransition(false), 250);
    return () => clearTimeout(timer);
  }, [selectedProductIdx]);

  const handleSelectVariant = (idx: number) => {
    setSelectedProductIdx(idx);
    const activeId = PRODUCTS[idx].id;
    setQuantities((prev) => {
      if ((prev[activeId] || 0) === 0) {
        return { ...prev, [activeId]: 1 };
      }
      return prev;
    });
  };

  const handleIncrement = () => {
    const activeId = activeProduct.id;
    setQuantities((prev) => ({
      ...prev,
      [activeId]: Math.min((prev[activeId] || 0) + 1, 99),
    }));
  };

  const handleDecrement = () => {
    const activeId = activeProduct.id;
    setQuantities((prev) => {
      if ((prev[activeId] || 0) > 0) {
        return {
          ...prev,
          [activeId]: prev[activeId] - 1,
        };
      }
      // Smart fallback: find the first variant with qty > 0 and decrement it
      const fallbackProd = PRODUCTS.find((p) => (prev[p.id] || 0) > 0);
      if (fallbackProd) {
        return {
          ...prev,
          [fallbackProd.id]: prev[fallbackProd.id] - 1,
        };
      }
      return prev;
    });
  };

  const onSubmit = (formData: FormData) => {
    const selectedItems = PRODUCTS.filter((p) => (quantities[p.id] || 0) > 0);
    const detailsString = selectedItems
      .map((p) => `${quantities[p.id]} x ${p.name} (${p.edition})`)
      .join(", ");
    const totalItems = selectedItems.reduce((sum, p) => sum + (quantities[p.id] || 0), 0);
    const totalPrice = selectedItems.reduce(
      (sum, p) => sum + (quantities[p.id] || 0) * p.price,
      0
    );

    formData.append("total", totalPrice.toString());
    formData.append("items_count", totalItems.toString());
    formData.append("details", detailsString);

    startTransition(async () => {
      try {
        const { orderId, dbOrderId, amount, currency } = await createRazorpayOrder(formData);

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Slnt2aieOZXUo8",
          amount: amount.toString(),
          currency: currency,
          name: "Strawberry Juice Premium",
          description: detailsString.length > 40 ? `${totalItems} Premium Blends` : detailsString,
          order_id: orderId,
          handler: async function (response: any) {
            try {
              await confirmPayment(dbOrderId);
              setIsConfirmed(true);
            } catch (err) {
              console.error("Failed to save order to database:", err);
            }
          },
          prefill: {
            name: "Customer",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#FF1744", // Vibrant red
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          console.error("Payment failed:", response.error);
        });
        rzp.open();
        
      } catch (error) {
        console.error("Order initiation failed", error);
      }
    });
  };

  return (
    <div className="min-h-screen lg:h-screen bg-[#050505] text-white font-outfit flex flex-col lg:flex-row lg:overflow-hidden relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Left Section: Visual Presentation */}
      <div className="w-full lg:w-1/2 relative h-[45vh] lg:h-screen border-r border-white/5 flex flex-col items-center justify-center py-8 lg:py-0">
        
        {/* Subtle red ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Product Image Frame */}
        <div className="relative w-full max-w-[240px] sm:max-w-xs lg:max-w-sm aspect-square flex items-center justify-center z-10">
           <img 
             src={activeProduct.image} 
             alt={activeProduct.name} 
             className={`w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,23,68,0.25)] transition-all duration-300 ease-out ${
               imageTransition ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
             }`}
           />
        </div>

        {/* Collection details - bottom left */}
        <div className="absolute bottom-6 left-8 z-10 hidden lg:block">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">
            {activeProduct.collection}
          </p>
          <h2 className="text-lg text-white font-light tracking-[0.1em] uppercase">
            {activeProduct.edition}
          </h2>
        </div>
      </div>

      <div className="w-full lg:w-1/2 min-h-[55vh] lg:h-screen flex flex-col px-6 py-4 lg:py-6 lg:px-12 relative bg-[#0A0A0A] overflow-y-auto lg:overflow-hidden justify-between">
        
        {/* Top Left Back Link */}
        <div className="w-full max-w-md mx-auto pt-1 lg:pt-2 mb-2">
          <Link href="/#shop" className="text-gray-400 hover:text-white transition-colors text-[10px] font-bold tracking-widest flex items-center gap-2 uppercase w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </Link>
        </div>

        {isConfirmed ? (
          /* --- Confirmation State --- */
          <div className="flex flex-col items-center justify-center max-w-md mx-auto z-10 text-center w-full my-auto pb-10">
            {/* Glowing Checkmark */}
            <div className="relative w-20 h-20 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl" />
              <div className="relative w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">Order Confirmed!</h1>
            
            <p className="text-gray-400 text-xs leading-relaxed mb-5 max-w-sm px-4">
              Thank you for your purchase. We are preparing your premium {totalItemsCount > 1 ? "blends" : "blend"} for shipment.
            </p>

            {/* Order Summary Box */}
            <div className="w-full max-w-sm bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-6 text-left space-y-2.5">
              <div className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.15em] border-b border-white/5 pb-2">
                Order Summary ({totalItemsCount} {totalItemsCount > 1 ? "Items" : "Item"})
              </div>
              <div className="space-y-2 max-h-[140px] overflow-y-auto no-scrollbar">
                {PRODUCTS.filter((p) => (quantities[p.id] || 0) > 0).map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-xs">
                    <span className="text-gray-300 font-medium">
                      {p.name.replace("Strawberry", "").trim()}
                    </span>
                    <span className="text-gray-500 font-mono text-[11px]">
                      {quantities[p.id]}x @ ₹{p.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-2 text-sm font-bold text-white">
                <span>Total Paid</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            <Link 
              href="/#shop"
              onClick={() => {
                // Reset states and clear localStorage to allow starting a new order
                const resetQuantities: Record<string, number> = {};
                PRODUCTS.forEach((p) => {
                  resetQuantities[p.id] = 0;
                });
                resetQuantities[PRODUCTS[0].id] = 1;
                setQuantities(resetQuantities);
                setSelectedProductIdx(0);
                setIsConfirmed(false);
                localStorage.removeItem("strawberry_juice_quantities");
                localStorage.removeItem("strawberry_juice_is_confirmed");
                localStorage.removeItem("strawberry_juice_selected_idx");
              }}
              className="bg-white hover:bg-gray-200 text-black font-bold text-[10px] lg:text-xs tracking-[0.2em] uppercase py-3 px-8 lg:py-4 lg:px-10 rounded-full transition-all duration-300"
            >
              BACK TO PRODUCTS
            </Link>
          </div>
        ) : (
          /* --- Normal Order State --- */
          <div className="max-w-md w-full mx-auto space-y-3 lg:space-y-4 pb-4">
            
            {/* Titles & Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl lg:text-2xl font-extrabold leading-none tracking-tight text-white">
                  {activeProduct.name}
                </h1>
                <div className="bg-red-500/10 text-red-500 text-[8px] font-bold px-2 py-0.5 rounded-full border border-red-500/20 uppercase tracking-widest whitespace-nowrap">
                  In Stock
                </div>
              </div>
              
              <div className="text-[9px] text-primary font-bold uppercase tracking-wider">
                {activeProduct.edition}
              </div>
              
              <p className="text-gray-400 text-[10px] lg:text-[11px] leading-normal max-w-[95%]">
                {activeProduct.description}
              </p>

              {/* Slider / Progress UI Element */}
              <div className="pt-1 pb-1">
                <div className="w-full h-[1px] bg-white/10 relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                </div>
              </div>
            </div>

            {/* Product Variant Selector */}
            <div className="space-y-1.5">
              <span className="text-[9px] lg:text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase block">Select Variant</span>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.map((prod, idx) => {
                  const qty = quantities[prod.id] || 0;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleSelectVariant(idx)}
                      className={`py-1.5 px-2 rounded-xl border text-left transition-all duration-300 relative ${
                        selectedProductIdx === idx
                          ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(255,23,68,0.2)]"
                          : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                      }`}
                    >
                      {/* Quantity Badge */}
                      {qty > 0 && (
                        <div className="absolute top-1 right-1 bg-primary text-white text-[7px] font-bold px-1 py-0.5 rounded-md leading-none">
                          {qty}x
                        </div>
                      )}
                      <div className="text-[7px] text-gray-400 font-bold uppercase tracking-wider mb-0.5 truncate pr-3">{prod.edition.split(' ')[0]}</div>
                      <div className="text-white text-[11px] font-semibold mb-0.5 truncate pr-3">{prod.name.replace("Strawberry", "").trim()}</div>
                      <div className="text-white/60 text-[10px] font-light">₹{prod.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Divider */}
            <div className="w-full h-[1px] bg-white/5" />

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] lg:text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase">
                Overall Qty
              </span>
              
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                <button 
                  type="button"
                  onClick={handleDecrement}
                  disabled={isPending}
                  className="w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors font-medium disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-4 text-center text-white font-medium text-xs">
                  {totalItemsCount}
                </span>
                <button 
                  type="button"
                  onClick={handleIncrement}
                  disabled={isPending}
                  className="w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors font-medium disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cart Summary Details */}
            {totalItemsCount > 0 && (
              <div className="text-[10px] text-gray-500 font-medium tracking-wide flex flex-wrap gap-x-2 gap-y-1 py-0.5 border-t border-white/5 pt-1.5">
                <span className="text-gray-400 uppercase tracking-widest text-[8px] font-bold flex items-center">Cart:</span>
                {PRODUCTS.filter(p => (quantities[p.id] || 0) > 0).map(p => (
                  <span key={p.id} className="text-white bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-md text-[9px] whitespace-nowrap">
                    {p.name.replace("Strawberry", "").replace(/\s+/g, " ").trim()} ({quantities[p.id]}x)
                  </span>
                ))}
              </div>
            )}

            {/* Total Price */}
            <div className="flex items-center justify-between border-t border-white/5 pt-1.5">
              <span className="text-[9px] lg:text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase">Total</span>
              <span className="text-xl lg:text-2xl font-light text-white tracking-tight">₹{total}</span>
            </div>

            {/* Purchase Button Area */}
            <div className="pt-1 flex items-center gap-3">
              <form action={onSubmit} className="w-full">
                <button 
                  type="submit" 
                  disabled={isPending || totalItemsCount === 0}
                  className="group relative w-full bg-white text-black font-bold text-[10px] lg:text-xs tracking-[0.1em] uppercase py-3 px-4 rounded-xl flex items-center justify-center overflow-hidden transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {/* Background slide element */}
                  <div className="absolute inset-0 bg-red-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                  
                  {/* Content wrapper */}
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                    {isPending ? (
                      <>
                        Processing...
                        <svg className="animate-spin h-3 w-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </>
                    ) : totalItemsCount === 0 ? (
                      "Select variants to purchase"
                    ) : (
                      <>
                        Purchase Now
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-outfit">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Loading Experience...</span>
      </div>
    }>
      <OrderPageContent />
    </Suspense>
  );
}
