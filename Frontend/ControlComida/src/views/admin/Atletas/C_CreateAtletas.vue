<script setup>
import Swal from 'sweetalert2';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';

import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
const router = useRouter()
const route = useRoute()
//pinias
import { C_Deportes } from '@/stores/CRUDS/Deportes';
import { C_ActividadesD } from '@/stores/CRUDS/Activididades_deportivas'
import { C_print_upload } from '@/stores/Print_Credentials'
import { C_Atletas } from '@/stores/CRUDS/Atleta';
const P_Deportes =  C_Deportes();
const P_ActividadesD = C_ActividadesD();
const P_print = C_print_upload();
const P_Atletas = C_Atletas();
//arreglos
const provincias = ref('');
const Deportes = ref({});
const Actividades_deportivas = ref({});
//seleccionados
const provincia_seleccionada = ref('');
const Deporte_seleccionado = ref('');
const actividad_selecionada = ref([]);
//datos 
const Atleta_credentials = reactive({
    cedula:'',
    nombre:'',
    apellido:'',
    edad:'',
    genero:'',
    fecha_nacimiento:'',
    activo:'',
    //datos a los que debo hacer un select multiple
    provincia_id:'',
    deporte_id:'',
    actividad_id: [],
    //imagen
    imagen:null,

})
//onMounted
onMounted(async()=>{
    await P_print.get_provincia();
    await P_Deportes.get_Deportes();
    Deportes.value = P_Deportes.deportes
    provincias.value = P_print.provincias;


})
//funciones

const validateCedula = () => {
  Atleta_credentials.cedula = Atleta_credentials.cedula.replace(/\D/g, '');
};
const provincia_sett = ()=>{
  Atleta_credentials.provincia_id = provincia_seleccionada.value;
} 
const deporte_sett = async()=>{
    Atleta_credentials.deporte_id = Deporte_seleccionado.value
    await P_ActividadesD.get_ActividadesD(Atleta_credentials.deporte_id);
    P_ActividadesD.actividadesDeportivas.forEach(tipo => {
    if (!Actividades_deportivas.value.hasOwnProperty(tipo.actividad_id)) {
        Actividades_deportivas.value[tipo.actividad_id] = {
        ActividadD_id: tipo.actividad_id,
        ActividadD_nombre: tipo.actividad,
        selected: false,
        }
    }  
    });
    
    //Actividades_deportivas.value =P_ActividadesD.actividadesDeportivas;
}
const selectedCount = ref(0);

const selectedName = ref([]);

const seleted_type = async(data)=>{
  //console.log(data.ActividadD_id);
  //   console.log(data.ActividadD_nombre);
  //   console.log(data.selected) ;

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
      console.log(index_1);
      console.log(selectedName.value[index_1].ActividadD_id);
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
//imagenes
const imageFile = ref(null);
const previewImage = ref(null);
const handleFileInputChange = async(event) => {
  const file = event.target.files[0]; // Obtener solo el primer archivo seleccionado
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
    };
    reader.readAsDataURL(file);
    //Atleta_credentials.imagen = file;
    imageFile.value =  file;
    Atleta_credentials.imagen = imageFile.value;
    console.log(Atleta_credentials.imagen)
  }
};
const Atletas_post= async ()=>{
   // P_Atletas.post_atletas(Atleta_credentials);
   let formdata = new FormData();
   formdata.append('imagen', imageFile.value)
   formdata.append('cedula', Atleta_credentials.cedula);
    try{
                const response = await fetch (`https://specialolimpics--production-jistoria.sierranegra.cloud/api/dashboard/sportman` ,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body:formdata,
                })
                const jsonData = await response.json();
                return jsonData;
            }
            catch (error) {
                console.log(error.response);
                return
            }
}
const pre_carga = ()=>{
    Atleta_credentials.cedula =1316612603;
    Atleta_credentials.nombre = 'gato';
    Atleta_credentials.apellido ='jose'
    Atleta_credentials.edad = 23
    Atleta_credentials.fecha_nacimiento = '2002-05-02'
    Atleta_credentials.genero='M'
    Atleta_credentials.provincia_id ='4'
}
</script>
<template>
    {{ Atleta_credentials }}
    <!-- Tambies debes enviar fecha de nacimiento -->
    <button @click="pre_carga" >
        llenar datos
    </button>
    <div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>
            <form @submit.prevent="Atletas_post" class="mt-4" enctype="multipart/form-data">
                <div class="container">
                    <div class="row">
                        <div class="col-12 mb-3" >                            
                            <div class="base_dataEdit_top">
                                <div >
                                    <div v-if="previewImage == null" class="d-flex justify-content-center">
                                        <img  class="img_base_edit_place" src="../../../assets/imgs/Yo.jpg">
                                    </div>
                                    <div v-if="true" >
                                        <div v-if="previewImage" class=" ">
                                            <div class="d-flex justify-content-center">
                                                <img class="img_base_edit_place" :src="previewImage" alt="Preview" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <input class="form-control edit_whimge mb-2" type="file" @change="handleFileInputChange" accept="image/*" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 ">
                            <div class=" base_dataEdit">
                                <div class="row" >
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
                                <div class="row" >
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
                                <div class="row" >
                                    <div class="col-12  col-sm-6 ">
                                        Provincia Seleccionada
                                        <select v-model="provincia_seleccionada" class="form-select" aria-label="Default select example" @change="provincia_sett">
                                            <option v-for="datos in provincias" :value="datos.provincia_id">
                                            {{ datos.provincia }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row ">
                                    <div class="col-12  col-sm-6 ">
                                        Deporte Seleccionado
                                        <select v-model="Deporte_seleccionado" class="form-select" aria-label="Default select example" @change="deporte_sett">
                                            <option v-for="datos in Deportes" :value="datos.deporte_id">
                                                {{ datos.deporte }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-12 col-sm-6 mb-2 mt-4" v-if="Atleta_credentials.deporte_id !== ''">
                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Actividades Deportivas: {{ selectedCount }}
                                        </button>
                                        <div class="mt-2">
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
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary mb-3 mt-2">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
        <footer class="footer_vue">
            <C_footer></C_footer>
        </footer>
    </div>

</template>
<style>
.border_text_data{
    border-bottom: 1px solid black;
}
.edit_whimge{

    max-width: 400px;
}
</style>