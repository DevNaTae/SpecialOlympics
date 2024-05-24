<script setup>
import { C_Sportman } from '@/stores/CRUDS/Estado_personal';
import {C_TiposInvitados } from '@/stores/CRUDS/Tipo_de_invitados';
import { reactive, onMounted } from 'vue';
import { ref } from 'vue';
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
import { Modal } from 'bootstrap';
const P_personal = C_Sportman()
const P_TiposInvitados = C_TiposInvitados();
const data_id_table = ref(null)

const tiposInvitados = ref({});

onMounted( async()=>{
  await P_personal.get_personal();
  const data = await P_TiposInvitados.get_TiposInvitados();
  P_TiposInvitados.TiposInvitados.forEach(tipo => {
    if (!tiposInvitados.value.hasOwnProperty(tipo.tipo_invitado_id)) {
    tiposInvitados.value[tipo.tipo_invitado_id] = {
      tipo_id: tipo.tipo_invitado_id,
      tipo_nombre: tipo.tipo_invitado_nombre,
      selected: false,
    }
  }  
  });
  const primerObjeto = Object.values(tiposInvitados.value)[0];
  first_id (primerObjeto.tipo_id)
})

const prueba = ()=>{
  const objeto_modal = new Modal(document.getElementById('exampleModal'));
  objeto_modal.show();
}

const emit = defineEmits(['tipoSeleccionado']);
const first_id= async(id)=>{
  tiposInvitados.value[id].selected = true;
  emit('tipoSeleccionado', id);

}

const seleted_type = async(data)=>{
  // console.log(data);
  for (const key in tiposInvitados.value) {
    tiposInvitados.value[key].selected = false;
  }
  tiposInvitados.value[data].selected = true;
  Modal.getInstance(document.getElementById('exampleModal')).hide();
  emit('tipoSeleccionado', data);

}
</script>

<template>
<!-- Button trigger modal -->
<button type="button"  class="btn btn-primary"  @click="prueba">
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
        <div v-for="tipoCredencial in tiposInvitados" :key="tipoCredencial.tipo_id" class="d-inline">
            <div>
                <div class="d-flex justify-content-between mt-2 mb-3">
                    {{ tipoCredencial.tipo_nombre }}
                    <div class="form-check">
                      <button class="btn btn-dark" @click="seleted_type(tipoCredencial.tipo_id)">
                        <i v-if="tipoCredencial.selected == false" class="bi bi-circle"></i>
                        <i v-else class="bi bi-check-circle-fill"></i>
                      </button>
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