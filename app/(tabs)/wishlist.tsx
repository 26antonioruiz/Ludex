import { FlashList } from '@shopify/flash-list/dist'
import { useRouter } from 'expo-router'
import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native'
import { useAppStore } from '../../store/useAppStore'
import { WishlistGame } from '../../types'

export default function Wishlist() {
  const { wishlist } = useAppStore()
  const router = useRouter()

  return (
    <View style={{ flex: 1, backgroundColor: '#020617', padding: 16 }}>
      
      <Text style={{ color: '#fff', fontSize: 22, marginBottom: 12 }}>
        ❤️ Wishlist
      </Text>

      {wishlist.length === 0 && (
        <Text style={{ color: '#94a3b8' }}>
          No tienes juegos guardados aún...
        </Text>
      )}

      <FlashList
        data={wishlist}
        keyExtractor={(item: WishlistGame) => item.id.toString()}
        estimatedItemSize={180 as any}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: WishlistGame }) => (
          <Pressable
            onPress={() => router.push(`/juego/${item.id}`)}
            style={{
              marginBottom: 16,
              borderRadius: 14,
              overflow: 'hidden',
              backgroundColor: '#0f172a',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 140 }}
            />

            <View style={{ padding: 10 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>
                {item.name}
              </Text>

              {item.targetPrice != null && (
                <Text style={{ color: '#22c55e' }}>
                  🎯 {item.targetPrice}€
                </Text>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}