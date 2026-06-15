import {
  useEffect,
} from 'react'

import {
  router,
} from 'expo-router'

import {
  useAuth,
} from '../firebase/auth-context'

export default function Index() {
  const {
    user,
    loading,
  } = useAuth()

  useEffect(() => {
    if (loading) return

    if (user) {
      router.replace(
        '/(tabs)/juegos'
      )
    } else {
      router.replace(
        '/login'
      )
    }
  }, [
    user,
    loading,
  ])

  return null
}