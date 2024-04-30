<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import Swal from 'sweetalert2'

import { C_session } from '@/stores/session'
const P_session = C_session();

const router = useRouter()
const route = useRoute()
const verif = false
const ShowLoading = () => {
    Swal.fire({
      title:'Procesando....',
      html: '<div class="spinner-border text-primary mt-2 mb-2"></div>',
      showConfirmButton: false,
      allowOutsideClick: false, 

    });
};
const ShowSuccess = ()=>{
    Swal.fire({
        icon: "success",
        title:'verificado',
        timer: 3000,

    })
}
const ShowError = () =>{
    Swal.fire({
        icon:'error',
        title: 'Credenciales Incorrectas',
        timer: 3000,
    })
}
const form_session= ref({
    email:'',
    password:''
})
const sesion_function = async()=>{
    ShowLoading();
    const session_verif = await P_session.init_session(form_session.value)
    setTimeout(() => {
         if(session_verif == true){
             ShowSuccess();
             router.push({name: 'C_status'});
         }else{
             ShowError();
        }
    }, 3000);


}
</script>
<template>
<div class="center-container" >
    <div class="container-fluid font_serie">
                <div class="row justify-content-center mb-2">
                    <div class="col-5 col-lg-1 ">
                        <div class="d-flex justify-content-center">
                            <img class="logo_resolution " src="../assets/imgs/Uleam.png" alt="Descripción de la imagen">
                        </div>
                    </div>
                    <div class="col-2 col-lg-1 ">
                        <div class="d-flex justify-content-center">
                            <i class="bi bi-infinity"
                            style="font-size: 3.5rem; color: red;"
                            ></i>
                        </div>
                    </div>
                    <div class="col-5 col-lg-1 ">
                        <div class="d-flex justify-content-center">
                            <img class="logo_resolution" src="../assets/imgs/olimpiadas_O.png" alt="Descripción de la imagen">
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center border_blu">
                    <div class="col-10 col-xl-4">
                        <div class="base_session">
                            <h2>Administracion de Comida</h2>
                            <h2>Credenciales:</h2>
                            <form @submit.prevent="sesion_function">
                                <div class="form-floating mb-3">
                                    <input type="email" v-model="form_session.email" class="form-control"  placeholder="name@example.com">
                                    <label for="floatingInput">Usuario</label>
                                </div>
                                <div class="form-floating">
                                    <input type="password" v-model="form_session.password" class="form-control" placeholder="Password">
                                    <label for="floatingPassword">Contraseña</label>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="btn btn-success mt-3">
                                        Iniciar sesion
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    </div>
</div>

</template>
<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.logo_resolution{
    width: 100px;
    height: 100px;

}
.font_serie{
    font-family:'Times New Roman', Times, serif;
}

.base_session{
    border: 0px solid black;
    background: rgb(255, 255, 255);
    border-radius: 15px;
    padding: 15px;
}
</style>