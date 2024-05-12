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
//variables
const P_Atletas = C_Atletas();
const router = useRouter()
const route = useRoute()

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
            <div class="container-fluid mt-3">
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
                                        <button v-if="false">
                                            <i class="bi bi-person-down color_wicon"></i>
                                        </button>
                                        <button @click="go_edit_page(Atletas)" class="button_icon_status ">
                                            <i class="bi bi-screwdriver color_wicon"></i>
                                        </button>
                                        <button v-if="Atletas.activo === true" @click="dismis_type(Atletas.id)" class="button_icon_status color_wicon">
                                            <i class="bi bi-person-fill-check"></i>
                                        </button>
                                        <button v-if="Atletas.activo === false" @click="dismis_type(Atletas.id)" class="button_icon_status color_wicon">
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

</style>