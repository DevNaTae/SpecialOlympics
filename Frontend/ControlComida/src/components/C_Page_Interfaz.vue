<script setup>
import C_header from './C_Header.vue'
import C_Time from './C_Time.vue';
</script>
<template>
        <div class="body_extend">
          <div class="border_">
            <C_header></C_header>
          </div>
          <div class="container-fluid  ontent_style ">
              <div >
                <C_Time></C_Time>
              </div>
              <div class="centered_qr justify-content-center">
                    <div class="my-auto">
                      aqui va lo que debes setear Ronny
                    </div>
              </div>
          </div>
        </div>
</template>
<style>
.content_style{
  flex: 1;
}
.body_extend{
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}
.centered_qr{
  min-height: 70vh;
  display: flex;
  
}
</style>