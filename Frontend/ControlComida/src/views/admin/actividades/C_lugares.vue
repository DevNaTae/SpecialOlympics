<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { onMounted } from 'vue';
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import { C_Lugares } from '@/stores/CRUDS/Lugares'
const P_lugar = C_Lugares()
onMounted(async()=>{
  const closeLoadingAlert = ShowLoading();
  P_lugar.get_Lugares();
  closeLoadingAlert();

})

const lugar_data = reactive({
  nombre:'',
  descripcion:'',
})
const id_lugar = ref('')
const lugar_data_update = reactive({
  nombre:'',
  descripcion:'',
})
const lugar_send = async()=>{
  if(lugar_data.nombre === '' || lugar_data.descripcion === ' '){
    await Swal.fire({
      title: 'Error',
      text: 'Por favor, rellena todos los campos',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
    return;
  }else{
    const closeLoadingAlert = ShowLoading();
    const data =await P_lugar.post_Lugares(lugar_data)
    if(data.success == 'false'){
      await Swal.fire({
        title: 'Error',
        text: data.error,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else{
      await P_lugar.get_Lugares();
      await Swal.fire({
        title: 'Lugar Creado',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
      
      closeLoadingAlert();
    }
  }

}
const lugar_update =(name, descripcion, id)=>{
  lugar_data_update.nombre = name;
  lugar_data_update.descripcion = descripcion;
  id_lugar.value = id
}
const edit_lugar = async()=>{
  const closeLoadingAlert = ShowLoading();
  const data = await P_lugar.put_Lugares(lugar_data_update,id_lugar.value)
  if(data.success == "false"){
      await Swal.fire({
        title: 'Error',
        text: data.error,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else{
      await P_lugar.get_Lugares();
      await Swal.fire({
        title: 'Lugar editado',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
      Modal.getInstance(document.getElementById(`slug_${id_lugar.value}`)).hide();
      closeLoadingAlert();
    }
}
const lugar_delete = async(id)=>{
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
      const message =  await P_lugar.dismiss_Lugares(id);
      
      if(message.success == "false"){
        await Swal.fire({
          title: 'Error',
          text: message.error,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
        return;
      }else{
        P_lugar.get_Lugares();
        await Swal.fire({
          title: 'Lugar eliminado',
          text: message.message,
          icon: 'success',
          confirmButtonText: 'Entendido'
        });
        closeLoadingAlert();
      }
    }

  });
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
async function verInformacion(descripcion) {
  await Swal.fire({
    title: 'Descripción de la actividad',
    text: descripcion,
    confirmButtonText: 'Entendido'
  });
}



</script>
<template>

<div class="body_vue">
    <div class="content_vue">
        <C_Header></C_Header>
        <div class="container   mt-4 p-4">
          <div class="row main-container">
            <div class="col-12 col-sm-8 ">
              <h2>Administracion de Lugares</h2>
              <div >
                <form @submit.prevent="lugar_send">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                    <input v-model="lugar_data.nombre" type="text" class="form-control"  aria-describedby="emailHelp">
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Descripcion</label>
                    <input v-model="lugar_data.descripcion" type="text" class="form-control" >
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
              <div v-if="P_lugar.lugares !== null" class="row mt-3 edit_border pb-1" v-for="lugares in P_lugar.lugares">
                 <div  class="col-7">
                  <p class="text_deporte">
                    {{ lugares.nombre }}
                  </p>
                 </div>
                 <div  class="col-5 col align-self-center">
                  <div class="d-flex justify-content-center">
                    <button @click.prevent="verInformacion(lugares.descripcion)" class="btn btn-info me-1">
                      <i   class="bi bi-info-circle"></i>
                    </button>
                    <button @click="lugar_update(lugares.nombre, lugares.descripcion, lugares.lugar_id)" class="btn btn-primary me-1">
                      <i data-bs-toggle="modal" :data-bs-target="'#slug_'+lugares.lugar_id"  class="bi bi-pencil-square"></i>
                    </button>
                    <button  @click="lugar_delete(lugares.lugar_id)"  class="btn btn-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                 </div>
                 <!-- modal -->
                 <div class="modal fade" :id="'slug_'+lugares.lugar_id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="mb-3">
                            <label for="input1" class="form-label">Nombre:</label>
                            <input type="text" class="form-control" v-model="lugar_data_update.nombre" >
                          </div>
                          <div class="mb-3">
                            <label for="input2" class="form-label">Descripcion:</label>
                            <input type="text" class="form-control" v-model="lugar_data_update.descripcion" >
                          </div>
                          <button type="button" @click.prevent="edit_lugar" class="btn btn-danger" >Editar</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div v-else>
                <h2 class="text-center">No hay lugares creados actualmente</h2>
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
.text_deporte::first-letter{
  text-transform: uppercase;
}
.edit_border{
  border-bottom: 1px solid rgb(24, 11, 11);
  margin-bottom: 20px;
}

</style>