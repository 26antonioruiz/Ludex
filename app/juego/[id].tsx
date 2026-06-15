import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'

import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useLocalSearchParams } from 'expo-router'

import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons } from '@expo/vector-icons'

import { useAppStore } from '../../store/useAppStore'

import { getPrices } from '../../lib/prices'

import { getStore } from '../../lib/stores'

const API_KEY =
  '3348181a516f4e3ba8ddef56af9a9d03'

export default function GameDetail() {
  const { id } = useLocalSearchParams()

  const [game, setGame] =
    useState<any>(null)

  const [prices, setPrices] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const { wishlist, toggleWishlist } =
    useAppStore()

  const isSaved = wishlist.some(
    (g) => g.id === game?.id  
  )

  const bestDeal = prices[0]

  const bestStore = bestDeal
    ? getStore(
        Number(bestDeal.storeID)
      )
    : null

  useEffect(() => {
    loadGame()
  }, [])

  const saveViewedGame = async (
    gameId: number
  ) => {
    try {
      const stored =
        await AsyncStorage.getItem(
          'viewed-games'
        )

      const viewed = stored
        ? JSON.parse(stored)
        : []

      if (
        !viewed.includes(gameId)
      ) {
        viewed.push(gameId)

        await AsyncStorage.setItem(
          'viewed-games',
          JSON.stringify(viewed)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loadGame = async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      )

      const data = await res.json()

      setGame(data)

      await saveViewedGame(
        data.id
      )

      const deals = await getPrices(
        data.name
      )

      setPrices(deals || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            '#020617',
          justifyContent:
            'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color="#22c55e"
        />

        <Text
          style={{
            color: 'white',
            marginTop: 20,
            fontSize: 16,
          }}
        >
          Cargando juego...
        </Text>
      </View>
    )
  }

  if (!game) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:
            '#020617',
          justifyContent:
            'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}
        >
          Juego no encontrado
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          '#020617',
      }}
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* HERO */}
      <View>
        <Image
          source={{
            uri:
              game.background_image,
          }}
          style={{
            width: '100%',
            height: 380,
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={[
            'transparent',
            '#020617',
          ]}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 220,
          }}
        />

        {/* WISHLIST */}
        <Pressable
          onPress={() =>
            toggleWishlist({
              id: game.id,
              name: game.name,
              image:
                game.background_image,
            })
          }
          style={{
            position:
              'absolute',
            top: 60,
            right: 20,

            width: 56,
            height: 56,

            borderRadius: 28,

            backgroundColor:
              'rgba(0,0,0,0.7)',

            justifyContent:
              'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name={
              isSaved
                ? 'heart'
                : 'heart-outline'
            }
            size={30}
            color={
              isSaved
                ? '#ef4444'
                : 'white'
            }
          />
        </Pressable>

        {/* INFO */}
        <View
          style={{
            position:
              'absolute',
            bottom: 25,
            left: 20,
            right: 20,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 38,
              fontWeight: '900',
            }}
          >
            {game.name}
          </Text>

          <Text
            style={{
              color: '#d4d4d8',
              marginTop: 8,
              fontSize: 16,
            }}
          >
            ⭐ {game.rating} • 📅{' '}
            {game.released}
          </Text>

          {bestDeal && (
            <View
              style={{
                marginTop: 18,

                backgroundColor:
                  '#22c55e',

                paddingHorizontal:
                  18,

                paddingVertical:
                  14,

                borderRadius: 20,

                alignSelf:
                  'flex-start',
              }}
            >
              <Text
                style={{
                  color:
                    '#020617',
                  fontSize: 12,
                  fontWeight:
                    '900',
                }}
              >
                🟢 MEJOR OFERTA
              </Text>

              <Text
                style={{
                  color:
                    '#020617',
                  fontSize: 32,
                  fontWeight:
                    '900',
                  marginTop: 4,
                }}
              >
                {bestDeal.price}€
              </Text>

              <Text
                style={{
                  color:
                    '#020617',
                  fontWeight:
                    '700',
                  marginTop: 2,
                }}
              >
                {bestStore?.name}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* CONTENT */}
      <View
        style={{
          padding: 20,
          paddingBottom: 140,
        }}
      >
        {/* GENRES */}
        <View
          style={{
            flexDirection:
              'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {game.genres?.map(
            (genre: any) => (
              <View
                key={genre.id}
                style={{
                  backgroundColor:
                    '#18181b',

                  paddingHorizontal:
                    16,

                  paddingVertical:
                    10,

                  borderRadius:
                    16,
                }}
              >
                <Text
                  style={{
                    color:
                      '#22c55e',
                    fontWeight:
                      '600',
                  }}
                >
                  {genre.name}
                </Text>
              </View>
            )
          )}
        </View>

        {/* DESCRIPTION */}
        <View
          style={{
            marginTop: 36,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: '800',
              marginBottom: 16,
            }}
          >
            Descripción
          </Text>

          <Text
            style={{
              color: '#d4d4d8',
              fontSize: 16,
              lineHeight: 28,
            }}
          >
            {game.description_raw}
          </Text>
        </View>

        {/* OFFERS */}
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: '800',
              marginBottom: 20,
            }}
          >
            Mejores precios 💸
          </Text>

          {prices.map(
            (
              deal: any,
              index
            ) => {
              const store =
                getStore(
                  Number(
                    deal.storeID
                  )
                )

              const isBest =
                index === 0

              return (
                <Pressable
                  key={
                    deal.dealID
                  }
                  onPress={() =>
                    Linking.openURL(
                      `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`
                    )
                  }
                  style={{
                    backgroundColor:
                      isBest
                        ? '#22c55e'
                        : '#18181b',

                    padding: 22,

                    borderRadius:
                      28,

                    marginBottom:
                      18,

                    flexDirection:
                      'row',

                    justifyContent:
                      'space-between',

                    alignItems:
                      'center',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          isBest
                            ? '#020617'
                            : 'white',

                        fontSize: 24,

                        fontWeight:
                          '900',
                      }}
                    >
                      {store.name}
                    </Text>

                    <Text
                      style={{
                        color:
                          isBest
                            ? '#020617'
                            : '#22c55e',

                        fontSize: 34,

                        fontWeight:
                          '900',

                        marginTop: 10,
                      }}
                    >
                      💰 {deal.price}€
                    </Text>

                    {isBest && (
                      <Text
                        style={{
                          color:
                            '#020617',

                          marginTop: 8,

                          fontWeight:
                            '800',

                          fontSize: 15,
                        }}
                      >
                        🟢 Mejor precio
                      </Text>
                    )}
                  </View>

                  <Ionicons
                    name="open-outline"
                    size={32}
                    color={
                      isBest
                        ? '#020617'
                        : '#22c55e'
                    }
                  />
                </Pressable>
              )
            }
          )}
        </View>
      </View>
    </ScrollView>
  )
}