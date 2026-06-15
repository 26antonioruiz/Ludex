import { useState } from 'react'

import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native'

import { router } from 'expo-router'

import {
  registerUser,
} from '../firebase/auth'

export default function Register() {
  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleRegister =
    async () => {
      if (
        !name ||
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

        await registerUser(
          name,
          email,
          password
        )

        Alert.alert(
          'Éxito',
          'Cuenta creada correctamente'
        )

        router.replace(
          '/login'
        )
      } catch (error: any) {
        Alert.alert(
          'Error',
          error.message
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
        Crear cuenta
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#71717a"
        value={name}
        onChangeText={setName}
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
        placeholder="Email"
        placeholderTextColor="#71717a"
        autoCapitalize="none"
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
          handleRegister
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
            ? 'Creando...'
            : 'Crear cuenta'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() =>
          router.push(
            '/login'
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
          Ya tengo cuenta
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}