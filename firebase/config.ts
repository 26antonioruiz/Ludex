import { initializeApp } from 'firebase/app'

import {
  getAuth,
} from 'firebase/auth'

import {
  getFirestore,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:
    'AIzaSyCEUzKF9BrDiPujuG7pHrkrPGeq-2hUI-o',

  authDomain:
    'ludex-4c412.firebaseapp.com',

  projectId:
    'ludex-4c412',

  storageBucket:
    'ludex-4c412.firebasestorage.app',

  messagingSenderId:
    '677504758111',

  appId:
    '1:677504758111:web:2271c1021ff0725e9b86ea',
}

const app =
  initializeApp(
    firebaseConfig
  )

export const auth =
  getAuth(app)

export const db =
  getFirestore(app)

export default app