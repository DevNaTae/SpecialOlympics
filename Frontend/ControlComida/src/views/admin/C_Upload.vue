<script setup>
import C_Header from '../../components/C_Header.vue';
import C_footer from '../../components/C_Footer.vue';
import { C_print_upload } from '@/stores/Print_Credentials'
const P_print_upload = C_print_upload()
</script>
<template>
<div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>
            <div class="mt-5 centered_qr justify-content-center">
              <div class="my-auto">
                <div class="mb-3">
                  <label for="formFile" class="form-label">Subir archivo .xls o .xlsx</label>
                  <input class="form-control" type="file" id="formFile">
                </div>
                <div class="d-flex justify-content-around">
                  <button  class="btn btn-success">subir</button>
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