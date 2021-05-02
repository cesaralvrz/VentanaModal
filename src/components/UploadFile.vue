<template>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="showModal = true">
    Archivo
    </button>
    <transition name="fade" appear>
    <div class="modal-overlay" v-if="showModal" @click="showModal = true"></div>
    </transition>
    <transition name="slide" appear>
    <div class="modal" v-if="showModal">
    <div class="justify-items-center content-center text-center">
            <h4 class="mb-4"> Sube tu archivo (.pdf, .docx y .doc):</h4>
            <input type="file" @change="previewImage" accept=".pdf, .docx or .doc" >
        </div>
        <div class=" text-center">
            <p>Progreso: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4" @click="onUpload">Subir</button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-1 content-center" @click="showModal = false">
            Aceptar
            </button>
    </div>
    </transition>
    <!--
    <div class="container-sm content-center">
        <img :src="picture">
        <div>
            <input type="file" @change="previewImage" accept=".jpg, .pdf, .png, .docx or .doc" >
        </div>
        <div>
            <p>Progress: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>
        <div v-if="imageData!=null">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="onUpload">Upload</button>
        </div>
    </div>-->
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Upload',
  data(){
	return{
      fileData: null,
      name: null,
      uploadValue: 0,
      showModal: false,
	}
  },
  methods:{
    previewImage(event) {
      this.uploadValue=0;
      this.name=null;
      this.fileData = event.target.files[0];
    },

    onUpload(){
      this.name=null;
      const storageRef=firebase.storage().ref(`${this.fileData.name}`).put(this.fileData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        // Metadata del Archivo
        storageRef.snapshot.ref.getMetadata().then((metadata)=>{
          this.name = metadata.name;
          // Emit al componente padre (chat)
          this.$emit('passFile', this.name)
        });
      }
      );
    },

  }
}
</script>

<style>

.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}

.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 100%;
 max-width: 600px;
 background-color: rgb(255, 255, 255);
 border-radius: 16px;
 border-style: solid;
 border-color: blue;
 
 padding: 25px;
}

.fade-enter-active,
.fade-enter-from,
.fade-leave-active {
 transition: opacity 0.5s;
}

.fade-enter,
.fade-enter-from,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform 0.5s;
}

.slide-enter,
.slide-enter-from,
.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}
</style>