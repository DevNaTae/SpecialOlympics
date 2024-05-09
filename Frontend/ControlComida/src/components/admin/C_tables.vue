<script setup>
import modal_state from './modal_state.vue';
import { defineProps } from 'vue';
import { ref,computed } from 'vue';
import { onMounted } from 'vue';
import { C_Sportman } from '@/stores/CRUDS/Estado_personal'; 
const P_estadoC= C_Sportman();
const tipoSeleccionado = ref(null);

const handleTipoSeleccionado = async (tipo) => {
  tipoSeleccionado.value = tipo;
  await P_estadoC.get_typeC(tipoSeleccionado.value)

};
const pages = computed(()=>{
    const result = [];
    const totalPagesToShow = 2; // Número de páginas a mostrar
    const startPage = Math.max(1, P_estadoC.pagina_actual - totalPagesToShow + 1);
    const endPage = Math.min(P_estadoC.pagina_final, startPage + totalPagesToShow - 1);
    for (let i = startPage; i <= endPage; i++) {
        result.push(i);
    }
    return result;
})
const gotoPage = async(id) =>{
    await P_estadoC.get_typeC(tipoSeleccionado.value,id)
}
const nextPage = async() => {
  if (P_estadoC.pagina_actual  < P_estadoC.pagina_final) {
    P_estadoC.pagina_actual++;
    await P_estadoC.get_typeC(tipoSeleccionado.value,P_estadoC.pagina_actual)
  }
};
const prevPage = () => {
  if (P_estadoC.pagina_actual > 1) {
    P_estadoC.pagina_actual--;
  }
};
</script>
<template>
    
    <!-- debo hacer un load mientras se pide la peticion -->
    <div class="container mt-5">
        <modal_state @tipoSeleccionado="handleTipoSeleccionado"></modal_state>
        <RouterLink :to="{name:'C_CreateCredentials'}">
                    <button class="ms-3 btn btn-dark">Crear Credencial</button>
        </RouterLink>
    </div>

    <div v-if="tipoSeleccionado === null" class="container d-flex justify-content-center p-4">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else class="container mt-3">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col ">
                    <div class="d-flex justify-content-end">Opciones</div>
                </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="type_credential in P_estadoC.tc_unit">
                    <th scope="row">
                        <p class=" mt-2">
                            {{ type_credential.invitado_id }}
                        </p>
                    </th>
                    <td><i style="font-size: 2.0rem;" class="bi bi-person-circle"></i></td>
                    <td class="b">
                        <p class="name_ajust ">
                            {{ type_credential.nombre }} {{ type_credential.apellido }} 
                        </p>
                    </td>
                    <td>
                        <div class="d-inline d-flex justify-content-end">
                            <button  v-if="false">
                                <i class="bi bi-person-check color_wicon "></i>
                            </button>
                            <button v-if="false">
                                <i class="bi bi-person-down color_wicon"></i>
                            </button>
                            <button class="button_icon_status">
                                <i class="bi bi-screwdriver color_wicon"></i>
                            </button>
                            <button v-if="false">
                                <i class="bi bi-person-fill-check"></i>
                            </button>
                            <button class="button_icon_status color_wicon">
                                <i class="bi bi-person-fill-x color_wicon" ></i>
                            </button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
        <div class="d-flex justify-content-center mb-3">
            <button class="btn btn-info me-2" @click="prevPage" :disabled="P_estadoC.pagina_inicio === 1">&laquo;</button>
            <button  class="btn btn-info me-2" v-for="page in pages" @click="gotoPage(page)">
                {{ page }}
            </button>
            <button class="btn btn-info me-2" @click="nextPage" :disabled="P_estadoC.pagina_actual === P_estadoC.pagina_final">&raquo;</button>
        </div>
    </div>

</template>
<style>
.name_ajust {
    white-space: normal; 
    word-wrap: break-word; 
}
.button_icon_status{
    padding: 10px;
    margin-left: 10px;
    margin-top: 5px;
    border-radius: 5px;
    background: black;
}
.color_wicon{
    color: azure;
    font-size: 1.0rem;
}
</style>