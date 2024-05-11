<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'

</script>
<template>
<!-- Button trigger modal -->
<button type="button" class="btn_hw btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <i class="icon-font bi bi-pencil-square"></i>
    <div>
        Crear Actividades
    </div>
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Seleccione Actividad</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body  mx-auto">
        <div class="d-flex justify-content-center">
          <RouterLink :to="{name:'C_actividades_deportivas'}">
            <button class="container_base_butt" data-bs-dismiss="modal">
                  <img class="base_img_butt" src="../../assets/imgs/actividades/Deportes.jpg">
                  <a class="title_butt btn btn-dark">Actividades deportivas</a>
            </button>
          </RouterLink>
        </div>
        <div class="d-flex justify-content-center">
          <RouterLink :to="{name: 'C_deportes'}">
            <button class="container_base_butt" data-bs-dismiss="modal">
                  <img class="base_img_butt" src="../../assets/imgs/actividades/AD.png">
                 <a class="title_butt btn btn-dark">Agregar Deportes</a>
            </button>
          </RouterLink>
        </div>
        <div class="d-flex justify-content-center">
          <RouterLink :to="{name:'C_lugares'}">
            <button class="container_base_butt" data-bs-dismiss="modal">
                  <img class="base_img_butt" src="../../assets/imgs/actividades/lugares.jpg">
                  <a class="title_butt btn btn-dark">Lugares</a>
            </button>
          </RouterLink>
        </div>
        <div class="d-flex justify-content-center">
          <RouterLink :to="{name:'C_tiposInvitados'}">
            <button class="container_base_butt" data-bs-dismiss="modal">
                  <img class="base_img_butt" src="../../assets/imgs/actividades/tiposdeinvitados.jpg">
                  <a class="title_butt btn btn-dark">Tipos de invitados</a>
              </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<style  scoped>
.icon-font{
    font-size: 2.0rem;
}
.btn_hw{
    width: 150px;
    height: 120px;
}

.width_button{
  width: 200px;
  height: 200px;
}
.container_base_butt{
  width: 300px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  border: 5px solid white;
}
.base_img_butt{
   width: 100%;
  height: 100%;
  overflow: hidden;
}
.title_butt{
  font-size: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>