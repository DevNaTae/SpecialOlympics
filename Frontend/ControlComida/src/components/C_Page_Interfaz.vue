<script setup>
import C_header from './C_Header.vue'
import C_Time from './C_Time.vue';
import { C_session } from '@/stores/session';
import C_buttons_status from './admin/C_buttons_status.vue';
const p_session = C_session();
import C_scaner from './C_scaner.vue';

const datos = async ()=>{
  await p_session.data_qr();
}
</script>
<template>
        <div class="body_extend">
          <div class="border_">
            <C_header></C_header>
          </div>
          <!-- hacer que en ves de que no haya nada mostrar 4 botones con las funciones de cada cosa -->
          <div class="container-fluid  ontent_style " >
              <div class="mt-2">
                <C_Time></C_Time>
              </div>
              <div class="centered_qr justify-content-center">
                    <div class="my-auto" >
                      <C_scaner v-if="p_session.user !== 'Administrador'"></C_scaner>
                      <C_buttons_status v-if="p_session.user === 'Administrador'" ></C_buttons_status>
                    </div>
              </div>
          </div>
        </div>
        <!-- <button @click="datos">llamar</button>
        <div class="border_r">
          <div v-for="deportes in p_session.deportistas">
            <div v-for="tarea in deportes">
              
              <div v-html="tarea.qrcode" class="mt-5 mb-5" >

              </div>
            </div>
          </div>
        </div> -->

</template>
<style>

















.content_style{
  flex: 1;
}
.body_extend{
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}
.centered_qr{
  min-height: 70vh;
  display: flex;
  
}
</style>