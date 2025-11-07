import React from 'react';

const OrderSuccess = ({ order, onBackToHome }) => {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-white text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-[#00B4FF] text-black font-bold grid place-items-center text-2xl shadow shadow-sky-500/30 mb-6">✓</div>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Order Successful</h2>
      <p className="text-white/70 mb-8">Thank you, {order?.name}. Your order is being prepared.</p>

      <div className="rounded-xl bg-white/5 border border-white/10 p-6 text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70">Order for</span>
          <span>{order?.table}</span>
        </div>
        <div className="space-y-2 mt-4">
          {order?.items?.map((it) => (
            <div key={it.id} className="flex items-center justify-between text-white/90">
              <span>{it.name} × {it.qty}</span>
              <span>₹{it.price * it.qty}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-semibold mt-4">
          <span>Total</span>
          <span className="text-[#00B4FF]">₹{order?.total}</span>
        </div>
        <div className="text-white/70 mt-2">Estimated time: {order?.eta}</div>
      </div>

      <button
        onClick={onBackToHome}
        className="mt-8 px-6 py-3 rounded-full bg-[#00B4FF] text-black font-semibold hover:brightness-110 shadow shadow-sky-500/30"
      >
        Back to Home
      </button>
    </section>
  );
};

export default OrderSuccess;
