<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref } from 'vue';
import jsQR from 'jsqr';
import { C_print_upload } from '@/stores/Print_Credentials';
const C_scan = C_print_upload();
const isCameraOn = ref(false);
const video = ref(null);
const canvas = ref(null);
let canScan = true;
const router = useRouter()
const route = useRoute()

const prueba_img = ref(null);
import Swal from 'sweetalert2'
const ShowLoading = () => {
  // Dentro de la función ShowLoading, creamos una instancia de SweetAlert2 y la almacenamos en la variable loadingAlert.
  const loadingAlert = Swal.fire({
    title: 'Scanneando Qr',
    html: '<div class="spinner-border text-primary mt-2 mb-2"></div>',
    showConfirmButton: false,
    allowOutsideClick: false, 
  });

  // Definimos una función interna llamada CloseLoading que cerrará la instancia de SweetAlert2.
  const CloseLoading = () => {
    Swal.close(); // Cerramos la instancia de SweetAlert2
  };

  // Devolvemos la función CloseLoading para que pueda ser utilizada fuera de la función ShowLoading.
  return CloseLoading;
};
const ShowSuccess = ()=>{
    Swal.fire({
        icon: "success",
        title:'scaneado',
        timer: 3000,

    })
}
const ShowError = () =>{
    Swal.fire({
        icon:'error',
        title: 'error al scannear',
        timer: 3000,
    })
}
const toggleCamera = async () => {
  if (!isCameraOn.value) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.value.srcObject = stream;
      isCameraOn.value = true;
      scanQRCode();
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  } else {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.value.srcObject = null;
    isCameraOn.value = false;
  }
};

const scanQRCode = () => {
  if (!canScan) return;

  const videoEl = video.value;
  const canvasEl = canvas.value;

  const context = canvasEl.getContext('2d');
  const { width, height } = videoEl.getBoundingClientRect();
  canvasEl.width = width;
  canvasEl.height = height;

  const drawInterval = setInterval(async () => {
    if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
      context.drawImage(videoEl, 0, 0, width, height);
      const imageData = context.getImageData(0, 0, width, height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
       
        canScan = false;
        setTimeout(() => {
          canScan = true;
        }, 5000); // Pausa de 5 segundos
        clearInterval(drawInterval);
        //aqui va la nota
        const closeLoadingAlert = ShowLoading();
        const data = await C_scan.get_qr(code.data);
        //prueba_img.value = C_scan.deportista.deportista.url_imagen;
        if(data=== true){
          toggleCamera();
          router.push(
            {
              name:'C_food_state', 
              params:{f_num:C_scan.deportista.deportista.cedula},
              query:{Datos_deportista: JSON.stringify(C_scan.deportista)}
            }
          )
          ShowSuccess()
        }else{
          ShowError()
        }
      }
    }
  }, 100);
};


</script>

<template>
  <div>
    <div class="d-flex justify-content-center mb-3">
      <button @click="toggleCamera" class="btn btn-dark">{{ isCameraOn ? 'Apagar cámara' : 'Encender cámara' }}</button>
    </div>
    <video ref="video" autoplay></video>
    <canvas ref="canvas" style="display: none;"></canvas>
  </div>
  <div class="border_r">
    <img :src="`http://127.0.0.1:8000/storage/${prueba_img}`"> 
  </div>
</template>



<style scoped>
/* Estilos opcionales para el componente */
video {
  width: 100%;
  max-width: 400px;
}
</style>
