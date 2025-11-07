import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuGrid from './components/MenuGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import MobileMenuSheet from './components/MobileMenuSheet';
import QRHint from './components/QRHint';

function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bbc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [order, setOrder] = useState(null);

  // Minimal PWA bootstrapping without editing index.html
  useEffect(() => {
    const ensureTag = (selector, create) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };

    ensureTag('link[rel="manifest"]', () => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'manifest');
      link.setAttribute('href', '/manifest.webmanifest');
      return link;
    });

    const theme = ensureTag('meta[name="theme-color"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      return meta;
    });
    theme.setAttribute('content', '#00B4FF');

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bbc_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

  const handleAdd = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const inc = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
        .filter((p) => p.qty > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const goCheckout = () => setView('checkout');
  const goMenu = () => setView('menu');
  const goHome = () => setView('home');

  const confirmOrder = (o) => {
    setOrder(o);
    setCart([]);
    setView('success');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* glow accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#00B4FF]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#00B4FF]/10 blur-3xl" />
      </div>

      <Navbar
        onNavigate={(v) => setView(v)}
        cartCount={cartCount}
        onToggleMenu={() => setMobileMenuOpen(true)}
      />

      {view === 'home' && (
        <>
          <Hero onOrder={goMenu} />
          <QRHint />
          <MenuGrid onAdd={handleAdd} />
        </>
      )}

      {view === 'menu' && <MenuGrid onAdd={handleAdd} />}

      {view === 'cart' && (
        <Cart items={cart} onInc={inc} onDec={dec} onRemove={removeItem} onCheckout={goCheckout} />
      )}

      {view === 'checkout' && <Checkout items={cart} onConfirm={confirmOrder} />}

      {view === 'success' && <OrderSuccess order={order} onBackToHome={goHome} />}

      <MobileMenuSheet
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={(v) => {
          setView(v);
          setMobileMenuOpen(false);
        }}
      />

      <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-white/40">
        © {new Date().getFullYear()} Back Bencher Café • Made with ♥
      </footer>
    </div>
  );
}

export default App;
