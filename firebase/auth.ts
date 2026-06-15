import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import {
  doc,
  setDoc,
} from 'firebase/firestore'

import {
  auth,
  db,
} from './config'

export const registerUser =
  async (
    name: string,
    email: string,
    password: string
  ) => {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

    const user =
      userCredential.user

    await setDoc(
      doc(
        db,
        'users',
        user.uid
      ),
      {
        uid: user.uid,

        name,

        email,

        avatarUrl: null,

        createdAt:
          new Date(),
      }
    )

    return user
  }

export const loginUser =
  async (
    email: string,
    password: string
  ) => {
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

    return userCredential.user
  }

export const logoutUser =
  async () => {
    await signOut(auth)
  }