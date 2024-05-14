<script setup>
import Swal from 'sweetalert2';
import { defineProps, reactive } from 'vue';
import { ref,computed } from 'vue';
import { watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import modal_atletas from '@/components/admin/Atletas/modal_atletas.vue';
import { C_Atletas } from '@/stores/CRUDS/Atleta';
import { C_Deportes } from '@/stores/CRUDS/Deportes';
import { C_ActividadesD } from '@/stores/CRUDS/Activididades_deportivas'
//Pinias
const P_Atletas = C_Atletas();
const P_Deportes = C_Deportes();
const P_ActividadesD = C_ActividadesD();
//variables
const router = useRouter()
const route = useRoute()
//actividades


const DeporteSeleccionado= ref(null);

const handleDeporteSeleccionado = async (tipo) => {
  DeporteSeleccionado.value = tipo;
  await P_Atletas.get_atletas(DeporteSeleccionado.value);
  

};
const go_edit_page = async(data) =>{
    console.log(data);
    router.push(
            {
              name:'C_edit_atletas', 
              params:{f_num:data.id},
              query:{Datos_deportista: JSON.stringify(data)}
            }
    )
} 
//paginacion
const pages = computed(()=>{
    const result = [];
    const totalPagesToShow = 2; // Número de páginas a mostrar
    const startPage = Math.max(1, P_Atletas.pagina_actual - totalPagesToShow + 1);
    const endPage = Math.min(P_Atletas.pagina_final, startPage + totalPagesToShow - 1);
    for (let i = startPage; i <= endPage; i++) {
        result.push(i);
    }
    return result;
})
const gotoPage = async(id) =>{
    await P_Atletas.get_atletas(DeporteSeleccionado.value,id)
}
const nextPage = async() => {
  if (P_Atletas.pagina_actual  < P_Atletas.pagina_final) {
    P_Atletas.pagina_actual++;
    await P_Atletas.get_atletas(DeporteSeleccionado.value,P_Atletas.pagina_actual)
  }
};
const prevPage = () => {
  if (P_Atletas.pagina_actual > 1) {
    P_Atletas.pagina_actual--;
  }
};
//dar de baja
const dismis_type = async(data)=>{
    const closeLoadingAlert = ShowLoading();

    const message = await P_Atletas.dismis_atleta(data);
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
        await P_Atletas.get_atletas(DeporteSeleccionado.value);
        await Swal.fire({
        title:  message.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
        });
    }
    closeLoadingAlert()
}
//sweet alert
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
//buscador
let lastSearchQuery = '';
const searchQuery = ref('');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Propiedad computada para capitalizar el primer carácter de la consulta de búsqueda
const capitalizedSearchQuery = computed(() => capitalizeFirstLetter(searchQuery.value));

