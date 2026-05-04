import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'compare_games'

export const getCompare = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const addToCompare = async (game: any) => {
  const list = await getCompare()

  // evitar duplicados
  if (list.find((g: any) => g.id === game.id)) return list

  let updated = [...list]

  if (updated.length >= 2) {
    updated.shift() // solo 2 juegos
  }

  updated.push(game)

  await AsyncStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export const clearCompare = async () => {
  await AsyncStorage.removeItem(KEY)
}