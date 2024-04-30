<script setup>
import C_header from './C_Header.vue'
import C_Time from './C_Time.vue';
import { C_session } from '@/stores/session';
const p_session = C_session();
</script>
<template>
        <div class="body_extend">
          <div class="border_">
            <C_header></C_header>
          </div>
          <div class="container-fluid  ontent_style ">
              <div class="mt-2">
                <C_Time></C_Time>
              </div>
              <div class="centered_qr justify-content-center">
                    <div class="my-auto">
                      aqui va lo que debes setear Ronny
                    </div>
              </div>
          </div>
        </div>
        <!-- <div class="border_r">
          <div v-for="deportes in p_session.deportistas">
            <div v-for="tarea in deportes">
              <div v-html="tarea.qrcode">

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