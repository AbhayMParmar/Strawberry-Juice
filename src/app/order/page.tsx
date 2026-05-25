"use client";

<<<<<<< HEAD
import { useState, useTransition, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
=======
import { useState, useTransition } from "react";
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
import Link from "next/link";
import Script from "next/script";
import { placeOrder, createRazorpayOrder } from "./actions";

<<<<<<< HEAD
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
  }
];

function OrderPageContent() {
  const searchParams = useSearchParams();
  const variantParam = searchParams.get("variant");
  const initialIndex = PRODUCTS.findIndex((p) => p.id === variantParam);

  const [selectedProductIdx, setSelectedProductIdx] = useState(initialIndex !== -1 ? initialIndex : 0);
  const [quantity, setQuantity] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageTransition, setImageTransition] = useState(false);

  const activeProduct = PRODUCTS[selectedProductIdx];
  const pricePerBottle = activeProduct.price;
  const total = (quantity * pricePerBottle).toFixed(2);

  // Sync index if URL param changes after mount
  useEffect(() => {
    if (variantParam) {
      const idx = PRODUCTS.findIndex((p) => p.id === variantParam);
      if (idx !== -1) {
        setSelectedProductIdx(idx);
      }
    }
  }, [variantParam]);

  // Trigger smooth fade/scale transition when switching products
  useEffect(() => {
    setImageTransition(true);
    const timer = setTimeout(() => setImageTransition(false), 250);
    return () => clearTimeout(timer);
  }, [selectedProductIdx]);

