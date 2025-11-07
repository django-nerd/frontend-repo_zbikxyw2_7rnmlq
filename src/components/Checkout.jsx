import React, { useState, useEffect } from 'react';

const Checkout = ({ items, onConfirm }) => {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [table, setTable] = useState('');
  const [takeaway, setTakeaway] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('table');
      if (t) setTable(t);
    } catch {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = { name, phone, table: takeaway ? 'Takeaway' : table, items, total, eta: '15-20 mins' };
    onConfirm(order);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 text-white">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#00B4FF] outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#00B4FF] outline-none"
              placeholder="10-digit number"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input id="takeaway" type="checkbox" checked={takeaway} onChange={(e) => setTakeaway(e.target.checked)} />
          <label htmlFor="takeaway" className="text-white/80">Takeaway</label>
        </div>

        {!takeaway && (
          <div>
            <label className="block text-sm text-white/70 mb-1">Table Number</label>
            <input
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#00B4FF] outline-none"
              placeholder="e.g., T3"
            />
            <p className="text-xs text-white/50 mt-1">Tip: Use QR mode to auto-fill this.</p>
          </div>
        )}

        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center justify-between text-white/80">
            <span>Order Total</span>
            <span className="text-[#00B4FF] font-semibold">₹{total}</span>
          </div>
        </div>

        <button type="submit" className="w-full px-4 py-3 rounded-full bg-[#00B4FF] text-black font-semibold hover:brightness-110 shadow shadow-sky-500/30">
          Pay & Place Order
        </button>
      </form>
    </section>
  );
};

export default Checkout;
