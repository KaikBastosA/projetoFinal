import { create } from "zustand";
import { Pajama } from '../types/Pajama'

interface CartStore {
    cart: Pajama[];
    addToCart: (item: Pajama) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantidade: number) => void;
}

const useCartStore = create<CartStore>((set) => (
    {
        cart: [],
        addToCart: (item) => set((state) => ({ cart: [...state.cart, item ] })),
        removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
        updateQuantity: (id, quantidade) => set((state) => ({
            cart: state.cart.map((p) => 
            p.id === id ? { ...p, quantidade } : p)
        }))                 
    }
))

export default useCartStore;