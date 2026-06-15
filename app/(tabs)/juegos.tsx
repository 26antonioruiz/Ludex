import { useEffect, useState } from 'react'

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

import AsyncStorage from '@react-native-async-storage/async-storage'

import GameCard from '../../components/GameCard'

const API_KEY =
  '3348181a516f4e3ba8ddef56af9a9d03'

const CACHE_KEY =
  'ludex_top_games'

interface Game {
  id: number
  name: string
  background_image: string
}

const filters = [
  {
    label: '🔥 Populares',
    ordering: '',
  },

  {
    label: '⭐ Valorados',
    ordering: '-rating',
  },

  {
    label: '🆕 Nuevos',
    ordering: '-released',
  },

  {
    label: '💸 Metacritic',
    ordering: '-metacritic',
  },

  {
    label: '🎯 Deseados',
    ordering: '-added',
  },
]

export default function JuegosScreen() {
  const [search, setSearch] =
    useState('')

  const [filter, setFilter] =
    useState('')

  const [games, setGames] =
    useState<Game[]>([])

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadGames()
    }, 500)

    return () =>
      clearTimeout(timeout)
  }, [search, filter])

  useEffect(() => {
    loadCachedGames()
  }, [])

  const loadCachedGames =
    async () => {
      try {
        const cached =
          await AsyncStorage.getItem(
            CACHE_KEY
          )

        if (cached) {
          setGames(
            JSON.parse(cached)
          )
        }
      } catch (error) {
        console.log(
          'CACHE ERROR:',
          error
        )
      }

      loadGames()
    }

  const loadGames = async () => {
    try {
      setLoading(true)

      let url =
        `https://api.rawg.io/api/games?key=${API_KEY}`

      if (search) {
        url += `&search=${encodeURIComponent(
          search
        )}`
      }

      if (filter) {
        url += `&ordering=${filter}`
      }

      const res = await fetch(url)

      const data = await res.json()

      const results =
        data.results || []

      setGames(results)

      if (
        !search &&
        !filter &&
        results.length > 0
      ) {
        await AsyncStorage.setItem(
          CACHE_KEY,
          JSON.stringify(
            results.slice(0, 20)
          )
        )
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#020617',
      }}
    >
      <FlatList
        data={games}
        keyExtractor={(item) =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 140,
        }}
        ListHeaderComponent={
          <>
            {/* HEADER */}
            <View
              style={{
                marginTop: 10,
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
                LUDEX
              </Text>

              <Text
                style={{
                  color: '#a1a1aa',
                  fontSize: 18,
                  marginTop: 8,
                }}
              >
                Encuentra las mejores
                ofertas 🎮
              </Text>
            </View>

            {/* SEARCH */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                backgroundColor:
                  '#18181b',

                borderRadius: 24,

                paddingHorizontal: 18,
                paddingVertical: 16,

                marginBottom: 20,
              }}
            >
              <Ionicons
                name="search"
                size={22}
                color="#71717a"
              />

              <TextInput
                placeholder="Buscar juegos..."
                placeholderTextColor="#71717a"
                value={search}
                onChangeText={
                  setSearch
                }
                style={{
                  flex: 1,
                  color: 'white',
                  marginLeft: 12,
                  fontSize: 16,
                }}
              />
            </View>

            {/* FILTERS */}
            <FlatList
              horizontal
              data={filters}
              keyExtractor={(item) =>
                item.label
              }
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={{
                paddingBottom: 24,
              }}
              renderItem={({
                item,
              }) => (
                <Pressable
                  onPress={() =>
                    setFilter(
                      item.ordering
                    )
                  }
                  style={{
                    marginRight: 10,

                    paddingHorizontal: 16,
                    paddingVertical: 10,

                    borderRadius: 20,

                    backgroundColor:
                      filter ===
                      item.ordering
                        ? '#22c55e'
                        : '#18181b',
                  }}
                >
                  <Text
                    style={{
                      color:
                        filter ===
                        item.ordering
                          ? '#020617'
                          : 'white',

                      fontWeight:
                        '700',
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />

            {/* LOADING */}
            {loading && (
              <ActivityIndicator
                size="large"
                color="#22c55e"
                style={{
                  marginTop: 40,
                }}
              />
            )}

            {/* EMPTY */}
            {!loading &&
              games.length ===
                0 && (
                <View
                  style={{
                    alignItems:
                      'center',
                    marginTop: 80,
                  }}
                >
                  <Text
                    style={{
                      color:
                        '#71717a',
                      fontSize: 18,
                    }}
                  >
                    No se encontraron
                    juegos 🎮
                  </Text>
                </View>
              )}
          </>
        }
        renderItem={({ item }) => (
          <GameCard
            id={item.id}
            title={item.name}
            image={
              item.background_image
            }
          />
        )}
      />
    </SafeAreaView>
  )
}