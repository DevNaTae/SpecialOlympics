<script setup>
import { C_session } from '@/stores/session'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()

const P_session = C_session();
const ShowLoading = () => {
  // Dentro de la función ShowLoading, creamos una instancia de SweetAlert2 y la almacenamos en la variable loadingAlert.
  const loadingAlert = Swal.fire({
    title: 'Cerrando Sesión',
    html: '<div class="spinner-border text-primary mt-2 mb-2"></div>',
    showConfirmButton: false,
    allowOutsideClick: false, 
  });

  // Definimos una función interna llamada CloseLoading que cerrará la instancia de SweetAlert2.
  const CloseLoading = () => {
    Swal.close(); // Cerramos la instancia de SweetAlert2
  };

  // Devolvemos la función CloseLoading para que pueda ser utilizada fuera de la función ShowLoading.
  return CloseLoading;
};
const logout = async()=>{
    const closeLoadingAlert = ShowLoading();
    const data = await P_session.logout();
    if(data== true){
        closeLoadingAlert();
        router.push({name: 'C_login'});
    }

}
const data_qr = async()=>{
    await P_session.data_qr();
}
</script>
<template>
    <nav class="navbar bg-body-tertiary header_base">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <RouterLink :to="{name: 'C_status'}">
                    <img src="../assets/imgs/Uleam.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top">
                </RouterLink>
            </a>
            <div class="d-flex">
                <button v-if="P_session.user == 'Voluntario'" @click="logout" class=" navbar-toggler" type="button" >
                    <i class="bi bi-door-open-fill"></i>
                </button>
                <div v-if="P_session.user == 'Administrador'" class="btn-group">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-gear-fill"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end hovet_ul">
                        <li>
                            <RouterLink :to="{ name:'C_Upload' }" class="text_none">
                                <a class="dropdown-item " >
                                        Subir excel
                                </a>
                            </RouterLink>
                        </li>
                        <li>
                            <a class="dropdown-item" >
                                <RouterLink :to="{ name:'C_printCredentials'}" class="text_none">
                                    Imprimir credenciales
                                </RouterLink>
                            </a>
                        </li>
                        <li>
                            <RouterLink :to="{name: 'C_SportmanState'}" class="text_none">
                                <a class="dropdown-item" >
                                        Estado del personal
                                </a>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{name: 'C_status'}" class="text_none">
                                <a class="dropdown-item" >
                                    Status
                                </a>
                            </RouterLink>

                        </li>
                        <li><a class="dropdown-item" style="color: red;" @click="logout">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </nav>
    <a class="edit_boton ">
        {{ P_session.user }}
        <i v-if="P_session.user === 'Administrador'" class="bi bi-person-fill-gear" style="font-size: 1.5rem;"></i>
        <i v-if="P_session.user === 'Voluntario'" class="bi bi-person-circle" style="font-size: 1.5rem;"></i>
    </a>
</template>
<style scoped>
.text_none{
    text-decoration: none;
    color: black;
}
.edit_boton{
    text-decoration: none;
    color: black;
    background: greenyellow;
    padding: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}
.header_base{
    border-bottom: 0.1mm solid rgb(154, 149, 149);
    background: rgb(234, 228, 228) !important;

}
.hovet_ul li :hover{
    background: rgb(145, 204, 16) !important;
}
</style>