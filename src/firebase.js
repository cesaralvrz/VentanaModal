import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import "firebase/analytics"


import { ref, onUnmounted, computed } from 'vue'

// Inicialización de la App
firebase.initializeApp({
  apiKey: "AIzaSyDRrUS6eot5FBMESf3vKr2nRwasIAiUbqg",
  authDomain: "vuechat-7d278.firebaseapp.com",
  projectId: "vuechat-7d278",
  storageBucket: "vuechat-7d278.appspot.com",
  messagingSenderId: "937922956751",
  appId: "1:937922956751:web:c01594c72bbe35ad4856ba"
})

const auth = firebase.auth()

// Autentificación de Usuario
export function useAuth() {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  // verficar que el usuario está 'loggeado'
  const isLogin = computed(() => user.value !== null)

  // Inicio de sesión
  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider)
  }
  const signOut = () => auth.signOut()

  return { user, isLogin, signIn, signOut }
}

// Configuración de la base de datos de Firestore
const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
// Recogemos solo los últimos 50 mensajes de manera descendente
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(50)

// Query de los mensajes
export function useChat() {
  const messages = ref([])
  // Query de los mensajes
  const unsubscribe = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  // Cerramos el snapshot listener
  onUnmounted(unsubscribe)

  const time = firebase.firestore.FieldValue.serverTimestamp()

  // Asignamos los valores para Firebase
  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const {photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: time,
    })
  }

  return { messages, sendMessage}
}
