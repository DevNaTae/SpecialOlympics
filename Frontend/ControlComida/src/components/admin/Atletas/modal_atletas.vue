<script setup>
import { reactive, onMounted } from 'vue';
import { ref } from 'vue';
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
import { Modal } from 'bootstrap';
import {C_Deportes} from '@/stores/CRUDS/Deportes'
const P_deportes = C_Deportes();
const tiposDeportes = ref({});
onMounted(async()=>{
    const data =await P_deportes.get_Deportes();
    // console.log(data);
    P_deportes.deportes.forEach(tipo => {
    if (!tiposDeportes.value.hasOwnProperty(tipo.deporte_id)) {
        tiposDeportes.value[tipo.deporte_id] = {
        deporte_id: tipo.deporte_id,
        deporte_nombre: tipo.deporte,
        selected: false,
        }
    }  
    });
    const primerObjeto = Object.values(tiposDeportes.value)[0];
    // console.log(primerObjeto.deporte_id)
    first_id (primerObjeto.deporte_id)
})

const emit = defineEmits(['DeporteSeleccionado']);
const first_id= async(id)=>{
  //tiposDeportes.value[id].selected = true;
  emit('DeporteSeleccionado', null);

}

const seleted_type = async(data)=>{
  // console.log(data);
  for (const key in tiposDeportes.value) {
    tiposDeportes.value[key].selected = false;
  }
  tiposDeportes.value[data].selected = true;
  Modal.getInstance(document.getElementById('exampleModal')).hide();
  emit('DeporteSeleccionado', data);

}
</script>
<template>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Seleccionar Deporte
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-for="deporte in tiposDeportes">
            <div>
                <div class="d-flex justify-content-between mt-2 mb-3">
                    {{ deporte.deporte_nombre }}
                    <div class="form-check">
                      <button class="btn btn-dark" @click="seleted_type(deporte.deporte_id)">
                        <i v-if="deporte.selected == false" class="bi bi-circle"></i>
                        <i v-else class="bi bi-check-circle-fill"></i>
                      </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>
<style>

</style>