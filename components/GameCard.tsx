import { useRouter } from 'expo-router'

import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

interface Props {
  id: number
  title: string
  image: string
}

export default function GameCard({
  id,
  title,
  image,
}: Props) {
  const router = useRouter()

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${title}`}
      accessibilityHint="Abre la ficha completa del juego"
      onPress={() =>
        router.push({
          pathname: '/juego/[id]',
          params: { id },
        })
      }
      style={{
        marginBottom: 24,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#18181b',
      }}
    >
      <View
        style={{
          position: 'relative',
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: '100%',
            height: 230,
          }}
          resizeMode="cover"
          accessible={true}
          accessibilityLabel={title}
        />

        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.95)',
          ]}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 140,
          }}
        />

        {/* CONTENT */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 18,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              color: '#a1a1aa',
              marginTop: 6,
              fontSize: 15,
            }}
          >
            Ver detalles
          </Text>
        </View>
      </View>
    </Pressable>
  )
}