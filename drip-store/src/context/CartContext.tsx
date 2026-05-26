import { createContext, useContext, useState, type ReactNode } from 'react';
import { type CartItem, type Product, type Notification } from '../types/index';
import Stack from '../structures/Stack';
import Queue from '../structures/Queue';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  undoLast: () => void;
  clearCart: () => void;
  total: number;
  notifications: Notification[];
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

const actionStack = new Stack<CartItem[]>();
const notifQueue  = new Queue<Notification>();

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems]               = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const pushNotification = (msg: string, type: Notification['type']) => {
    const notif: Notification = { id: Date.now().toString(), message: msg, type };
    notifQueue.enqueue(notif);
    setNotifications(notifQueue.toArray());
  };

  const dismissNotification = () => {
    notifQueue.dequeue();
    setNotifications(notifQueue.toArray());
  };

  const addToCart = (product: Product) => {
    actionStack.push([...items]); // guarda estado anterior en la pila
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
    pushNotification(`${product.name} added to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    actionStack.push([...items]);
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const undoLast = () => {
    const previous = actionStack.pop();
    if (previous) setItems(previous);
  };

  const clearCart = () => { setItems([]); actionStack.clear(); };

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, undoLast, clearCart, total, notifications, dismissNotification }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);