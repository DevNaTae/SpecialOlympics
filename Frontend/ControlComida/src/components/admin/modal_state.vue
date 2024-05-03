<script setup>
import { C_Sportman } from '@/stores/SportmanState';
import { reactive, onMounted } from 'vue';
import { ref } from 'vue';
import { defineProps } from 'vue';
import { Modal } from 'bootstrap';

const data_id_table = ref(null)
const status = reactive({
  dato_1:'atleta',
  dato_2:'Staff',
  dato_3:'Vip',
  dato_4:'Jefe de delegacion',
  dato_5:'Asistente de delegacion',
  dato_6:'Entrenador',
  dato_7:'Asistente Entrenador'
})
const emits = defineEmits(['dato-enviado']);


const send_id = (data)=>{
    console.log(data);
    data_id_table.value = data;
    emits('dato-enviado', data_id_table.value);
    Modal.getInstance(document.getElementById('exampleModal')).hide();

}
//tengo que hacer un onmuented en el que llame directamente a input de la posicion 0 del arreglo
</script>

<template>
    
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  tipos de credenciales
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Credenciales Seleccionado</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-for="(name, entry, index) in status" :key="index" class="d-inline">
            <div>
                <div class="d-flex justify-content-between mt-2 mb-3">
                    {{ name }}
                    <div class="form-check">
                        <input @change="send_id(name)" class="form-check-input" type="radio" name="exampleRadios" :id="'exampleRadios'+index" :value="name" :checked="index === 0">
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>

</style>