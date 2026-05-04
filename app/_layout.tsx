import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

export default function RootLayout() {
  const [loaded] = useFonts({
    ...Ionicons.font,
  })

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: '#020617' }} />
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="light" />
    </>
  )
}