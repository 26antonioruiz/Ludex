import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { getPrices } from '../../lib/prices'
import { useAppStore } from '../../store/useAppStore'
import { WishlistGame } from '../../types'

interface PriceDeal {
  price: number
  dealID: string
  storeID: number
}

export default function Comparar() {
  const { compare, clearCompare } = useAppStore()

  const [prices, setPrices] = useState<Record<number, PriceDeal[]>>({})

  useEffect(() => {
    if (compare.length === 0) return

    const load = async () => {
      const newPrices: Record<number, PriceDeal[]> = {}

      for (const game of compare) {
        const deals = await getPrices(game.name)
        newPrices[game.id] = deals || []
      }

      setPrices(newPrices)
    }

    load()
  }, [compare])

  if (compare.length < 2) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#020617',
        }}
      >
        <Text style={{ color: '#fff' }}>
          Añade 2 juegos para comparar ⚔️
        </Text>
      </View>
    )
  }

  const bestGlobal = Math.min(
    ...compare.map((g) => prices[g.id]?.[0]?.price ?? 999)
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#020617', padding: 16 }}>
      <Text style={{ color: '#fff', fontSize: 20 }}>
        ⚔️ Comparador
      </Text>

      {compare.map((game: WishlistGame) => {
        const best = prices[game.id]?.[0]
        const isBest = best?.price === bestGlobal

        return (
          <View
            key={game.id}
            style={{
              backgroundColor: isBest ? '#22c55e' : '#0f172a',
              padding: 14,
              borderRadius: 12,
              marginTop: 12,
            }}
          >
            <Text style={{ color: isBest ? '#020617' : '#fff' }}>
              {game.name}
            </Text>

            <Text
              style={{
                color: isBest ? '#020617' : '#22c55e',
                fontWeight: 'bold',
              }}
            >
              💰 {best?.price ?? 'N/A'}€
            </Text>

            {isBest && (
              <Text style={{ color: '#020617' }}>
                🟢 Mejor opción
              </Text>
            )}
          </View>
        )
      })}

      <Text
        onPress={clearCompare}
        style={{ color: '#ef4444', marginTop: 20 }}
      >
        Limpiar comparador
      </Text>
    </View>
  )
}