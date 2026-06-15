import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { WishlistGame } from '../types'

interface AppState {
  wishlist: WishlistGame[]
  compare: WishlistGame[]

  username: string
  affiliateCode: string

  toggleWishlist: (
    game: WishlistGame
  ) => void

  setPriceAlert: (
    id: number,
    price: number
  ) => void

  addToCompare: (
    game: WishlistGame
  ) => void

  clearCompare: () => void

  setUsername: (
    username: string
  ) => void
}

export const useAppStore =
  create<AppState>()(
    persist(
      (set, get) => ({
        wishlist: [],

        compare: [],

        username: 'Jugador',

        affiliateCode:
          'LUDEX-001',

        // ⭐ Añadir / quitar wishlist
        toggleWishlist: (
          game
        ) => {
          const list =
            get().wishlist

          const exists =
            list.some(
              (g) =>
                g.id === game.id
            )

          if (exists) {
            set({
              wishlist:
                list.filter(
                  (g) =>
                    g.id !== game.id
                ),
            })
          } else {
            set({
              wishlist: [
                ...list,
                {
                  ...game,

                  targetPrice:
                    null,
                },
              ],
            })
          }
        },

        // 🔔 Alertas
        setPriceAlert: (
          id,
          price
        ) => {
          const updated =
            get().wishlist.map(
              (g) =>
                g.id === id
                  ? {
                      ...g,
                      targetPrice:
                        price,
                    }
                  : g
            )

          set({
            wishlist:
              updated,
          })
        },

        // ⚔️ Comparador
        addToCompare: (
          game
        ) => {
          const list =
            get().compare

          const exists =
            list.some(
              (g) =>
                g.id === game.id
            )

          if (exists) return

          let updated = [
            ...list,
          ]

          if (
            updated.length >= 2
          ) {
            updated.shift()
          }

          updated.push(game)

          set({
            compare: updated,
          })
        },

        clearCompare: () => {
          set({
            compare: [],
          })
        },

        // 👤 Usuario
        setUsername: (
          username
        ) => {
          set({
            username,
          })
        },
      }),
      {
        name: 'app-storage',

        storage:
          createJSONStorage(
            () => AsyncStorage
          ),
      }
    )
  )