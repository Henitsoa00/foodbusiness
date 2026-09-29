import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultCart,
  initialOrders,
  products,
  type CartItem,
  type Order,
  type OrderStatus,
  type PaymentStatus,
} from "../data/mock";

export type Role = "client" | "company" | "admin" | "kitchen" | "delivery";

interface AppState {
  cart: CartItem[];
  orders: Order[];
  deliveryDate: "today" | "tomorrow";
  deliveryTime: string;
  paymentMethod: string;
  toast: string | null;
  role: Role;
  addToCart: (item: Omit<CartItem, "key">) => void;
  updateQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  setDeliveryDate: (d: "today" | "tomorrow") => void;
  setDeliveryTime: (t: string) => void;
  setPaymentMethod: (m: string) => void;
  confirmOrder: () => Order;
  payOrder: (id: string) => void;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  setPaymentStatus: (id: string, status: PaymentStatus) => void;
  showToast: (msg: string) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppState | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("fb-cart");
    if (raw) return JSON.parse(raw) as CartItem[];
  } catch {
    /* ignore */
  }
  return defaultCart;
}

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem("fb-orders");
    if (raw) return JSON.parse(raw) as Order[];
  } catch {
    /* ignore */
  }
  return initialOrders;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [deliveryDate, setDeliveryDate] = useState<"today" | "tomorrow">("today");
  const [deliveryTime, setDeliveryTime] = useState("12:00");
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");
  const [toast, setToast] = useState<string | null>(null);
  const [role] = useState<Role>("client");

  const persistCart = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem("fb-cart", JSON.stringify(next));
  };

  const persistOrders = (next: Order[]) => {
    setOrders(next);
    localStorage.setItem("fb-orders", JSON.stringify(next));
  };

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "key">) => {
      const key = `${item.productId}-${item.optionId ?? "default"}`;
      setCart((prev) => {
        const existing = prev.find((c) => c.key === key);
        let next: CartItem[];
        if (existing) {
          next = prev.map((c) =>
            c.key === key
              ? {
                  ...c,
                  quantity: c.quantity + item.quantity,
                  notes: item.notes || c.notes,
                }
              : c
          );
        } else {
          next = [...prev, { ...item, key }];
        }
        localStorage.setItem("fb-cart", JSON.stringify(next));
        return next;
      });
      const product = products.find((p) => p.id === item.productId);
      showToast(`${product?.name ?? "Produit"} ajouté au panier`);
    },
    [showToast]
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) => {
      const next =
        qty <= 0 ? prev.filter((c) => c.key !== key) : prev.map((c) => (c.key === key ? { ...c, quantity: qty } : c));
      localStorage.setItem("fb-cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    persistCart(cart.filter((c) => c.key !== key));
  }, [cart]);

  const clearCart = useCallback(() => {
    persistCart([]);
  }, []);

  const confirmOrder = useCallback(() => {
    const total = cart.reduce((s, i) => s + (i.price + i.extraPrice) * i.quantity, 0);
    const n = 46 + orders.length;
    const order: Order = {
      id: `CMD2025-00${n}`,
      companyId: "abc",
      companyName: "ABC Call Center",
      date: deliveryDate === "today" ? "2025-04-15" : "2025-04-16",
      dateLabel: deliveryDate === "today" ? "15 avr. 2025" : "16 avr. 2025",
      time: deliveryTime,
      items: cart.map((c) => ({
        name: c.optionLabel ? `${c.name} (${c.optionLabel})` : c.name,
        quantity: c.quantity,
        price: c.price + c.extraPrice,
      })),
      meals: cart.reduce((s, i) => s + i.quantity, 0),
      extras: "",
      total,
      status: "en_attente",
      paymentStatus: "non_paye",
      paymentMethod,
      address: "Lot II, Antananarivo",
      contact: "034 12 345 67",
    };
    persistOrders([order, ...orders]);
    persistCart([]);
    showToast("Commande confirmée");
    return order;
  }, [cart, orders, deliveryDate, deliveryTime, paymentMethod, showToast]);

  const payOrder = useCallback(
    (id: string) => {
      persistOrders(
        orders.map((o) => (o.id === id ? { ...o, paymentStatus: "paye" as const } : o))
      );
      showToast("Paiement effectué");
    },
    [orders, showToast]
  );

  const setOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      persistOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    },
    [orders]
  );

  const setPaymentStatus = useCallback(
    (id: string, status: PaymentStatus) => {
      persistOrders(orders.map((o) => (o.id === id ? { ...o, paymentStatus: status } : o)));
    },
    [orders]
  );

  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + (i.price + i.extraPrice) * i.quantity, 0),
    [cart]
  );
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);

  const value: AppState = {
    cart,
    orders,
    deliveryDate,
    deliveryTime,
    paymentMethod,
    toast,
    role,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    setDeliveryDate,
    setDeliveryTime,
    setPaymentMethod,
    confirmOrder,
    payOrder,
    setOrderStatus,
    setPaymentStatus,
    showToast,
    cartTotal,
    cartCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
