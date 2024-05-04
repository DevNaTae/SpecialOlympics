<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'

</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-6 col-sm-4 mt-4">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name:'C_Upload' }">
                        <button type="button" class="btn btn-primary">
                            <i class="icon-font bi bi-upload"> </i>
                            <div class="mb-3 mt-2">
                                Subir Archivos
                            </div>
                        </button>
                    </RouterLink>
                </div>
                
            </div>
            <div class="col-6 col-sm-4 mt-4">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{name: 'C_SportmanState'}">
                        <button type="button" class="btn btn-secondary">
                            <i class="icon-font bi bi-building-fill-gear"></i>
                            <div>
                                Estado del personal
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>

            <div class="col-12 col-sm-4 mt-4 mb-3">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name:'C_printCredentials'}">
                        <button type="button" class="btn btn-success">
                            <i class="icon-font bi bi-printer"></i>
                            <div>
                                Imprimir Credenciales
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>

        </div>
    </div>
</template>
<style  scoped>
.icon-font{
    font-size: 4.5rem;
}
</style>