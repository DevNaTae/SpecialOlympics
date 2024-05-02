<script setup>
import C_Header from '../../components/C_Header.vue';
import C_footer from '../../components/C_Footer.vue';
import { C_Sportman } from '@/stores/SportmanState';
import { reactive } from 'vue';
const  P_sportman = C_Sportman()
const status = reactive({
  dato_1:'Deportistas',
  dato_2:'Entrenadores',
  dato_3:'Staff'
})
</script>
<template>
<div class="body_vue">
        <div class="content_vue ">
            <C_Header></C_Header>
            esto es Sportman
            <div class="border_r mt-5 d-flex">
                <button v-for="name in status" class="btn btn-success">{{ name }}</button>              
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