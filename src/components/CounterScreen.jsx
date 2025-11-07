import React, { useEffect, useMemo, useState } from 'react';

// Simple counter dashboard that listens for new orders via localStorage
const CounterScreen = () => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('bbc_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Listen for cross-tab updates
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'bbc_orders') {
        try {
          setOrders(JSON.parse(e.newValue || '[]'));
        } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Persist on any local changes as well
  useEffect(() => {
    try {
      localStorage.setItem('bbc_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const grouped = useMemo(() => {
    const stages = { new: [], preparing: [], ready: [], done: [] };
    for (const o of orders) {
      (stages[o.status] || stages.new).push(o);
    }
    return stages;
  }, [orders]);

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const OrderCard = ({ o }) => (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{o.id}</div>
        <div className="text-xs text-white/50">{new Date(o.createdAt).toLocaleTimeString()}</div>
      </div>
      <div className="text-white/80 text-sm">For: {o.name} • {o.table}</div>
      <div className="space-y-1 text-sm">
        {o.items.map((it) => (
          <div key={it.id} className="flex items-center justify-between">
            <span>{it.name} × {it.qty}</span>
            <span className="text-white/70">₹{it.qty * it.price}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold text-[#00B4FF]">₹{o.total}</div>
        <div className="flex gap-2">
          {o.status !== 'preparing' && o.status !== 'done' && (
            <button onClick={() => updateStatus(o.id, 'preparing')} className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs border border-amber-400/30">Preparing</button>
          )}
          {o.status !== 'ready' && o.status !== 'done' && (
            <button onClick={() => updateStatus(o.id, 'ready')} className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs border border-emerald-400/30">Ready</button>
          )}
          {o.status !== 'done' && (
            <button onClick={() => updateStatus(o.id, 'done')} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs border border-white/20">Done</button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-6">Counter Orders</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <div className="text-white/70 mb-2">New</div>
          <div className="space-y-3">
            {grouped.new.map((o) => <OrderCard key={o.id} o={o} />)}
            {grouped.new.length === 0 && <div className="text-white/40 text-sm">No new orders</div>}
          </div>
        </div>
        <div>
          <div className="text-white/70 mb-2">Preparing</div>
          <div className="space-y-3">
            {grouped.preparing.map((o) => <OrderCard key={o.id} o={o} />)}
            {grouped.preparing.length === 0 && <div className="text-white/40 text-sm">No orders preparing</div>}
          </div>
        </div>
        <div>
          <div className="text-white/70 mb-2">Ready</div>
          <div className="space-y-3">
            {grouped.ready.map((o) => <OrderCard key={o.id} o={o} />)}
            {grouped.ready.length === 0 && <div className="text-white/40 text-sm">No orders ready</div>}
          </div>
        </div>
      </div>

      {orders.length > 0 && (
        <div className="mt-10">
          <div className="text-white/50 text-sm mb-2">Completed</div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {orders.filter((o) => o.status === 'done').map((o) => (
              <div key={o.id} className="rounded-lg bg-white/5 border border-white/10 p-3 text-white/70 text-sm">
                {o.id} • {o.table} • ₹{o.total}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CounterScreen;
