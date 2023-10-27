import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBpI_2nDqTduyveMze0jeBIeXFMFO6QQ3c',
  authDomain: 'tiny-task-app-63731.firebaseapp.com',
  projectId: 'tiny-task-app-63731',
  storageBucket: 'tiny-task-app-63731.appspot.com',
  messagingSenderId: '846128599785',
  appId: '1:846128599785:web:a5ecb935e3de1006369678'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
