<script setup>
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import { C_ActividadesD } from '@/stores/CRUDS/Activididades_deportivas'
</script>
<template>

<div class="body_vue">
    <div class="content_vue">
        <C_Header></C_Header>
    </div>
    <footer class="footer_vue">
            <C_footer></C_footer>
    </footer>
</div>
</template>
<style>
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
</style>