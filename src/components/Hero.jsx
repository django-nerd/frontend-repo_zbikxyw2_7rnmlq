import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onOrder }) => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00B4FF]/10 via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white"
        >
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/favicon.svg"
              alt="Back Bencher Café Logo"
              className="h-14 w-14 rounded-xl ring-1 ring-white/10 shadow-2xl"
            />
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Back Bencher Café</h1>
          </div>
          <p className="text-lg sm:text-xl text-white/70 max-w-prose">
            Sip. Snack. Sit Back. A youthful café experience with lightning-fast ordering.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={onOrder}
              className="px-6 py-3 rounded-full bg-[#00B4FF] text-black font-semibold shadow-lg shadow-sky-500/30 hover:brightness-110 transition"
            >
              Order Now
            </button>
            <a
              href="#menu"
              className="px-6 py-3 rounded-full border border-white/10 text-white hover:border-white/20 transition"
            >
              Browse Menu
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 shadow-2xl p-6 flex items-center justify-center">
            <img
              src="/hero-collage.png"
              onError={(e) => { e.currentTarget.src = '/menu/placeholder.svg'; }}
              alt="Cafe Vibes"
              className="rounded-xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
