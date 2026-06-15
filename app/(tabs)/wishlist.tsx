import { FlashList } from '@shopify/flash-list'

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
    <View
      style={{
        flex: 1,
        backgroundColor: '#020617',
      }}
    >
      <FlashList
        data={wishlist}
        keyExtractor={(item: WishlistGame) =>
          item.id.toString()
        }
        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 140,
        }}
        ListHeaderComponent={
          <View
            style={{
              paddingTop: 70,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 42,
                fontWeight: '900',
              }}
            >
              WISHLIST
            </Text>

            <Text
              style={{
                color: '#a1a1aa',
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Tus juegos favoritos ❤️
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View
            style={{
              marginTop: 80,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 64,
              }}
            >
              ❤️
            </Text>

            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: '700',
                marginTop: 16,
              }}
            >
              Tu wishlist está vacía
            </Text>

            <Text
              style={{
                color: '#94a3b8',
                textAlign: 'center',
                marginTop: 10,
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              Guarda juegos para seguir sus
              precios y encontrarlos más
              tarde.
            </Text>
          </View>
        }
        renderItem={({
          item,
        }: {
          item: WishlistGame
        }) => (
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${item.name}`}
            accessibilityHint="Abre la ficha completa del juego"
            onPress={() =>
              router.push(
                `/juego/${item.id}`
              )
            }
            style={{
              marginBottom: 20,
              borderRadius: 24,
              overflow: 'hidden',
              backgroundColor: '#18181b',
            }}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={{
                width: '100%',
                height: 180,
              }}
              resizeMode="cover"
              accessible={true}
              accessibilityLabel={
                item.name
              }
            />

            <View
              style={{
                padding: 16,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                {item.name}
              </Text>

              {item.targetPrice !=
                null && (
                <Text
                  style={{
                    color: '#22c55e',
                    marginTop: 8,
                    fontWeight: '700',
                    fontSize: 16,
                  }}
                >
                  🎯 Objetivo:{' '}
                  {item.targetPrice}€
                </Text>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  )
}