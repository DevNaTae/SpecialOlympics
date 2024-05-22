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
          <div >
            <C_header></C_header>
          </div>
          <!-- hacer que en ves de que no haya nada mostrar 4 botones con las funciones de cada cosa -->
          <div class="container-fluid ">
            <div class="mt-4">
              <C_Time></C_Time>
            </div>
            <div >
              <div v-if="p_session.user !== 'Administrador'" class="centered_qr justify-content-center">
                    <div class="my-auto" >
                      <C_scaner v-if="p_session.user !== 'Administrador'"></C_scaner>
                    </div>
              </div>
              <div v-if="p_session.user === 'Administrador'" class="container centered_qr justify-content-center">
                <div class="my-auto">
                  <C_buttons_status v-if="p_session.user === 'Administrador'" ></C_buttons_status>
                </div>
              </div>
            </div>
          </div>
        </div>

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