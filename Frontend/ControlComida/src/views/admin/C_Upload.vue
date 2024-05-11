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
        timer: 3000,

    })
}
const ShowError = () =>{
    Swal.fire({
        icon:'error',
        title: 'Error al subir el documento',
        timer: 3000,
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
  Modal.getInstance(document.getElementById(`exampleModal`)).hide();
}

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
  isExcelFile.value = selectedFile.value && selectedFile.value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

};

const subir_doc = async()=>{
  // console.log(selectedFile.value)
  // console.log(provincia_seleccionada.value)
  const formData = new FormData();
  formData.append('excelLoad', selectedFile.value);
  ShowLoading()
  const data = await P_print_upload.upload_xls(formData)
  if(data == true){
    ShowSuccess();
  }else{
    ShowError();
  }
}

const fileNames = ref([]);
const handleFileChange = (event) => {
  const files = event.target.files;
  if (files) {
    // Recorrer los archivos seleccionados y agregar sus nombres al arreglo de nombres de archivos
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      fileNames.value.push(fileName);
    }
  }
};
const upload_img = async()=>{
  console.log('Imágenes enviadas:', fileNames.value);
  const formData = new FormData();
    // Agregar cada archivo al objeto FormData
    for (let i = 0; i < fileNames.value.length; i++) {
      const file = document.querySelector('input[type=file]').files[i];
      formData.append('files[]', file);
    }
}
const removeFile = (index) => {
  // Eliminar el archivo correspondiente del arreglo de nombres de archivos
  fileNames.value.splice(index, 1);
};

import axios  from 'axios';
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
                      <a class="btn btn-primary">
                        <i class="icon-font" :class="icono_selected"> </i>
                      </a>
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div class="container">
              <div v-if="tipo_selected == 'xls o xlsx'" class="d-flex justify-content-center">
                <form class="Type_WH" @submit.prevent="subir_doc" enctype="multipart/form-data">
                  <div class="mb-3">
                    <input @change="handleFileUpload" class="form-control" type="file" id="formFile">
                  </div>
                  <div class="d-flex justify-content-around">
                    <button type="submit" :disabled="!selectedFile || !isExcelFile" class="btn btn-success">subir</button>
                    <button class="btn btn-danger" >Cancelar</button>
                  </div>
                </form>
              </div>
              <div v-if="tipo_selected == 'jpg'" class="d-flex justify-content-center">
                <div class="container">
                  <div class="row">
                    <div class="col-12 col-sm-12">
                      <div class="mb-3">
                        <input class="form-control" type="file" id="formFile"  @change="handleFileChange" multiple>
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
  width: 400px;
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
</style>