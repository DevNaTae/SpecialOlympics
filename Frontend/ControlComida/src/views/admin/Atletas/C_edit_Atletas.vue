<script setup>
import Swal from 'sweetalert2';
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';
//pinias
import { C_Deportes } from '@/stores/CRUDS/Deportes';
import { C_ActividadesD } from '@/stores/CRUDS/Activididades_deportivas'
import { C_print_upload } from '@/stores/Print_Credentials'
import { C_Atletas } from '@/stores/CRUDS/Atleta';
const P_Deportes =  C_Deportes();
const P_ActividadesD = C_ActividadesD();
const P_print = C_print_upload();
const P_Atletas = C_Atletas();
//router
const route = useRoute()
const router = useRouter();
//arreglos
const provincias = ref('');
const Deportes = ref({});
const Actividades_deportivas = ref({});
//seleccionados
const provincia_seleccionada = ref('');
const Deporte_seleccionado = ref('');
const actividad_selecionada = ref([]);
//
const id_atleta = ref('')
const Atleta_credentials = reactive({
    cedula:'',
    nombre:'',
    apellido:'',
    edad:'',
    genero:'',
    fecha_nacimiento:'',
    url_imagen:'',
    activo:'',
    //datos a los que debo hacer un select multiple
    provincia_id:'',
    deporte_id:'',
    actividad_id:'',
    //imagen
    url_imagen:'',
})
onMounted(async()=>{
    const closeLoadingAlert = ShowLoading();
    const data = JSON.parse(route.query.Datos_deportista)
    console.log(data);
    //
    id_atleta.value = data.id;
    Atleta_credentials.cedula = data.cedula;
    Atleta_credentials.edad = data.edad;
    Atleta_credentials.fecha_nacimiento = data.fecha_nacimiento;
    Atleta_credentials.genero = data.genero;
    Atleta_credentials.nombre = data.nombre;
    Atleta_credentials.apellido = data.apellido;
    Atleta_credentials.provincia_id = data.provincia_id;
    Atleta_credentials.url_imagen = data.url_imagen
    //setear deportes
    const data_D = P_Deportes.get_Deportes();
    Deportes.value = data_D
    //Deporte_seleccionado.value = 
    //setear actividades
    //const Actividades= P_ActividadesD.get_ActividadesD();
    const data_P = P_print.get_provincia();
    //setear provincia
    provincias.value = data_P;
    provincia_seleccionada.value = Atleta_credentials.provincia_id;
    //
    closeLoadingAlert();

})
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
const Atleta_update = ()=>{

}
</script>
<template>

    <div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>
            <form class="mt-4" @submit.prevent="Atleta_update">
                <div class="container">
                    <div class="row">
                        <div class="col-12 mb-3">                            
                            <div class="base_dataEdit_top">
                                <div class="d-flex justify-content-center">
                                    <img class="img_base_edit_place" src="../../../assets/imgs/Yo.jpg">
                                </div>
                            </div>
                        </div>
                        <div class="col-12 border_o">

                        </div>
                    </div>
                </div>
            </form>
        </div>
        <footer class="footer_vue">
            <C_footer></C_footer>
        </footer>
    </div>

</template>
<style>
.img_base_edit_place{
    width: 300px;
    height: 250px;
    border-radius: 25px;
    padding: 10px;
}
</style>