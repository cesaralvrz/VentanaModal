<template>
  <div class="container-sm mt-20">
    <h2 class="comments">Comentarios</h2>
    <div class="mx-5">
      <Message
        v-for="{id, text, userPhotoURL, userName, userId, createdAt} in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        <!-- :sender="userId === user?.uid" -->
      >
        {{ text }}
        <p class="date">{{format_date(createdAt)}}</p>
      </Message>
      <div v-if="name" class="message">
        <div class="flex flex-row-reverse mr-8">
          <div class="text w-full bg-gray-800">
            <p class="text-blue-400"> {{name}} </p>
            <p class="text-white text-xs">{{type}} ({{size}} MB) - {{time}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div ref="bottom" class="mt-20"/>

  <div class="bottom">
    <div class="container-sm">
      <div v-if="isLogin" class="flex">
        <form @submit.prevent="send">
          <input v-model="message" placeholder="Introduce tu mensaje..." required/>
          <button type="submit">
            <SendButton />
          </button>
        </form>
        <button class="ml-1">
          <UploadFile @passFile="fileData" />
        </button>
    </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'

import SendButton from './SendButton.vue'
import Message from './Message.vue'
import UploadFile from './UploadFile.vue'

import moment from 'moment'

export default {
  components: { Message, SendButton, UploadFile},
  data(){
    return{
        name: null,
        size: null,
        type: null,
        time: null,
      }
  },
  setup() {
    const { user, isLogin } = useAuth()
    const { messages, sendMessage} = useChat()

    const bottom = ref(null)

    // Scroll automático hacía abajo
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' })
        })
      },
      { deep: true }
    )

    const message = ref('')
    // Vaciamos el mensaje
    const send = () => {
      sendMessage(message.value)
      message.value = ''
    }

    return { user, isLogin, messages, bottom, message, send}
  },
  methods: { 
      // Método para formatear la fecha
      format_date(value){
        var fecha = new Date(value * 1000)
         if (fecha) {
           return moment(String(fecha)).format('hh:mm (DD/MM)')
          }
      },
      // Método que recibe los emits del componente hijo (UploadFile)
      fileData({x, y, z, a}){
        this.name = x
        this.type = z

        this.time = a
        this.time = new Date(this.time)
        this.time = moment(String(this.time)).format('hh:mm (DD/MM/YYYY)')

        this.size = y
        this.size = this.size / 1000000
        this.size = this.size.toFixed(2)
      }
   }
}
</script>
