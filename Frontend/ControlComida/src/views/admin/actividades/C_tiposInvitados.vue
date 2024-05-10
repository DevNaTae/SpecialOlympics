<script setup>
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import { C_TiposInvitados } from '@/stores/CRUDS/Tipo_de_invitados';
import { reactive } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
const P_invitados = C_TiposInvitados();

onMounted(async()=>{
  const closeLoadingAlert = ShowLoading();
  await P_invitados.get_TiposInvitados();
  closeLoadingAlert();

})
const T_invitados_data = reactive({
  tipo_invitado_nombre:'',
  descripcion:'',
})
const id_TI = ref('');
const T_invitados_update = reactive({
  tipo_invitado_nombre:'',
  descripcion:'',
})
const tipoI_send = async()=>{
  if(T_invitados_data.tipo_invitado_nombre === ''){
    await Swal.fire({
      title: 'Error',
      text: 'Por favor, rellena todos los campos',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
    return;
  }else{
    const closeLoadingAlert = ShowLoading();
    const data = await P_invitados.post_TiposInvitados(T_invitados_data.tipo_invitado_nombre)
    if(data.success == 'false'){
      await Swal.fire({
        title: 'Error',
        text: data.error,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else{
      await P_invitados.get_TiposInvitados();
      await Swal.fire({
        title: 'tipo de invitado creado',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
      
      closeLoadingAlert();
    }
  }
}
const ShowLoading = () => {
  // Dentro de la función ShowLoading, creamos una instancia de SweetAlert2 y la almacenamos en la variable loadingAlert.
  const loadingAlert = Swal.fire({
    title: 'Cargando...',
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
const TInvitado_update = async(nombre, id) =>{
  T_invitados_update.tipo_invitado_nombre = nombre;
  id_TI.value = id;
}
const TInvitado_delete = async (id)=>{
  await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Una vez eliminada, no podrás recuperar esta actividad',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const closeLoadingAlert = ShowLoading();
      const message =  await P_invitados.dismiss_TiposInvitados(id);
      console.log(message)
      if(message.error){
        await Swal.fire({
          title: 'Error',
          text: message.error,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
        return;
      }else{
        await P_invitados.get_TiposInvitados();
        await Swal.fire({
          title: 'Tipo de invitado elimiado',
          text: message.message,
          icon: 'success',
          confirmButtonText: 'Entendido'
        });
        closeLoadingAlert();
      }
    }

  });
}
const edit_Invitado = async()=>{
  const closeLoadingAlert = ShowLoading();
  const data = await P_invitados.put_TiposInvitados(T_invitados_update.tipo_invitado_nombre, id_TI.value);
    if(data.success == "false"){
      await Swal.fire({
        title: 'Error',
        text: data.error,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else{
      await P_invitados.get_TiposInvitados();
      await Swal.fire({
        title: 'Lugar editado',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
      Modal.getInstance(document.getElementById(`slug_${id_TI.value}`)).hide();
      closeLoadingAlert();
    }
}
</script>
<template>

<div class="body_vue">
    <div class="content_vue">
        <C_Header></C_Header>
       <div class="container   mt-4 p-4">
        <div class="row main-container">
          <div class="col-12 col-sm-8 ">
            <h2>Administracion de tipos de Invitados</h2>
            <div>
              <form @submit.prevent="tipoI_send">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                    <input v-model="T_invitados_data.tipo_invitado_nombre" type="text" class="form-control"  aria-describedby="emailHelp">
                  </div>
                  <div class="mb-3" hidden>
                    <label for="exampleInputPassword1" class="form-label">Descripcion</label>
                    <input v-model="T_invitados_data.descripcion" type="text" class="form-control" >
                  </div>
                  <div class="d-flex justify-content-start">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                  </div>
              </form>
            </div>
          </div>
          <div class="col-12 col-sm-4 ">
            <div class="container-fluid mt-4">
              <form class="d-flex" role="search">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div v-if="P_invitados.TiposInvitados.length  !== 0"  class="row mt-3 edit_border pb-1" v-for="T_invitados in P_invitados.TiposInvitados">
              <div class="col-7">
                <p class="text_deporte">
                  {{ T_invitados.tipo_invitado_nombre }}
                  {{ T_invitados.tipo_invitado_id }}
                </p>
              </div>
              <div class="col-5 align-self-center">
                <div class="d-flex justify-content-center">
                  <button @click="TInvitado_update(T_invitados.tipo_invitado_nombre, T_invitados.tipo_invitado_id)" class="btn btn-primary me-1">
                      <i data-bs-toggle="modal" :data-bs-target="'#slug_'+T_invitados.tipo_invitado_id"  class="bi bi-pencil-square"></i>
                  </button>
                  <button  @click="TInvitado_delete(T_invitados.tipo_invitado_id)"  class="btn btn-danger">
                      <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <div class="modal fade" :id="'slug_'+T_invitados.tipo_invitado_id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            <label for="input1" class="form-label">Nombre:</label>
                            <input type="text" class="form-control" v-model="T_invitados_update.tipo_invitado_nombre" >
                          </div>
                          <div class="mb-3" hidden>
                            <label for="input2" class="form-label">Descripcion:</label>
                            <input type="text" class="form-control" v-model="T_invitados_update.descripcion" >
                          </div>
                          <button type="button" @click.prevent="edit_Invitado" class="btn btn-danger" >Editar</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div v-else class="mt-4">
              No hay tipos de invitados creados actualmente
            </div>
          </div>
        </div>
       </div> 
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