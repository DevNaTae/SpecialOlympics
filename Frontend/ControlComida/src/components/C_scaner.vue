<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import jsQR from 'jsqr';
import { C_print_upload } from '@/stores/Print_Credentials';

const C_scan = C_print_upload();
const isCameraOn = ref(false);
const video = ref(null);
const canvas = ref(null);
let canScan = true;
const router = useRouter();
const route = useRoute();

const prueba_img = ref(null);

const toggleCamera = async () => {
  if (!isCameraOn.value) {
    try {
      const stream = await openRearCamera();
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

const openRearCamera = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    console.log(`Número de dispositivos de entrada de video: ${videoDevices.length}`);

    // Intenta encontrar la cámara trasera basándote en el label, si no se encuentra, usa la primera cámara disponible
    const rearCamera = videoDevices.find(device => device.label.toLowerCase().includes('back')) || videoDevices[0];

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: rearCamera.deviceId ? { exact: rearCamera.deviceId } : undefined
      }
    });

    return stream;
  } catch (error) {
    console.error('Error al acceder a la cámara:', error);
    throw error;
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
        console.log(`Código QR detectado: ${code.data}`);
        const data = await C_scan.get_qr(code.data);
        if (data === true) {
          toggleCamera();
          router.push({
            name: 'C_food_state',
            params: { f_num: 1 },
            query: { Datos_deportista: JSON.stringify(C_scan.deportista) }
          });
          console.log('QR escaneado exitosamente.');
        } else {
          console.error(`Error al escanear el QR: ${data.message}`);
        }
      }
    }
  }, 100);
};

</script>

<template>
  <div class="p-2">
    <div class="d-flex justify-content-center mb-4">
      <button @click="toggleCamera" class="btn btn-dark">{{ isCameraOn ? 'Apagar cámara' : 'Encender cámara' }}</button>
    </div>

    <div v-if="isCameraOn == false" class="p-4 base_scanner_qr_icon">
      <div v-if="isCameraOn == false" class="d-flex justify-content-center ">
        <img src="../assets/imgs/qr_place.svg">
      </div>
    </div>

    <video ref="video" :style="{ width: isCameraOn ? '400px' : 'auto', height: isCameraOn ? '400px' : 'auto' }" autoplay></video>
    <canvas ref="canvas" style="display: none;"></canvas>
  </div>
</template>
