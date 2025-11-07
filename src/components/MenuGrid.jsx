import React from 'react';
import { motion } from 'framer-motion';
import { MENU_CATEGORIES } from '../data/menu';

const MenuGrid = ({ onAdd }) => {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-6">Menu</h2>
      <div className="space-y-10">
        {MENU_CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/90 text-xl font-semibold">{cat.title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cat.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#00B4FF]/40 transition group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.photo}
                      onError={(e) => { e.currentTarget.src = '/menu/placeholder.svg'; }}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-[#00B4FF] font-semibold">₹{item.price}</div>
                    </div>
                    <button
                      onClick={() => onAdd(item)}
                      className="px-3 py-2 rounded-full bg-[#00B4FF] text-black text-sm font-semibold hover:brightness-110 transition shadow shadow-sky-500/20"
                    >
                      Add
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuGrid;
