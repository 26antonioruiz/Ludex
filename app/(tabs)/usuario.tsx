import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from 'react-native'

import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import * as ImagePicker from 'expo-image-picker'

import { useFocusEffect } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useAppStore } from '../../store/useAppStore'

import {
  doc,
  getDoc
} from 'firebase/firestore'

import {
  auth,
  db,
} from '../../firebase/config'

export default function Usuario() {
  const affiliateCode =
    'LUDEX-USER-001'

  const affiliateLink =
    `https://ludex.app/ref/${affiliateCode}`

  const { wishlist } = useAppStore()

  const [viewedGames, setViewedGames] =
    useState(0)

  const [avatar, setAvatar] =
    useState<string | null>(
    null
  )

  const wishlistCount =
    wishlist.length

  const alertsCount =
    wishlist.filter(
      (game) =>
        game.targetPrice !== null &&
        game.targetPrice !== undefined
    ).length

  useEffect(() => {
  loadViewedGames()
  loadAvatar()
}, [])

useFocusEffect(
  useCallback(() => {
    loadViewedGames()
  }, [])
)

  const loadViewedGames =
    async () => {
      try {
        const stored =
          await AsyncStorage.getItem(
            'viewed-games'
          )

        const viewed = stored
          ? JSON.parse(stored)
          : []

        setViewedGames(
          viewed.length
        )
      } catch (error) {
        console.log(error)
      }
    }

      const loadAvatar =
  async () => {
    try {
      const user =
        auth.currentUser

      if (!user)
        return

      const snapshot =
        await getDoc(
          doc(
            db,
            'users',
            user.uid
          )
        )

      if (
        snapshot.exists()
      ) {
        const data =
          snapshot.data()

        if (
          data.avatarUrl
        ) {
          setAvatar(
            data.avatarUrl
          )
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const copyCode = () => {
    Alert.alert(
      'Código afiliado',
      affiliateCode
    )
  }

  const shareAffiliate = async () => {
    try {
      await Share.share({
        message:
          `Descubre ofertas gaming con Ludex 🎮\n\n${affiliateLink}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

    const pickImage =
  async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        'Permisos',
        'Necesitamos acceso a tu galería'
      )

      return
    }

    const result =
  await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  })

if (!result.canceled) {
  setAvatar(
    result.assets[0].uri
  )
}
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#020617',
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 140,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          paddingTop: 50,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: '#22c55e',

            justifyContent: 'center',
            alignItems: 'center',

            shadowColor: '#22c55e',
            shadowOpacity: 0.4,
            shadowRadius: 20,
          }}
        >
          {avatar ? (
  <Image
    source={{
      uri: avatar,
    }}
    style={{
      width: 120,
      height: 120,
      borderRadius: 60,
    }}
  />
) : (
  <Text
    style={{
      color: '#020617',
      fontSize: 46,
      fontWeight: '900',
    }}
  >
    L
  </Text>
)}

</View>

        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: '900',
            marginTop: 18,
          }}
        >
          Usuario Ludex
        </Text>

        <Text
          style={{
            color: '#94a3b8',
            marginTop: 8,
            fontSize: 16,
          }}
        >
          Perfil y actividad
        </Text>
      </View>
        
          <Pressable
      onPress={pickImage}
        style={{
        marginTop: 16,
        backgroundColor: '#22c55e',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        }}
>
        <Text
    style={{
      color: '#020617',
      fontWeight: '900',
    }}
  >
    📷 Cambiar foto
  </Text>
</Pressable>  


      {/* STATS */}
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: '800',
            marginBottom: 16,
          }}
        >
          📊 Tu actividad
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#18181b',
              borderRadius: 24,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#22c55e',
              }}
            >
              ❤️ {wishlistCount}
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 8,
                fontWeight: '700',
              }}
            >
              Wishlist
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#18181b',
              borderRadius: 24,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#22c55e',
              }}
            >
              🎮 {viewedGames}
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 8,
                fontWeight: '700',
              }}
            >
              Juegos vistos
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#18181b',
              borderRadius: 24,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#22c55e',
              }}
            >
              🎯 {alertsCount}
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 8,
                fontWeight: '700',
              }}
            >
              Alertas
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#18181b',
              borderRadius: 24,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: '900',
                color: '#22c55e',
              }}
            >
              💰 --
            </Text>

            <Text
              style={{
                color: 'white',
                marginTop: 8,
                fontWeight: '700',
              }}
            >
              Ahorro
            </Text>
          </View>
        </View>
      </View>

      {/* HISTORIAL */}
      <View
        style={{
          marginTop: 32,
          backgroundColor: '#18181b',
          borderRadius: 24,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '800',
          }}
        >
          🎮 Últimos juegos vistos
        </Text>

        <Text
          style={{
            color: '#94a3b8',
            marginTop: 12,
            lineHeight: 22,
          }}
        >
          Próximamente mostraremos aquí
          los últimos juegos visitados
          con sus imágenes y acceso
          directo.
        </Text>
      </View>

      {/* AFILIADO */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#18181b',
          padding: 20,
          borderRadius: 24,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '700',
          }}
        >
          Código de afiliado
        </Text>

        <Text
          style={{
            color: '#22c55e',
            fontSize: 28,
            fontWeight: '900',
            marginTop: 12,
          }}
        >
          {affiliateCode}
        </Text>

        <Pressable
          onPress={copyCode}
          style={{
            backgroundColor: '#22c55e',
            marginTop: 18,
            paddingVertical: 14,
            borderRadius: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#020617',
              fontWeight: '900',
            }}
          >
            Copiar código
          </Text>
        </Pressable>
      </View>

      {/* SHARE */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#18181b',
          padding: 20,
          borderRadius: 24,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '700',
          }}
        >
          Compartir enlace
        </Text>

        <Text
          style={{
            color: '#a1a1aa',
            marginTop: 10,
            lineHeight: 22,
          }}
        >
          Comparte tu enlace de afiliado
          para ayudar a otros jugadores
          a encontrar las mejores ofertas.
        </Text>

        <Pressable
          onPress={shareAffiliate}
          style={{
            backgroundColor: '#22c55e',
            marginTop: 18,
            paddingVertical: 14,
            borderRadius: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#020617',
              fontWeight: '900',
            }}
          >
            Compartir enlace
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}