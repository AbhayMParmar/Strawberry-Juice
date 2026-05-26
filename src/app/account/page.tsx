import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signout } from "../login/actions";
import Link from "next/link";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const username = user.email?.split('@')[0] || "user";

  // Fetch genuine orders from database
  const { data: ordersData } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const orders = ordersData || [];
  const totalOrders = orders.length;
  const totalInvested = orders.reduce((sum, order) => sum + Number(order.total), 0).toFixed(2);
  const loyaltyStatus = totalOrders >= 5 ? "Platinum Member" : totalOrders >= 1 ? "Gold Member" : "Member";

  return (
    <div className="min-h-screen overflow-y-auto bg-[#050505] text-white font-outfit relative flex flex-col pt-4 px-6 lg:px-24 pb-12">
      {/* Header */}
      <header className="flex-none flex items-center justify-between py-4 w-full max-w-6xl mx-auto relative z-10">
        <Link href="/" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Return Home
        </Link>
        <span className="text-white font-bold text-xs tracking-[0.2em] uppercase absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none hidden md:block">
          My Account
        </span>
        <form action={signout}>
          <button type="submit" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-colors">
            Sign Out
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto mt-6 flex-1 flex flex-col space-y-6 pb-6">
        {/* Welcome Section */}
        <div className="flex-none space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welcome back, <span className="text-gray-500">{username}</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base pt-1">Manage your seamless experience.</p>
        </div>

        {/* Info Cards Grid */}
        <div className="flex-none grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Loyalty Status */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[160px]">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4 border border-red-500/20 shadow-[0_0_15px_rgba(255,23,68,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1">Loyalty Status</p>
              <p className="text-xl md:text-2xl font-bold text-white tracking-tight">{loyaltyStatus}</p>
            </div>
          </div>

          {/* Card 2: Total Invested */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[160px]">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1">Total Invested</p>
              <p className="text-xl md:text-2xl font-bold text-white tracking-tight">₹{totalInvested}</p>
            </div>
          </div>

          {/* Card 3: Total Orders */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[160px]">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1">Total Orders</p>
              <p className="text-xl md:text-2xl font-bold text-white tracking-tight">{totalOrders}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="mt-8 flex flex-col space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white">Recent Orders</h2>
          
          <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden flex flex-col max-h-[400px]">
            {/* Table Header */}
            <div className="flex-none grid grid-cols-3 md:grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 bg-[#151515]">
              <div className="text-[9px] md:text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Date</div>
              <div className="col-span-1 md:col-span-2 text-[9px] md:text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Details</div>
              <div className="text-[9px] md:text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase text-right">Status</div>
            </div>

            {/* Table Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {orders.length === 0 ? (
                <div className="px-6 py-10 text-center text-gray-500 text-sm">
                  You have no recent orders.
                </div>
              ) : (
                orders.map((order) => {
                  const orderDate = new Date(order.created_at);
                  const dateStr = orderDate.toLocaleDateString('en-GB'); // e.g. "14/02/2026"
                  const timeStr = orderDate.toLocaleTimeString('en-GB', { hour12: false }); // e.g. "01:08:54"

                  return (
                    <div key={order.id} className="grid grid-cols-3 md:grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors last:border-b-0">
                      <div>
                        <p className="text-white text-xs md:text-sm font-medium">{dateStr}</p>
                        <p className="text-gray-500 text-[10px] md:text-xs mt-1 font-mono">{timeStr}</p>
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <p className="text-white text-xs md:text-sm font-medium truncate">{order.details}</p>
                        <p className="text-gray-500 text-[10px] md:text-xs mt-1 font-mono">ID: {order.id.slice(0, 8)}...</p>
                      </div>
                      <div className="text-right flex flex-col items-end justify-center">
                        <span className="bg-green-500/10 text-green-500 text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1 rounded-full border border-green-500/20 uppercase tracking-wider mb-1 md:mb-2">
                          {order.status}
                        </span>
                        <span className="text-white font-bold text-sm md:text-base">₹{Number(order.total).toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
