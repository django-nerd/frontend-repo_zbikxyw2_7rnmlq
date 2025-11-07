// Utilities to share orders between tabs (customer and counter)
// Uses localStorage + storage event to keep a simple real-time sync in this sandbox.

export const ORDERS_KEY = 'bbc_orders';

export function pushOrder(order) {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
    // Dispatch a manual event so same-tab listeners update immediately
    window.dispatchEvent(new StorageEvent('storage', { key: ORDERS_KEY, newValue: JSON.stringify(list) }));
  } catch (e) {
    console.error('Failed to push order', e);
  }
}
