import React from 'react';

const MobileMenuSheet = ({ open, onClose, onNavigate }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-5/6 max-w-xs bg-black border-l border-white/10 p-6 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="text-white font-semibold mb-4">Menu</div>
        <div className="space-y-2">
          <button onClick={() => { onNavigate('home'); onClose(); }} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white">Home</button>
          <button onClick={() => { onNavigate('menu'); onClose(); }} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white">Menu</button>
          <button onClick={() => { onNavigate('cart'); onClose(); }} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white">Cart</button>
          <button onClick={() => { onNavigate('checkout'); onClose(); }} className="w-full text-left px-4 py-3 rounded-lg bg-[#00B4FF] text-black font-semibold">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuSheet;
