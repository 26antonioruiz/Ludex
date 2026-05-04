import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { WishlistGame } from '../types'

interface AppState {
  wishlist: WishlistGame[]
  compare: WishlistGame[]

  toggleWishlist: (game: WishlistGame) => void
  setPriceAlert: (id: number, price: number) => void

  addToCompare: (game: WishlistGame) => void
  clearCompare: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      compare: [],

      // ⭐ Añadir / quitar wishlist
      toggleWishlist: (game) => {
        const list = get().wishlist
        const exists = list.some((g) => g.id === game.id)

        if (exists) {
          set({
            wishlist: list.filter((g) => g.id !== game.id),
          })
        } else {
          set({
            wishlist: [
              ...list,
              {
                ...game,
                targetPrice: null, // 🔥 importante para alertas
              },
            ],
          })
        }
      },

      // 🔔 Guardar alerta de precio
      setPriceAlert: (id, price) => {
        const updated = get().wishlist.map((g) =>
          g.id === id ? { ...g, targetPrice: price } : g
        )

        set({ wishlist: updated })
      },

      // ⚔️ Comparador (máx 2 juegos)
      addToCompare: (game) => {
        const list = get().compare

        const exists = list.some((g) => g.id === game.id)
        if (exists) return

        let updated = [...list]

        if (updated.length >= 2) {
          updated.shift() // elimina el primero
        }

        updated.push(game)

        set({ compare: updated })
      },

      // 🧹 Limpiar comparador
      clearCompare: () => {
        set({ compare: [] })
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)