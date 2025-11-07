import React from 'react';
import { ShoppingCart, Menu as MenuIcon } from 'lucide-react';

const Navbar = ({ onNavigate, cartCount, onToggleMenu }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group"
          aria-label="Back Bencher Café Home"
        >
          <img
            src="/favicon.svg"
            alt="Back Bencher Café Logo"
            className="h-9 w-9 rounded-md object-contain ring-1 ring-white/10 shadow-md"
          />
          <div className="text-left">
            <div className="text-white font-semibold leading-tight tracking-tight">
              Back Bencher Café
            </div>
            <div className="text-xs text-white/60 -mt-0.5">Sip. Snack. Sit Back.</div>
          </div>
        </button>

        <nav className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => onNavigate('menu')}
            className="px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white border border-white/10 hover:border-white/20 transition"
          >
            Menu
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white border border-white/10 hover:border-white/20 transition"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className="px-4 py-2 rounded-full text-sm font-medium text-black bg-[#00B4FF] hover:brightness-110 transition shadow-lg shadow-sky-500/20"
          >
            Order Now
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('cart')}
            className="relative rounded-full p-2 hover:bg-white/5 transition text-white"
            aria-label="View cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-[10px] font-bold bg-[#00B4FF] text-black rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow shadow-sky-500/30">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="sm:hidden rounded-full p-2 hover:bg-white/5 transition text-white"
            onClick={onToggleMenu}
            aria-label="Open menu"
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
