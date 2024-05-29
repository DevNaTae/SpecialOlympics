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
//selecionados para actividad nombre
const selectedName = ref([]);

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
    actividad_id: [],
    //imagen
    url_imagen:null,
})
const prueba = ref('');
onMounted(async()=>{
    const closeLoadingAlert = ShowLoading();
    const data = JSON.parse(route.query.Datos_deportista)
    prueba.value = data;    
    //setear id del deportista
    id_atleta.value=data.id;
    //setear datos del deportiste
    Atleta_credentials.cedula = data.cedula;
    Atleta_credentials.nombre = data.nombre;
    Atleta_credentials.apellido = data.apellido;
    Atleta_credentials.edad = data.edad;
    Atleta_credentials.genero = data.genero;
    Atleta_credentials.fecha_nacimiento =  data.fecha_nacimiento;
    Atleta_credentials.url_imagen = data.url_imagen;
    Atleta_credentials.activo = data.activo;
    //setear deportes
    await P_Deportes.get_Deportes();
    P_Deportes.deportes.forEach(deporte =>{
        if(!Deportes.value.hasOwnProperty(deporte.deporte_id)){
            Deportes.value[deporte.deporte_id]={
                deporte_id: deporte.deporte_id,
                deporte: deporte.deporte,
                selected:false,
            }
        }
    })
    Atleta_credentials.deporte_id = data.deporte.deporte_id
    Deporte_seleccionado.value = Atleta_credentials.deporte_id
    //hacer la llamada para hacer el await

    //setear Actividades Deportivas Segun el Deporte
    await P_ActividadesD.get_ActividadesD(Deporte_seleccionado.value)
    P_ActividadesD.actividadesDeportivas.forEach(tipo => {
    if (!Actividades_deportivas.value.hasOwnProperty(tipo.actividad_id)) {
        Actividades_deportivas.value[tipo.actividad_id] = {
        ActividadD_id: tipo.actividad_id,
        ActividadD_nombre: tipo.actividad,
        selected: false,
        }
    }  
    });
    //setear las ids

    const actividadesConId = data.actividades_deportivas.map(actividad=>{
        return {
            ActividadD_id: actividad.actividad_id,
            ActividadD_nombre: actividad.actividad,
            selected: false,
        };
    })

    actividadesConId.forEach(actividad => {
    // Verificar si la actividad existe en Actividades_deportivas
    if (Actividades_deportivas.value.hasOwnProperty(actividad.ActividadD_id)) {
        // Obtener la actividad correspondiente en Actividades_deportivas
        const actividadDeportiva = Actividades_deportivas.value[actividad.ActividadD_id];
        seleted_type(actividadDeportiva);

    }
    });

    //setear provincia
    await P_print.get_provincia();
    provincias.value = P_print.provincias;
    provincia_seleccionada.value = data.provincia_id;
    Atleta_credentials.provincia_id = provincia_seleccionada.value;
    //setear la imagen en preview image
    //pendiente
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
    
    const closeLoadingAlert = ShowLoading();
    const data = P_Atletas.put_atleta(Atleta_credentials,id_atleta.value)
    if(data.success == "false"){
        await Swal.fire({
            title: 'Error',
            text: data.error,
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
        return;
    }else{
        await Swal.fire({
        title: 'Atleta editado',
        text: 'Atleta editado exitosamente',
        icon: 'success',
        confirmButtonText: 'Entendido'
        });
        router.go(-1)
    }
    closeLoadingAlert()
}
//funciones
const provincia_sett = ()=>{
  Atleta_credentials.provincia_id = provincia_seleccionada.value;
} 
//setear deportes por funcion 
const deporte_sett = async()=>{
    Atleta_credentials.deporte_id = Deporte_seleccionado.value
    await P_ActividadesD.get_ActividadesD(Atleta_credentials.deporte_id);
    Actividades_deportivas.value = P_ActividadesD.actividadesDeportivas.map(tipo => ({
        ActividadD_id: tipo.actividad_id,
        ActividadD_nombre: tipo.actividad,
        selected: false
    }));
    //console.log(Actividades_deportivas.value)
    //Actividades_deportivas.value =P_ActividadesD.actividadesDeportivas;
}
//actividades deportiva
const selectedCount = ref(0);
//selected name ya esta referenciado arriba

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
      //console.log(index_1);
      //console.log(selectedName.value[index_1].ActividadD_id);
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
const previewImage = ref(null);
const getImageUrl = () => {
  const baseUrl =  P_Atletas.url_env;
  const imageUrl = Atleta_credentials.url_imagen;
  return new URL(imageUrl, baseUrl).href;
};

const handleFileInputChange = (event) => {
  const file = event.target.files[0]; // Obtener solo el primer archivo seleccionado
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
    };
    reader.readAsDataURL(file);
    Atleta_credentials.url_imagen = file; 

  }
};
</script>
<template>
    <!-- <img :src="getImageUrl()" alt="Imagen completa">
    <img class="img_base_edit_place" src="../../../assets/imgs/Yo.jpg"> -->

    <div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>
            <form class="mt-4" @submit.prevent="Atleta_update">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-sm-3 base_dataEdit_top mb-2 rounded">
                            <div >
                                <div >
                                    <div v-if="previewImage == null" class="d-flex justify-content-center">
                                        <img :src="getImageUrl()" class="img_base_edit_place" alt="Imagen completa">
                                    </div>
                                    <div v-if="true" >
                                        <div v-if="previewImage" class=" ">
                                            <div class="d-flex justify-content-center">
                                                <img class="img_base_edit_place" :src="previewImage" alt="Preview" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-9  mb-3">
                            <div class=" base_dataEdit_top p-2 rounded">
                                <!-- aqui se guarda -->
                                <div class="row">
                                    <div class="col-12 col-sm-6">
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Cedula</label>
                                            <input  v-model="Atleta_credentials.cedula" type="text" class="form-control"  @input="validateCedula"   maxlength="10" >
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-12 col-sm-6">
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                            <input v-model="Atleta_credentials.nombre" type="text" class="form-control" id="exampleInputEmail1" >
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Apellido</label>
                                            <input v-model="Atleta_credentials.apellido" type="text" class="form-control" id="exampleInputPassword1">
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-12 col-sm-6">
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Edad</label>
                                            <input v-model="Atleta_credentials.edad" type="number" min="0" class="form-control" id="exampleInputPassword1">
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">fecha de nacimiento</label>
                                            <input v-model="Atleta_credentials.fecha_nacimiento" class="form-control" type="date" id="fecha" name="fecha">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm-6" >
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Genero</label>
                                            <select v-model="Atleta_credentials.genero" class="form-select" aria-label="Default select example">
                                                <option value="M">Masculino</option>
                                                <option value="F">Femenino</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12  col-sm-6">
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">Estado</label>
                                            <select v-model="Atleta_credentials.activo" class="form-select" aria-label="Default select example">
                                                <option value="true">Activo</option>
                                                <option value="false">De baja</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!-- aqui va seleccionar provincia -->
                                <div class="row">
                                    <div class="col-12  col-sm-6 ">
                                        Provincia Seleccionada
                                        <select v-model="provincia_seleccionada" class="form-select" aria-label="Default select example" @change="provincia_sett">
                                            <option v-for="datos in provincias" :value="datos.provincia_id">
                                            {{ datos.provincia }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!-- aqui va lo de deporte con deporte seleccionado -->
                                <div class="row">
                                    <div class="col-12  col-sm-6 ">
                                        Deporte Seleccionado
                                        <select v-model="Deporte_seleccionado" class="form-select" aria-label="Default select example" @change="deporte_sett">
                                            <option v-for="datos in Deportes" :value="datos.deporte_id">
                                                {{ datos.deporte }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-12 col-sm-6 mb-2 mt-4" v-if="Atleta_credentials.deporte_id !== ''">
                                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Actividades Deportivas: {{ selectedCount }}
                                        </a>
                                        <div class="mt-2 ">
                                            <div v-for="(ActividadesS ,index ) in selectedName" key="index">
                                                <div class="d-flex justify-content-between border_text_data">
                                                    <p class="mt-2 mb-2">{{ ActividadesS.Nombre }}</p>
                                                    <a @click="remove_select(ActividadesS.ActividadD_id)" class="btn btn-danger mt-2 mb-2">
                                                        <i class="bi bi-x-circle-fill"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-scrollable">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <a type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
                                                </div>
                                                <div class="modal-body">
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

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end mt-2 mb-2">
                                    <button class="btn btn-info ">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
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