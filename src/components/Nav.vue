<template>
  <nav>
    <div>
      <h1><strong>Ventana</strong> Modal</h1>

      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button class="text-gray-300 hover:text-blue-400" @click="signOut">
          Cerrar Sesión
        </button>
      </div>

      <button v-else class="bg-blue-500 hover:bg-blue-600" @click="signIn">
        Iniciar Sesión
      </button>
    </div>
  </nav>
</template>

<script>
import Avatar from './Avatar.vue'
import { useAuth } from '@/firebase'

export default {
  components: { Avatar },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth()
    return { user, isLogin, signOut, signIn }
  }
}
</script>
