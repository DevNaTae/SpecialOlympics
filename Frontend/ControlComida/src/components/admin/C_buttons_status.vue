<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import select_activities from './select_activities.vue';
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-6 col-sm-4 mt-2  border_">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name:'C_Upload' }">
                        <button type="button" class="btn_hw btn btn-primary">
                            <i class="icon-font bi bi-upload"> </i>
                            <div class="mb-3 mt-2">
                                Subir Archivos
                            </div>
                        </button>
                    </RouterLink>
                </div>
                
            </div>
            <div class="col-6 col-sm-4 mt-2  border_">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{name: 'C_SportmanState'}">
                        <button type="button" class="btn_hw btn btn-secondary">
                            <i class="icon-font bi bi-building-fill-gear"></i>
                            <div>
                                Estado del personal
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>

            <div class="col-6 col-sm-4 mt-2  border_">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name:'C_printCredentials'}">
                        <button type="button" class="btn_hw btn btn-success">
                            <i class="icon-font bi bi-printer"></i>
                            <div>
                                Imprimir Credenciales
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>
            
            <div class="col-6 col-sm-4 mt-2  border_">
                <div class="d-flex justify-content-center">
                    <select_activities></select_activities>
                </div>
            </div>

            <div class="col-6 col-sm-4 mt-2  border_">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name:'C_Atletas'}">
                        <button type="button" class="btn_hw btn btn-dark">
                            <i class="icon-font bi bi-person-vcard-fill"></i>
                            <div>
                                Gestionar Atletas
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
    font-size: 2.0rem;
}
.btn_hw{
    width: 150px;
    height: 120px;
}
</style>