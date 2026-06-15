import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'

import { Ionicons } from '@expo/vector-icons'

import { useFonts } from 'expo-font'

import { Stack } from 'expo-router'

import { StatusBar } from 'expo-status-bar'

import { View } from 'react-native'

import {
  AuthProvider,
} from '../firebase/auth-context'

export default function RootLayout() {
  const [loaded] = useFonts({
    ...Ionicons.font,
  })

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#020617',
        }}
      />
    )
  }

  return (
    <AuthProvider>
      <GluestackUIProvider mode="dark">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="login"
          />

          <Stack.Screen
            name="register"
          />

          <Stack.Screen
            name="(tabs)"
          />

          <Stack.Screen
            name="juego"
          />
        </Stack>

        <StatusBar style="light" />
      </GluestackUIProvider>
    </AuthProvider>
  )
}