=======
export default function OrderPage() {
  const [quantity, setQuantity] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pricePerBottle = 2.00;
  const total = (quantity * pricePerBottle).toFixed(2);

>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const onSubmit = (formData: FormData) => {
<<<<<<< HEAD
    // Append the selected product details to the form data
    formData.append("price", activeProduct.price.toString());
    formData.append("productName", activeProduct.name);
    formData.append("edition", activeProduct.edition);

=======
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
    startTransition(async () => {
      try {
        const { orderId, amount, currency } = await createRazorpayOrder(formData);

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Slnt2aieOZXUo8",
          amount: amount.toString(),
          currency: currency,
          name: "Strawberry Juice Premium",
<<<<<<< HEAD
          description: `${activeProduct.name} - ${activeProduct.edition}`,
          order_id: orderId,
          handler: async function (response: any) {
=======
          description: "Premium Strawberry Blend",
          order_id: orderId,
          handler: async function (response: any) {
            // After successful payment, place order in the database
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
            try {
              await placeOrder(formData);
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
<<<<<<< HEAD
    <div className="min-h-screen lg:h-screen bg-[#050505] text-white font-outfit flex flex-col lg:flex-row lg:overflow-hidden relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Left Section: Visual Presentation */}
      <div className="w-full lg:w-1/2 relative h-[45vh] lg:h-screen border-r border-white/5 flex flex-col items-center justify-center py-8 lg:py-0">
=======
    <div className="min-h-screen h-screen bg-[#050505] text-white font-outfit flex flex-col lg:flex-row overflow-hidden relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Left Section: Visual Presentation */}
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-screen border-r border-white/5 flex flex-col items-center justify-center">
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
        
        {/* Subtle red ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        
<<<<<<< HEAD
        {/* Product Image Frame */}
        <div className="relative w-full max-w-[240px] sm:max-w-xs lg:max-w-sm aspect-square flex items-center justify-center z-10">
           <img 
             src={activeProduct.image} 
             alt={activeProduct.name} 
             className={`w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,23,68,0.25)] transition-all duration-300 ease-out ${
               imageTransition ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
             }`}
=======
        {/* Product Video/Image Frame */}
        <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-square flex items-center justify-center z-10">
           <img 
             src="/frames/00096.png" 
             alt="Original Strawberry Blend" 
             className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,23,68,0.2)]"
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
           />
        </div>

        {/* Collection details - bottom left */}
        <div className="absolute bottom-6 left-8 z-10 hidden lg:block">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">
<<<<<<< HEAD
            {activeProduct.collection}
          </p>
          <h2 className="text-lg text-white font-light tracking-[0.1em] uppercase">
            {activeProduct.edition}
=======
            Collection 001
          </p>
          <h2 className="text-lg text-white font-light tracking-[0.1em] uppercase">
            Genesis Edition
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
          </h2>
        </div>
      </div>

      {/* Right Section: Content Area */}
<<<<<<< HEAD
      <div className="w-full lg:w-1/2 min-h-[55vh] lg:h-screen flex flex-col px-6 py-6 lg:px-12 relative bg-[#0A0A0A] overflow-y-auto lg:overflow-hidden justify-between">
        
        {/* Top Left Back Link */}
        <div className="w-full max-w-md mx-auto pt-2 lg:pt-4 mb-4">
          <Link href="/#shop" className="text-gray-400 hover:text-white transition-colors text-[10px] font-bold tracking-widest flex items-center gap-2 uppercase w-fit">
=======
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen flex flex-col px-6 py-4 lg:px-12 relative bg-[#0A0A0A] overflow-y-auto lg:overflow-hidden">
        
        {/* Top Left Back Link (Always visible on right) */}
        <div className="w-full max-w-md mx-auto pt-2 lg:pt-4 mb-auto">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-[10px] font-bold tracking-widest flex items-center gap-2 uppercase w-fit">
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </Link>
        </div>

        {isConfirmed ? (
          /* --- Confirmation State --- */
<<<<<<< HEAD
          <div className="flex flex-col items-center justify-center max-w-md mx-auto z-10 text-center w-full my-auto pb-10">
=======
          <div className="flex flex-col items-center justify-center max-w-md mx-auto z-10 text-center w-full mb-auto pb-10">
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
            {/* Glowing Checkmark */}
            <div className="relative w-20 h-20 flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl" />
              <div className="relative w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">Order Confirmed!</h1>
            
            <p className="text-gray-400 text-xs leading-relaxed mb-8 max-w-sm px-4">
<<<<<<< HEAD
              Thank you for your purchase of {activeProduct.name}. We are preparing your premium blend for shipment.
            </p>

            <Link 
              href="/#shop"
              className="bg-white hover:bg-gray-200 text-black font-bold text-[10px] lg:text-xs tracking-[0.2em] uppercase py-3 px-8 lg:py-4 lg:px-10 rounded-full transition-all duration-300"
            >
              BACK TO PRODUCTS
=======
              Thank you for your purchase. We are preparing your premium blend for shipment.
            </p>

            <Link 
              href="/"
              className="bg-white hover:bg-gray-200 text-black font-bold text-[10px] lg:text-xs tracking-[0.2em] uppercase py-3 px-8 lg:py-4 lg:px-10 rounded-full transition-all duration-300"
            >
              BACK TO HOME
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
            </Link>
          </div>
        ) : (
          /* --- Normal Order State --- */
<<<<<<< HEAD
          <div className="max-w-md w-full mx-auto space-y-4 lg:space-y-6 pb-6">
            
            {/* Header row: Stock Tag */}
=======
          <div className="max-w-md w-full mx-auto space-y-4 lg:space-y-6 mb-auto pb-4">
            
            {/* Header row: Stock Tag (Back is handled above) */}
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
            <div className="flex items-center justify-end">
              <div className="bg-red-500/10 text-red-500 text-[9px] font-bold px-2 py-1 rounded-full border border-red-500/20 uppercase tracking-widest">
                In Stock
              </div>
            </div>

            {/* Titles & Description */}
            <div className="space-y-2">
<<<<<<< HEAD
              <h1 className="text-2xl lg:text-3xl font-extrabold leading-none tracking-tight text-white">
                {activeProduct.name}
              </h1>
              
              <div className="text-[10px] text-primary font-bold uppercase tracking-wider">
                {activeProduct.edition}
              </div>
              
              <p className="text-gray-400 text-[11px] lg:text-xs leading-relaxed max-w-[95%] pt-1">
                {activeProduct.description}
=======
              <h1 className="text-3xl lg:text-4xl font-extrabold leading-none">
                <span className="block text-white">Original</span>
                <span className="block text-gray-400">Strawberry</span>
                <span className="block text-gray-500">Blend</span>
              </h1>
              
              <p className="text-gray-400 text-[10px] lg:text-xs leading-relaxed max-w-[90%] pt-1">
                Hand-picked berries, cold-pressed to perfection. Experience the taste of pure luxury in every bottle.
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
              </p>

              {/* Slider / Progress UI Element */}
              <div className="pt-2 pb-1">
                <div className="w-full h-[1px] bg-white/10 relative">
<<<<<<< HEAD
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
=======
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full cursor-pointer hover:scale-125 transition-transform" />
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
                </div>
              </div>
            </div>

<<<<<<< HEAD
            {/* Product Variant Selector */}
            <div className="space-y-2">
              <span className="text-[10px] lg:text-xs text-gray-400 font-bold tracking-[0.15em] uppercase block">Select Variant</span>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSelectedProductIdx(idx);
                      setQuantity(1); // reset quantity to 1 on variant change
                    }}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                      selectedProductIdx === idx
                        ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(255,23,68,0.2)]"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <div className="text-[8px] text-gray-400 font-bold uppercase tracking-wider mb-1 truncate">{prod.edition.split(' ')[0]}</div>
                    <div className="text-white text-xs font-semibold mb-1 truncate">{prod.name.replace("Strawberry", "").trim()}</div>
                    <div className="text-white/60 text-xs font-light">₹{prod.price}</div>
                  </button>
                ))}
              </div>
            </div>

=======
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
            {/* Divider */}
            <div className="w-full h-[1px] bg-white/5" />

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
<<<<<<< HEAD
              <span className="text-[10px] lg:text-xs text-gray-400 font-bold tracking-[0.15em] uppercase">Quantity</span>
=======
              <span className="text-[10px] lg:text-xs text-gray-400 font-bold tracking-[0.2em] uppercase">Quantity</span>
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
              
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1">
                <button 
                  type="button"
                  onClick={handleDecrement}
                  disabled={isPending}
                  className="w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors font-medium disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-4 text-center text-white font-medium text-xs">{quantity}</span>
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

            {/* Total Price */}
            <div className="flex items-center justify-between pt-1">
<<<<<<< HEAD
              <span className="text-[10px] lg:text-xs text-gray-400 font-bold tracking-[0.15em] uppercase">Total</span>
=======
              <span className="text-[10px] lg:text-xs text-gray-400 font-bold tracking-[0.2em] uppercase">Total</span>
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
              <span className="text-2xl lg:text-3xl font-light text-white tracking-tight">₹{total}</span>
            </div>

            {/* Purchase Button Area */}
            <div className="pt-2 flex items-center gap-3">
              <form action={onSubmit} className="w-full">
                <input type="hidden" name="quantity" value={quantity} />
                
                <button 
                  type="submit" 
                  disabled={isPending}
<<<<<<< HEAD
                  className="group relative w-full bg-white text-black font-bold text-[10px] lg:text-xs tracking-[0.1em] uppercase py-3.5 px-4 rounded-xl flex items-center justify-center overflow-hidden transition-all disabled:opacity-80 cursor-pointer"
=======
                  className="group relative w-full bg-white text-black font-bold text-[10px] lg:text-xs tracking-[0.1em] uppercase py-3 px-4 rounded-xl flex items-center justify-center overflow-hidden transition-all disabled:opacity-80"
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
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
<<<<<<< HEAD

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
=======
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
