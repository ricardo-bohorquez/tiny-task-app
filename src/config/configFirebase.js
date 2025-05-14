import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const {
  VITE_API_KEY: apiKey,
  VITE_AUTH_DOMAIN: authDomain,
  VITE_PROJECT_ID: projectId,
  VITE_STORAGE_BUCKET: storageBucket,
  VITE_MESSAGING_SENDER_ID: messagingSenderId,
  VITE_APP_ID: appId
} = import.meta.env

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
