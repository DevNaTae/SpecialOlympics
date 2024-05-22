<script setup>
import modal_state from './modal_state.vue';
import { defineProps, reactive } from 'vue';
import { ref,computed } from 'vue';
import { onMounted } from 'vue';
import { C_Sportman } from '@/stores/CRUDS/Estado_personal'; 
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2';
const router = useRouter()
const route = useRoute()

const P_estadoC= C_Sportman();
const tipoSeleccionado = ref(null);
const query_credentials = reactive({
    cedula:'',
    nombre:'',
    apellido:'',
    edad:'',
    genero:'',
    activo:'',
    invitado_id:'',
    provincia_id:'',
    tipo_invitado_id:'',
    fecha_nacimiento:'',

})

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
const go_edit_page= (data)=>{
    console.log(data.invitado_id);
    console.log(data.cedula);
    console.log(data.nombre);
    console.log(data.apellido);
    console.log(data.edad);
    console.log(data.genero)
    console.log(data.activo)
    query_credentials.cedula = data.cedula;
    query_credentials.nombre = data.nombre;
    query_credentials.apellido = data.apellido;
    query_credentials.edad = data.edad;
    query_credentials.genero = data.genero;
    query_credentials.activo = data.activo;
    query_credentials.invitado_id = data.invitado_id;
    query_credentials.provincia_id = data.provincia_id;
    query_credentials.tipo_invitado_id = data.tipo_invitado_id;
    query_credentials.fecha_nacimiento = data.fecha_nacimiento;

    router.push(
            {
              name:'C_editcredentials', 
              params:{f_num:data.invitado_id},
              query:{Datos_deportista: JSON.stringify(query_credentials)}
            }
    )
}
const dismis_type = async(data)=>{
    const closeLoadingAlert = ShowLoading();

    const message = await P_estadoC.dismiss_personal(data);
    console.log(message);
    if(message.success == "false"){
        await Swal.fire({
            title: 'Error',
            text: message.error,
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
        return;
    }else{
        await P_estadoC.get_typeC(tipoSeleccionado.value)
        await Swal.fire({
        title:  message.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
        });
    }
    closeLoadingAlert()
}
const ShowLoading = () => {
  // Dentro de la función ShowLoading, creamos una instancia de SweetAlert2 y la almacenamos en la variable loadingAlert.
  const loadingAlert = Swal.fire({
    title: 'Cargando...',
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

</script>
<template>
<div  class="p-2">
    <div class="container encerrar_invitados mt-3 " >
        <div class="container mt-5">
            <modal_state @tipoSeleccionado="handleTipoSeleccionado"></modal_state>
            <RouterLink :to="{name:'C_CreateCredentials'}">
                        <button class="ms-3 btn btn-dark">Crear Credencial</button>
            </RouterLink>
        </div>
        <div v-if="P_estadoC.tc_unit === null" class="container d-flex justify-content-center p-4">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="container mt-3">
            <div   >
                <table class="table ">
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
                                    <button @click="go_edit_page(type_credential)" class="button_icon_status_edit ">
                                        <i class="bi bi-screwdriver color_wicon"></i>
                                    </button>
                                    <button v-if="type_credential.activo === true" @click="dismis_type(type_credential.invitado_id)" class="button_icon_status color_wicon">
                                        <i class="bi bi-person-fill-check"></i>
                                    </button>
                                    <button v-if="type_credential.activo === false" @click="dismis_type(type_credential.invitado_id)" class="button_icon_status color_wicon">
                                        <i class="bi bi-person-fill-x color_wicon" ></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-center mb-3">
                <button class="btn btn-info me-2" @click="prevPage" :disabled="P_estadoC.pagina_inicio === 1">&laquo;</button>
                <button  class="btn btn-info me-2" v-for="page in pages" @click="gotoPage(page)">
                    {{ page }}
                </button>
                <button class="btn btn-info me-2" @click="nextPage" :disabled="P_estadoC.pagina_actual === P_estadoC.pagina_final">&raquo;</button>
            </div>
        </div>
    </div>
</div>

</template>
<style>
.encerrar_invitados{
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5); 
    border: 1px solid black !important;
}
@media(max-width:600px) {
    .encerrar_invitados{

        margin-top: 3em;
        margin-bottom: 3em;
        box-shadow: 0px 0px 10px 5px black(0,0,0,0.5);
    }
}
@media(max-width:600px){
    .completo_tabla{
        border: 0px solid;
        margin: 5em;
        margin-bottom: 2em; 
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5); border-radius: 1em; 
        padding: 2em;
    }
}

.name_ajust {
    white-space: normal; 
    word-wrap: break-word; 
}
.button_icon_status{
    padding: 10px;
    margin-left: 10px;
    margin-top: 5px;
    border-radius: 5px;
    background: gray;
    
}
.button_icon_status_edit{
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