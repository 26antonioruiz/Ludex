import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { getPrices } from '../../lib/prices'
import { getStore } from '../../lib/stores'
import { priceAlertSchema } from '../../lib/validation'
import { useAppStore } from '../../store/useAppStore'

const API_KEY = '3348181a516f4e3ba8ddef56af9a9d03'

export default function GameDetail() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const gameId = Array.isArray(id) ? id[0] : id

  const { wishlist, toggleWishlist, setPriceAlert } = useAppStore()

  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [prices, setPrices] = useState<any[]>([])

  const isSaved = wishlist.some((g) => g.id === game?.id)

  useEffect(() => {
    if (!gameId) return

    const load = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
        )
        const data = await res.json()

        if (!data || data.detail || !data.id) {
          setGame(null)
          return
        }

        // 🔥 LIMPIAR DESCRIPCIÓN
        const rawDesc =
          data.description_raw || data.description || ''

        const cleanDescription = rawDesc
          .replace(/<[^>]+>/g, '')
          .replace(/\n/g, ' ')
          .slice(0, 500)

        setGame({
          ...data,
          description_clean: cleanDescription,
        })

        const deals = await getPrices(data.name)
        setPrices(deals || [])
      } catch {
        setGame(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [gameId])

  // 🔔 ALERTA
  const handleAlert = () => {
    try {
      const price = Number(prices?.[0]?.price)

      priceAlertSchema.parse({ price })

      if (!game) return

      setPriceAlert(game.id, price)

      alert(`🔔 Te avisaremos cuando baje de ${price}€`)
    } catch (e: any) {
      alert(e?.errors?.[0]?.message || 'Error')
    }
  }

  // 🔄 LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#22c55e" size="large" />
        <Text style={{ color: '#22c55e', marginTop: 10 }}>
          🎮 Cargando juego...
        </Text>
      </View>
    )
  }

  // ❌ NO GAME
  if (!game) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff', fontSize: 18 }}>
          🎮 Ups... no encontramos este juego
        </Text>
        <Text style={{ color: '#94a3b8', marginTop: 8 }}>
          Prueba con otro o vuelve atrás
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      {/* 🔙 BACK */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Volver</Text>
      </Pressable>

      {/* 🎮 IMAGEN */}
      <Image
        source={{
          uri:
            game.background_image ||
            'https://via.placeholder.com/500x300',
        }}
        style={styles.image}
      />

      {/* 🎯 TITULO */}
      <Text style={styles.title}>{game.name}</Text>

      {/* ⭐ WISHLIST */}
      <Pressable
        onPress={() =>
          toggleWishlist({
            id: game.id,
            name: game.name,
            image: game.background_image,
          })
        }
        style={[
          styles.wishlistButton,
          { backgroundColor: isSaved ? '#ef4444' : '#22c55e' },
        ]}
      >
        <Text style={styles.wishlistText}>
          {isSaved ? '💔 Quitar de Wishlist' : '⭐ Añadir a Wishlist'}
        </Text>
      </Pressable>

      {/* 🔔 ALERTA */}
      {prices.length > 0 && (
        <Pressable style={styles.alertButton} onPress={handleAlert}>
          <Text style={styles.alertText}>
            🔔 Avisar cuando baje de {prices[0]?.price}€
          </Text>
        </Pressable>
      )}

      {/* 📊 META */}
      <Text style={styles.meta}>
        ⭐ {game.rating}   📅 {game.released}
      </Text>

      {/* 🎮 TAGS */}
      {game.genres && (
        <View style={styles.tags}>
          {game.genres.slice(0, 3).map((g: any) => (
            <Text key={g.id} style={styles.tag}>
              {g.name}
            </Text>
          ))}
        </View>
      )}

      {/* 📝 DESCRIPCIÓN */}
      <Text style={styles.desc}>
        {game.description_clean}
      </Text>

      {/* 💸 PRECIOS */}
      {prices.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>💸 Mejores precios</Text>

          {prices.slice(0, 5).map((deal: any, index: number) => {
            const store = getStore(Number(deal.storeID))

            return (
              <View
                key={deal.dealID}
                style={[
                  styles.priceCard,
                  index === 0 && styles.bestPrice,
                ]}
              >
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Image
                    source={{ uri: store.logo }}
                    style={{ width: 40, height: 40 }}
                  />

                  <View>
                    <Text style={styles.storeName}>{store.name}</Text>

                    <Text style={styles.price}>
                      💰 {deal.price}€
                    </Text>

                    {index === 0 && (
                      <Text style={styles.bestLabel}>
                        🟢 Mejor precio
                      </Text>
                    )}
                  </View>
                </View>

                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`
                    )
                  }
                  style={styles.buyButton}
                >
                  <Text style={styles.buyText}>Comprar</Text>
                </Pressable>
              </View>
            )
          })}
        </>
      ) : (
        <Text style={{ color: '#94a3b8', marginTop: 10 }}>
          🔎 Buscando precios en tiendas...
        </Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
    paddingTop: 50,
  },
  center: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#0f172a',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  backText: { color: '#22c55e' },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  wishlistButton: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  wishlistText: { color: '#020617', fontWeight: 'bold' },
  alertButton: {
    backgroundColor: '#facc15',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: { color: '#020617', fontWeight: 'bold' },
  meta: { color: '#94a3b8', marginVertical: 10 },
  tags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#0f172a',
    color: '#22c55e',
    padding: 6,
    borderRadius: 8,
  },
  desc: { color: '#cbd5f5', marginTop: 10 },
  sectionTitle: { color: '#fff', fontSize: 18, marginTop: 20 },
  priceCard: {
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bestPrice: { backgroundColor: '#22c55e' },
  storeName: { color: '#fff' },
  price: { color: '#22c55e' },
  bestLabel: { color: '#020617' },
  buyButton: {
    backgroundColor: '#020617',
    padding: 6,
    borderRadius: 6,
  },
  buyText: { color: '#22c55e' },
})