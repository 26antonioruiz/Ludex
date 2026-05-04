import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'wishlist'

export const getWishlist = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const toggleWishlist = async (game: any) => {
  const list = await getWishlist()
  const exists = list.find((g: any) => g.id === game.id)

  let updated

  if (exists) {
    updated = list.filter((g: any) => g.id !== game.id)
  } else {
    updated = [
      ...list,
      {
        ...game,
        targetPrice: null, // 🔥 para alertas futuras
      },
    ]
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

// 🔔 NUEVO: guardar alerta de precio
export const setPriceAlert = async (gameId: number, price: number) => {
  const list = await getWishlist()

  const updated = list.map((g: any) =>
    g.id === gameId ? { ...g, targetPrice: price } : g
  )

  await AsyncStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}