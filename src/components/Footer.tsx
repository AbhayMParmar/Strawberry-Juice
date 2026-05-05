export default function Footer() {
  return (
    <footer className="relative bg-[#020202] pt-24 pb-12 border-t border-white/5 overflow-hidden z-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              <span className="text-white font-bold tracking-[0.25em] uppercase text-2xl">Pure</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed font-light">
              Cold-pressed perfection. Elevating the standard of nutrition with premium, unaltered organic ingredients sourced from the world's finest farms.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'TikTok'].map((social) => (
                <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-8 uppercase tracking-[0.2em] text-xs">Explore</h4>
            <ul className="space-y-4">
              {['Our Story', 'Ingredients', 'The Process', 'Journal'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-8 uppercase tracking-[0.2em] text-xs">Newsletter</h4>
            <p className="text-gray-400 mb-6 text-sm font-light">Join the inner circle for exclusive offers and early access to new blends.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 hover:bg-primary transition-all cursor-pointer group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors group-hover/btn:stroke-white">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] font-semibold text-gray-600 tracking-[0.15em] uppercase">
          <p>&copy; {new Date().getFullYear()} PURE JUICE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
