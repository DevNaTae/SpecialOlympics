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
      <div class="modal-body">
        <RouterLink :to="{name: 'C_deportes'}">
          <button data-bs-dismiss="modal">
            Deportes
          </button>
        </RouterLink>
        <RouterLink :to="{name:'C_actividades_deportivas'}">
          <button data-bs-dismiss="modal">
            Actividades deportivas
          </button>
        </RouterLink>
        <RouterLink :to="{name:'C_lugares'}">
          <button data-bs-dismiss="modal">
            Lugares
          </button>
        </RouterLink>
        <RouterLink :to="{name:'C_tiposInvitados'}">
          <button data-bs-dismiss="modal">
            Tipos de invitados
          </button>
        </RouterLink>
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
</style>