<script setup>
import C_Header from '../../components/C_Header.vue';
import C_footer from '../../components/C_Footer.vue';
import { C_print_upload } from '@/stores/Print_Credentials'
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
const provincia_seleccionada = ref('');
const selectedFile = ref(null);
const isExcelFile = ref(false);
const P_print_upload = C_print_upload()
const provincias = ref('')
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
const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
  isExcelFile.value = selectedFile.value && selectedFile.value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

};

const subir_doc = async()=>{
  // console.log(selectedFile.value)
  // console.log(provincia_seleccionada.value)
  ShowLoading()

  const data = await P_print_upload.upload_xls(selectedFile.value)
  if(data == true){
    ShowSuccess();
  }else{
    ShowError();
  }
}
</script>
<template>

<div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>
            <!-- <h2>deben mostrarse aqui las 24 provincias</h2> -->
            <!-- hacer un modal grande con las 24 provincias en un scroll bar de posiciones de 4 a 4 con sus iconos o solo los nombre -->
            <div class="mt-5 centered_qr justify-content-center ">
              <div class="my-auto ">
                <div >
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
                <div class="mb-3">
                  <label for="formFile" class="form-label">Subir archivo .xls o .xlsx</label>
                  <input @change="handleFileUpload" class="form-control" type="file" id="formFile">
                </div>
                <div class="d-flex justify-content-around">
                  <button @click="subir_doc" :disabled="!provincia_seleccionada || !selectedFile || !isExcelFile" class="btn btn-success">subir</button>
                  <button class="btn btn-danger" >Cancelar</button>
                </div>
              </div>
            </div>
        </div>
        <footer class="footer_vue">
            <C_footer></C_footer>
        </footer>
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>