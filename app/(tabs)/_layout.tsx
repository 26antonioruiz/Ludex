import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="juegos"
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#020617',
          borderTopWidth: 0,
          height: 90,
          paddingTop: 10,
          paddingBottom: 18,
        },

        tabBarActiveTintColor: '#22c55e',

        tabBarInactiveTintColor: '#71717a',

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="juegos"
        options={{
          title: 'Juegos',
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="game-controller"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="heart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="usuario"
        options={{
          title: 'Usuario',
          tabBarIcon: ({
            color,
            size,
          }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}