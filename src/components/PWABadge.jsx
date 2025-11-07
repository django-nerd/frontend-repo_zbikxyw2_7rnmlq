import React, { useEffect } from 'react';

const PWABadge = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return (
    <div className="fixed bottom-3 right-3 bg-white/10 text-white text-xs px-3 py-2 rounded-full border border-white/10 shadow">
      Installable PWA
    </div>
  );
};

export default PWABadge;
