import { FlashList } from '@shopify/flash-list/dist'
import { useEffect, useState } from 'react'
import { TextInput, View } from 'react-native'
import GameCard from '../../components/GameCard'
import { getGames } from '../../lib/api'

// 🔥 tipo real del juego
interface Game {
  id: number
  name: string
  background_image: string
}

export default function JuegosScreen() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    try {
      setLoading(true)
      const data = await getGames(search)
      setGames(data.results || [])
    } catch (error) {
      console.log('ERROR LOAD GAMES:', error)
      setGames([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#020617', padding: 16 }}>
      
      <TextInput
        placeholder="Buscar juegos..."
        placeholderTextColor="#64748b"
        style={{
          backgroundColor: '#0f172a',
          color: '#fff',
          padding: 12,
          borderRadius: 10,
          marginBottom: 12,
        }}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={loadGames}
      />

      <FlashList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={180 as any}
        onRefresh={loadGames}
        refreshing={loading}
        renderItem={({ item }) => (
          <GameCard
            id={item.id}
            title={item.name}
            image={item.background_image}
          />
        )}
      />
    </View>
  )
}