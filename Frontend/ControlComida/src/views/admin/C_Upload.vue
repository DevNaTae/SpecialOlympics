<script setup>
import C_Header from '../../components/C_Header.vue';
import C_footer from '../../components/C_Footer.vue';
import { C_print_upload } from '@/stores/Print_Credentials'
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
const provincia_seleccionada = ref('');
const selectedFile = ref(null);
const isExcelFile = ref(false);
const P_print_upload = C_print_upload()
const provincias = ref('');

const tipo_selected= ref('');
const icono_selected = ref('');

const iconos_tipo = reactive({
  data_1:{
    nombre:'xls o xlsx',
    icono:'bi bi-filetype-xls'
  },
  data_2:{
    nombre: 'jpg',
    icono:'bi bi-filetype-jpg',
  }

})

const ShowLoading = () => {
    Swal.fire({
      title:'Procesando....',
      html: '<div class="spinner-border text-primary mt-2 mb-2"></div>',
      showConfirmButton: false,
      allowOutsideClick: false, 

    });
};
const ShowSuccess = ()=>{
    Swal.fire({
        icon: "success",
        title:'Documento Subido Con exito',
        timer: 4000,

    })
}
const ShowError = (message) =>{
    Swal.fire({
        icon:'error',
        title: 'Error al subir el documento',
        text: message,
        timer: 4000,
    })
}
onMounted( async ()=>{
  await P_print_upload.get_provincia()
  provincias.value = P_print_upload.provincias;
})
const provincia_sett = ()=>{
  console.log('Valor seleccionado:', provincia_seleccionada.value);
} 


const sett_icono = (data)=>{
  tipo_selected.value = data.nombre;
  icono_selected.value= data.icono;
  if(tipo_selected.value == 'xls o xlsx'){
    fileNames.value =[];
    provincia_seleccionada.value=''
  }
  Modal.getInstance(document.getElementById(`exampleModal`)).hide();
}

const handleFileUpload = (event) => {
  
  selectedFile.value = event.target.files[0];
  isExcelFile.value = selectedFile.value && selectedFile.value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

};
const borrar_data = ()=>{
  selectedFile.value = null;
  const input = document.getElementById('archivoInput');
  input.value = '';

}
const subir_doc = async()=>{
  const formData = new FormData();
  formData.append('excelLoad', selectedFile.value);
  ShowLoading()
  const data = await P_print_upload.upload_xls(formData)
  console.log(data.response.status)
  if(data.response.status == 422){
    ShowError(data.response.data.message[0].errors);
  }else if(data.response.status == 500) {
    ShowError(data.response.data.message);
  }else if(data.success==true){
    ShowSuccess();
  }
}

const fileNames = ref([]);
const fileInputRef = ref(null);

const handleFileChange = (event) => {
  // fileNames.value = Array.from(event.target.files);
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    fileNames.value.push(files[i]);
  }
};

import axios  from 'axios';

const upload_img = async()=>{
  const formData = new FormData();
  fileNames.value.forEach((file) => {
    // Agregar la imagen al FormData con una clave única
    formData.append('images[]', file);
  });
  try {
    const response = await axios.post(`https://specialolimpics--production-jistoria.sierranegra.cloud/api/dashboard/deportista_images/${provincia_seleccionada.value}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Establecer el tipo de contenido como FormData
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error('Error al enviar las imágenes:', error);

  }

  //const data = P_print_upload.upload_imgs(formData,provincia_seleccionada.value);

}


const removeFile = (index) => {
  // Eliminar el archivo correspondiente del arreglo de nombres de archivos
  fileNames.value.splice(index, 1);
};

const fileInput = ref(null);

</script>
<template>
 <div hidden>
    <h2>Subir Archivo</h2>
    <form @submit.prevent="submitForm">
      <input type="file" ref="fileInput" @change="handleFileChange">
      <button type="submit">Subir Archivo</button>
    </form>
  </div>
<div class="body_vue" >
        <div class="content_vue">
            <C_Header></C_Header>
            <div class="mt-5 container ">
              <div >
                <div>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Tipo de archivo a subir
                  </button>
                  <div class="mt-3">
                    <p>Tipo de archivo: 
                      <a class="btn btn-primary" v-if="tipo_selected !== ''">
                        <i class="icon-font" :class="icono_selected"> </i>
                      </a>
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div class="container ">
              <div v-if="tipo_selected == 'xls o xlsx'" class="d-flex">

                <form class="Type_WH " @submit.prevent="subir_doc" enctype="multipart/form-data">
                      <div class="d-flex">
                        <div class="aumento_input_file">
                          <input  id="archivoInput" @change="handleFileUpload" class="form-control input_file_edit" type="file" >
                        </div>
                        <div class="flex-grow-1 d-flex justify-content-end">
                          <button type="submit" :disabled="!selectedFile || !isExcelFile" class="btn btn-success me-3">subir</button>
                          <a @click="borrar_data()"class="btn btn-danger" >
                            <i class="bi bi-trash-fill"></i>
                          </a>
                        </div>
                      </div>
                </form>

              </div>
              <div v-if="tipo_selected == 'jpg'" class="d-flex justify-content-center">
                <div class="container">
                  <div class="row">
                    <div class="col-12 col-sm-12">
                      <div class="mb-3">
                        <!-- seleccionar tipo de provincia -->
                        <div class="mb-3">
                          Provincia Seleccionada
                          <select 
                          v-model="provincia_seleccionada" 
                          class="form-select" 
                          aria-label="Default select example"
                          @change="provincia_sett"
                          >
                            <option v-for="datos in provincias"
                            :value="datos.provincia_id"
                            >
                            {{ datos.provincia }}
                            </option>
                          </select>
                        </div>
                        <!-- solo acepte imagenes jpg -->
                        <input class="form-control" type="file" id="formFile_img"  @change="handleFileChange" multiple>
                        <div class="ms-3 mt-2">
                          <button class="btn btn-primary" @click="upload_img">Enviar</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-12">
                      <div class="p-3 style_files" v-show="fileNames.length > 0">
                        <ul class="file-list">
                          <li v-for="(fileName, index) in fileNames" :key="index">
                            <div class="d-flex justify-content-between mt-2">
                              {{ fileName }}
                              <button class="btn btn-danger" @click="removeFile(index)">
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
        </div>
        <footer class="footer_vue">
            <C_footer></C_footer>
        </footer>
  </div>
  <!-- modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Tipo de archivo A Subir</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body " >
          <div class="d-flex justify-content-evenly">
            <button class="btn btn-dark" v-for="data in iconos_tipo" @click="sett_icono(data)">
              <i :class="data.icono" class="icon-font"> </i>
              <div>
                {{data.nombre}}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.body_vue{
  border: 0px solid red;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content_vue {
  flex: 1;
}
.footer_vue{
  background-color: #c9ae45;
  color: #fff;
  text-align: center;
  padding: 20px;
  
}
.icon-font{
    font-size: 2.0rem;
}
.btn_hw{
    width: 150px;
    height: 120px;
}
.Type_WH{
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
}
.style_files{
  background: rgb(207, 193, 193);
  border-radius: 5px;
}
.file-list {
  height: 100px; /* Altura máxima de la lista */
  overflow-y: auto; /* Agregar barra de desplazamiento vertical cuando exceda la altura */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.input_file_edit{
  border: 0.1mm solid rgb(154, 149, 149);
}
.aumento_input_file{
  border: 0px solid black;
  width: 60%;
}
</style>