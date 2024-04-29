<script setup>
import { C_session } from '@/stores/session'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter()

const P_session = C_session();
const ShowLoading = () => {
  // Dentro de la función ShowLoading, creamos una instancia de SweetAlert2 y la almacenamos en la variable loadingAlert.
  const loadingAlert = Swal.fire({
    title: 'Procesando....',
    html: '<div class="spinner-border text-primary mt-2 mb-2"></div>',
    showConfirmButton: false,
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

</script>
<template>
    <nav class="navbar bg-body-tertiary ">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../assets/imgs/Uleam.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top">
            </a>
            <div class="d-flex">
                <button @click="logout" class=" navbar-toggler" type="button" >
                    <i class="bi bi-door-open-fill"></i>
                </button>
                <button class="ms-3 navbar-toggler" type="button">
                    <i class="bi bi-download"></i>
                </button>
            </div>
        </div>
    </nav>
</template>
<style>

</style>