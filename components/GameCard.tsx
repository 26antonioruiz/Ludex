import { useRouter } from 'expo-router'
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useAppStore } from '../store/useAppStore'

export default function GameCard({ id, title, image }: any) {
  const router = useRouter()
  const { addToCompare } = useAppStore()

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/juego/[id]',
          params: { id },
        })
      }
      style={{
        marginBottom: 16,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#0f172a',
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: '100%', height: 170 }}
      />

      <Pressable
        onPress={() =>
          addToCompare({
            id,
            name: title,
            image,
          })
        }
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: '#020617cc',
          padding: 6,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#22c55e' }}>⚔️</Text>
      </Pressable>

      <View style={{ padding: 12 }}>
        <Text style={{ color: '#fff' }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}