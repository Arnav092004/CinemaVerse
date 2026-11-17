import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {

  apiKey: "AIzaSyBgVJRlchkIuOUHam5_mRJkUzGlvwW1_Bo",

  authDomain: "cinemaverse-9715c.firebaseapp.com",

  projectId: "cinemaverse-9715c",

  storageBucket: "cinemaverse-9715c.firebasestorage.app",

  messagingSenderId: "248429800068",

  appId: "1:248429800068:web:9a68f4090979464cf330d1"

}



const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)