"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  SHIPPING_METHODS,
  parseStoredCart,
  roundMoney,
  type CartItem,
  type ShippingMethod,
} from "@/lib/cart";

const SHIPPING_STORAGE_KEY = `${CART_STORAGE_KEY}-shipping`;

type CartContextValue = {
  items: CartItem[];
  /** False until the saved cart has been read from the browser. */
  ready: boolean;
  count: number;
  subtotal: number;
  shippingMethod: ShippingMethod;
  shipping: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Add a product (or more of it) and open the drawer. */
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  setShippingMethod: (method: ShippingMethod) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethodState] = useState<ShippingMethod>("standard");
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Read the saved cart once on the client (it can't be read during server rendering).
  useEffect(() => {
    try {
      const saved = parseStoredCart(localStorage.getItem(CART_STORAGE_KEY));
      const method = localStorage.getItem(SHIPPING_STORAGE_KEY) === "express" ? "express" : "standard";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(saved);
      setShippingMethodState(method);
    } catch {
      // Storage can be blocked (private mode); the cart then lives only in memory.
    }
    setReady(true);
  }, []);

  // Save every change after the first load.
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(SHIPPING_STORAGE_KEY, shippingMethod);
    } catch {
      // ignore
    }
  }, [items, shippingMethod, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) return prev.map((i) => (i.slug === item.slug ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const safe = Math.max(1, Math.floor(qty) || 1);
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: safe } : i)));
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = roundMoney(items.reduce((sum, i) => sum + i.price * i.qty, 0));
    const shipping = items.length > 0 ? SHIPPING_METHODS[shippingMethod].fee : 0;
    return {
      items,
      ready,
      count,
      subtotal,
      shippingMethod,
      shipping,
      total: roundMoney(subtotal + shipping),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
      has: (slug) => items.some((i) => i.slug === slug),
      setShippingMethod: setShippingMethodState,
    };
  }, [items, ready, shippingMethod, isOpen, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
