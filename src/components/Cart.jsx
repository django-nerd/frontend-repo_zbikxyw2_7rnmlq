import React from 'react';

const Cart = ({ items, onInc, onDec, onRemove, onCheckout }) => {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 text-white">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-white/70">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <img src={it.photo} alt={it.name} className="h-16 w-20 rounded-md object-cover" />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-[#00B4FF]">₹{it.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDec(it.id)}
                    className="h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/5"
                  >
                    -
                  </button>
                  <div className="w-8 text-center">{it.qty}</div>
                  <button
                    onClick={() => onInc(it.id)}
                    className="h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/5"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemove(it.id)}
                  className="ml-4 text-sm text-white/70 hover:text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 h-fit">
            <div className="flex items-center justify-between text-white/90 mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex items-center justify-between text-white/60 text-sm mb-4">
              <span>Taxes & charges</span>
              <span>Included</span>
            </div>
            <div className="flex items-center justify-between font-semibold mb-6">
              <span>Total</span>
              <span className="text-[#00B4FF]">₹{total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full px-4 py-3 rounded-full bg-[#00B4FF] text-black font-semibold hover:brightness-110 shadow shadow-sky-500/30"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
