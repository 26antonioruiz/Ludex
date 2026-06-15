import { useState } from 'react'

import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native'

import { router } from 'expo-router'

import {
  loginUser,
} from '../firebase/auth'

export default function Login() {
  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleLogin =
    async () => {
      if (
        !email ||
        !password
      ) {
        Alert.alert(
          'Error',
          'Completa todos los campos'
        )

        return
      }

      try {
        setLoading(true)

        await loginUser(
          email,
          password
        )

        router.replace(
          '/(tabs)/juegos'
        )
      } catch (error: any) {
        Alert.alert(
          'Error',
          'Email o contraseña incorrectos'
        )
      } finally {
        setLoading(false)
      }
    }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          '#020617',
        justifyContent:
          'center',
        padding: 24,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 42,
          fontWeight: '900',
          marginBottom: 12,
        }}
      >
        LUDEX
      </Text>

      <Text
        style={{
          color: '#94a3b8',
          marginBottom: 40,
          fontSize: 18,
        }}
      >
        Iniciar sesión
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#71717a"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor:
            '#18181b',
          color: 'white',
          padding: 18,
          borderRadius: 18,
          marginBottom: 16,
        }}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#71717a"
        secureTextEntry
        value={password}
        onChangeText={
          setPassword
        }
        style={{
          backgroundColor:
            '#18181b',
          color: 'white',
          padding: 18,
          borderRadius: 18,
          marginBottom: 24,
        }}
      />

      <Pressable
        onPress={
          handleLogin
        }
        style={{
          backgroundColor:
            '#22c55e',
          padding: 18,
          borderRadius: 18,
          alignItems:
            'center',
        }}
      >
        <Text
          style={{
            fontWeight: '800',
            fontSize: 16,
          }}
        >
          {loading
            ? 'Entrando...'
            : 'Entrar'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          router.push(
            '/register'
          )
        }
        style={{
          marginTop: 24,
        }}
      >
        <Text
          style={{
            color:
              '#22c55e',
            textAlign:
              'center',
          }}
        >
          Crear cuenta
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}