import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  cartIds: number[]
  wishlistIds: number[]
  toggleWishlist: (id: number) => void
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  getCartCount: () => number
  getWishlistCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartIds: [],
      wishlistIds: [],

      toggleWishlist: (id) => set((state) => ({
        wishlistIds: state.wishlistIds.includes(id)
          ? state.wishlistIds.filter((i) => i !== id)
          : [...state.wishlistIds, id]
      })),

      addToCart: (id) => set((state) => ({
        cartIds: state.cartIds.includes(id) ? state.cartIds : [...state.cartIds, id]
      })),

      removeFromCart: (id) => set((state) => ({
        cartIds: state.cartIds.filter((i) => i !== id)
      })),

      getCartCount: () => get().cartIds.length,
      getWishlistCount: () => get().wishlistIds.length,
    }),
    {
      name: 'cart-storage',
    }
  )
)