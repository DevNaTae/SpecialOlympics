<script setup>

import { reactive } from 'vue';
import { ref } from 'vue';
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import modal_state from '@/components/admin/modal_state.vue';
import C_tables from '@/components/admin/C_tables.vue';


</script>
<template>
<div class="body_vue">
        <div class="content_vue ">
            <C_Header></C_Header>
            
            <C_tables></C_tables>
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