// Observar cambios en la variable searchQuery y mostrar el nuevo valor en la consola
watch(capitalizedSearchQuery, async(newValue, oldValue) => {
  console.log('Nueva consulta de búsqueda:', newValue);
  await P_Atletas.get_atletas(DeporteSeleccionado.value , newValue);
});
//
const Actividades_deportivas = ref({});
const actividad_selecionada = ref([]);
const selectedName = ref([]);
const actividadesConId = ref([]);
const actividades_selectivas = async(data)=>{
    if (Object.keys(Actividades_deportivas.value).length === 0){
        await P_ActividadesD.get_ActividadesD(data.deporte_id)
        P_ActividadesD.actividadesDeportivas.forEach(tipo => {
            Actividades_deportivas.value[tipo.actividad_id] = {
            ActividadD_id: tipo.actividad_id,
            ActividadD_nombre: tipo.actividad,
            selected: false,
            }  
        });
        actividadesConId.value = data.actividades_deportivas.map(actividad=>{
            return {
                ActividadD_id: actividad.actividad_id,
                ActividadD_nombre: actividad.actividad,
                selected: false,
            };
        })
        actividadesConId.value.forEach(actividad => {
            if (Actividades_deportivas.value.hasOwnProperty(actividad.ActividadD_id)) {
                const actividadDeportiva = Actividades_deportivas.value[actividad.ActividadD_id];
                seleted_type(actividadDeportiva);
            }
        });
    }else{
        Actividades_deportivas.value={};
        selectedName.value =[];
        actividadesConId.value=[];
        selectedCount.value = 0;
        //funcion
        await P_ActividadesD.get_ActividadesD(data.deporte_id)
        P_ActividadesD.actividadesDeportivas.forEach(tipo => {
            Actividades_deportivas.value[tipo.actividad_id] = {
            ActividadD_id: tipo.actividad_id,
            ActividadD_nombre: tipo.actividad,
            selected: false,
            }  
        });
        actividadesConId.value = data.actividades_deportivas.map(actividad=>{
            return {
                ActividadD_id: actividad.actividad_id,
                ActividadD_nombre: actividad.actividad,
                selected: false,
            };
        })
        actividadesConId.value.forEach(actividad => {
            if (Actividades_deportivas.value.hasOwnProperty(actividad.ActividadD_id)) {
                const actividadDeportiva = Actividades_deportivas.value[actividad.ActividadD_id];
                seleted_type(actividadDeportiva);
            }
        });
    }


}
const selectedCount = ref(0);
//selected name ya esta referenciado arriba
const Atleta_credentials = reactive({
    actividad_id:[]
})
const seleted_type = async(data)=>{

if (data.selected) {
  data.selected = false;
  selectedCount.value--;
  const index = selectedName.value.findIndex((t) => t.ActividadD_id === data.ActividadD_id);
  if (index !== -1) {
      Atleta_credentials.actividad_id.splice(index, 1)
      selectedName.value.splice(index, 1);
  }
} else {
  if (selectedCount.value < 3) {
    data.selected = true;
    selectedName.value.push({
      ActividadD_id: data.ActividadD_id,
      Nombre: data.ActividadD_nombre,
    });
    //hacerle push al atlteas credentials
    const index_1 = selectedName.value.findIndex((t) => t.ActividadD_id === data.ActividadD_id);
    // console.log(index_1);
    // console.log(selectedName.value[index_1].ActividadD_id);
    Atleta_credentials.actividad_id.push(selectedName.value[index_1].ActividadD_id)
    selectedCount.value++;
  }
}

}
const remove_select = (data) => {
// Eliminar el archivo correspondiente del arreglo de nombres de archivos
const index = selectedName.value.findIndex((t) => t.ActividadD_id === data);
if(index !== -1){
  selectedName.value.splice(index, 1);
  Actividades_deportivas.value[data].selected = !Actividades_deportivas.value[data].selected;
  Atleta_credentials.actividad_id.splice(index, 1)
  selectedCount.value--;

}
};
const save_actividades = ()=>{

}
</script>
<template>

    <div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>
            <div class="container mt-5">
                <modal_atletas @DeporteSeleccionado="handleDeporteSeleccionado" ></modal_atletas>
                <RouterLink :to="{name:'C_create_atletas'}">
                            <button class="ms-3 btn btn-dark">Agregar Atleta</button>
                </RouterLink>
            </div>
            <div class="container mt-3">
                <form class="d-flex" role="search">
                <input v-model="searchQuery" class="form-control me-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div v-if="P_Atletas.Atleta_unit === null" class="container d-flex justify-content-center p-4">
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
                        <tr v-for="Atletas in P_Atletas.Atleta_unit">
                            <th scope="row">
                                <p class=" mt-2">
                                    {{ Atletas.id }}
                                </p>
                            </th>
                            <td><i style="font-size: 2.0rem;" class="bi bi-person-circle"></i></td>
                            <td class="b">
                                <p class="name_ajust ">
                                    {{ Atletas.nombre }} {{ Atletas.apellido }} 
                                </p>
                            </td>
                            <td>
                                    <div class="d-inline d-flex justify-content-end">
                                        <button  v-if="false">
                                            <i class="bi bi-person-check color_wicon "></i>
                                        </button>
                                        <button @click="actividades_selectivas(Atletas)" type="button" data-bs-toggle="modal" :data-bs-target="'#exampleModal_'+Atletas.id" class="button_icon_status_sett_AD"  v-if="true" >
                                            <i class="bi bi-clipboard-fill"></i>
                                            <i class="bi bi-0-circle-fill"></i>                                     
                                            <i class="bi bi-1-circle-fill"></i>
                                            <i class="bi bi-2-circle-fill"></i>
                                            <i class="bi bi-3-circle-fill"></i>
                                        </button>
                                        <div class="modal fade" :id="'exampleModal_'+Atletas.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-lg modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Actividades Deportivas</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div v-if="selectedCount !== 0" class="mt-2 " style="background: whitesmoke; padding: 10px;">
                                                        <h2 >Actividades Seleccionadas</h2>
                                                        <div v-for="(ActividadesS ,index ) in selectedName" key="index">
                                                            <div class="d-flex justify-content-between border_text_data">
                                                                <p class="mt-2 mb-2">{{ ActividadesS.Nombre }}</p>
                                                                <a @click="remove_select(ActividadesS.ActividadD_id)" class="btn btn-danger mt-2 mb-2">
                                                                    <i class="bi bi-x-circle-fill"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-for="data in Actividades_deportivas">
                                                        <div>
                                                            <div class="d-flex justify-content-between mt-2 mb-3">
                                                                {{ data.ActividadD_nombre }}
                                                                <div class="form-check">
                                                                    <a :disabled="data.selected && selectedCount >= 3 && !data.selected" class="btn btn-dark" @click="seleted_type(data)">
                                                                        <i v-if="data.selected == false"  class="bi bi-circle"></i>
                                                                        <i v-else class="bi bi-check-circle-fill"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                    <button type="button" class="btn btn-primary" @click.prevent="save_actividades">Asignar Actividades</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button @click="go_edit_page(Atletas)" class="button_icon_status_edit ">
                                            <i class="bi bi-screwdriver color_wicon"></i>
                                        </button>
                                        <button v-if="Atletas.activo === true" @click="dismis_type(Atletas.id)" class="button_icon_status color_wicon">
                                            <i class="bi bi-person-fill-check"></i>
                                        </button>
                                        <button v-if="Atletas.activo === false" @click="dismis_type(Atletas.id)" class="button_icon_status_dismiss color_wicon">
                                            <i class="bi bi-person-fill-x color_wicon" ></i>
                                        </button>
                                    </div>
                                </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-center mb-3">
                    <button class="btn btn-info me-2" @click="prevPage" :disabled="P_Atletas.pagina_inicio === 1">&laquo;</button>
                    <button  class="btn btn-info me-2" v-for="page in pages" @click="gotoPage(page)">
                        {{ page }}
                    </button>
                    <button class="btn btn-info me-2" @click="nextPage" :disabled="P_Atletas.pagina_actual === P_Atletas.pagina_final">&raquo;</button>
                </div>
            </div>
        </div>
        <footer class="footer_vue">
            <C_footer></C_footer>
        </footer>
    </div>
    
</template>
<style>
.button_icon_status_dismiss{
    padding: 10px;
    margin-left: 10px;
    margin-top: 5px;
    border-radius: 5px;
    background: rgb(226, 9, 9);
}

.icon_fa{
    width: 1.5em;
    height: 1.5em;
    color: red !important;
}
.button_icon_status_sett_AD{
    padding: 10px;
    margin-left: 10px;
    margin-top: 5px;
    border-radius: 5px;
    background: rgb(65, 169, 17);
}
</style>