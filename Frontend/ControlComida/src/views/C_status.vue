<script setup>
import C_Page_Interfaz from '@/components/C_Page_Interfaz.vue';
import C_footer from '@/components/C_Footer.vue'
</script>
<template>
    <div class="body_vue">
        <div class="content_vue ">
            <C_Page_Interfaz></C_Page_Interfaz>
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