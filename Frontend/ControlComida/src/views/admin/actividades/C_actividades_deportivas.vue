<script setup>
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import { C_ActividadesD } from '@/stores/CRUDS/Activididades_deportivas'
import { C_Deportes } from '@/stores/CRUDS/Deportes';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap';

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

const storeAD = C_ActividadesD();
const storeD = C_Deportes();

onMounted(async () => {
    const closeLoadingAlert = ShowLoading();
    await storeD.get_Deportes();
    closeLoadingAlert();
});

async function getActividades(id){
  const closeLoadingAlert = ShowLoading();
  await storeAD.get_ActividadesD(id);
  closeLoadingAlert();
}

const selectedDeporte = ref(''); // Variable reactiva para almacenar el deporte seleccionado

// Función para mostrar el div cuando se seleccione un deporte
const showDeporteDiv = () => {
  // Lógica para mostrar el div correspondiente
};
const nombreActividad = ref('');
const descripcionActividad = ref('');

const nombreActividad2 = ref('');
const descripcionActividad2 = ref('');
const idActividad2 = ref('');

const setData = (nombre,descripcion,id)=>{
  
  nombreActividad2.value = nombre;
  descripcionActividad2.value = descripcion;
  idActividad2.value = id;
}

const submitForm = async () => {
  if (nombreActividad.value === '' || descripcionActividad.value === '') {
    await Swal.fire({
      title: 'Error',
      text: 'Por favor, rellena todos los campos',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
    return;
  }else{
    const closeLoadingAlert = ShowLoading();
    const message = await storeAD.post_ActividadesD({
      actividad: nombreActividad2.value,
      descripcion: descripcionActividad2.value,
      deporte_id: selectedDeporte.value.id   
    }, idActividad2.value);
    
    if(message.success == "false"){
      await Swal.fire({
        title: 'Error',
        text: message.error,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else if(!message.success){
      await Swal.fire({
        title: 'Error',
        text: "Nombre en uso",
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else{
      await storeAD.get_ActividadesD();
      await Swal.fire({
        title: 'Actividad creada',
        text: message.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
      
      closeLoadingAlert();
      
    }
  }
  
};
async function verInformacion(descripcion) {
  await Swal.fire({
    title: 'Descripción de la actividad',
    text: descripcion,
    confirmButtonText: 'Entendido'
  });
}
async function editarActividad() {
    const closeLoadingAlert = ShowLoading();
    const message = await storeAD.put_ActividadesD({
      actividad: nombreActividad2.value,
      descripcion: descripcionActividad2.value,
      deporte_id: selectedDeporte.value.id
    },idActividad2.value);
    if(message.success == "false"){
      await Swal.fire({
        title: 'Error',
        text: message.error,
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else if(!message.success){
      await Swal.fire({
        title: 'Error',
        text: "Nombre en uso",
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }else{
      await storeAD.get_ActividadesD();
      await Swal.fire({
        title: 'Actividad editada',
        text: message.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
      Modal.getInstance(document.getElementById('exampleModal_1')).hide();
      closeLoadingAlert();
    }
}

async function eliminarActividad(actividad_id) {
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
      const message = await storeAD.delete_ActividadesD(actividad_id);
      
      if(message.success == "false"){
        await Swal.fire({
          title: 'Error',
          text: message.error,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
        return;
      }else{
        await storeAD.get_ActividadesD();
        await Swal.fire({
          title: 'Actividad eliminada',
          text: message.message,
          icon: 'success',
          confirmButtonText: 'Entendido'
        });
        closeLoadingAlert();
      }
    }

  });
}


</script>
<template>

<div class="body_vue">
    <div class="content_vue">
        <C_Header></C_Header>
        <div class="container mt-4">
          <div class="row">
            <div class="col">
              <div class="main-container" v-if="storeD.deportes.length > 0">
                <div class="row mb-4">
                  <div class="col-md">
                    <div class="row">
                      <div class="col-md-4">
                          <h1>Selecciona un deporte:</h1>
                      </div>
                      <div class="col-md-6">
                          <select v-model="selectedDeporte" @change="getActividades(selectedDeporte.id)" class="form-select">
                              <option value="">Selecciona un deporte</option>
                              <option v-for="deporte in storeD.deportes" :key="deporte.deporte_id" :value="{ id: deporte.deporte_id, nombre: deporte.deporte }">{{ deporte.deporte }}</option>
                          </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="selectedDeporte !== ''">
                  <div class="row">
                    <!-- Título de la sección -->
                    <div class="col">
                      <h4>Administración de Actividades Deportivas</h4>
                    </div>
                  </div>
                  
                  <!-- Formulario -->
                  <form @submit.prevent="submitForm">
                    <div class="row">
                      <!-- Primera columna -->
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="nombre">Nombre</label>
                          <input type="text" id="nombre" v-model="nombreActividad" class="form-control">
                        </div>
                        <div class="form-group">
                          <label for="descripcion">Descripción</label>
                          <input type="text" id="descripcion" v-model="descripcionActividad" class="form-control">
                        </div>
                        <div class="form-group">
                          <label for="deporte">Deporte</label>
                          <input type="text" id="deporte" class="form-control" :placeholder="selectedDeporte.nombre" readonly>
                        </div>
                        <!-- Botón de envío -->
                        <div class="form-group mt-3">
                          <button type="submit" class="btn btn-primary" :disabled="nombreActividad === '' || descripcionActividad === ''">Guardar</button>
                        </div>
                      </div>

                      <!-- Segunda columna -->
                      
                      <div class="col-md-6 mt-4">
                        <div class="row">
                            <!-- Columna de iconos para cada actividad -->
                            <div class="col-12 mb-4" style="max-height: 400px; overflow-y: auto;">
                                <div v-if="storeAD.actividadesDeportivas.length === 0" class="text-center">
                                    <p>No hay ninguna activida deportiva creada.</p>
                                </div>
                                <div v-else>
                                    <div v-for="actividad in storeAD.actividadesDeportivas" :key="actividad.actividad_id" class="row align mb-3 border-bottom border-2" >
                                        <!-- Columna para el nombre de la actividad -->
                                        <div class="col">
                                            <p class="text-left">{{ actividad.actividad }}</p>
                                        </div>
                                        <!-- Columna para los iconos -->
                                        <div class="col">
                                            <div class="d-flex justify-content-end">
                                                <div class="mx-1"> <!-- Contenedor con margen -->
                                                    <!-- Icono de información -->
                                                    <button class="btn btn-info btn-sm" @click.prevent="verInformacion(actividad.descripcion)">
                                                        <i class="bi bi-info-circle"></i>
                                                    </button>
                                                </div>
                                                <div class="mx-1"> <!-- Contenedor con margen -->
                                                    <!-- Icono de edición -->
                                                    <button class="btn btn-primary btn-sm" @click.prevent="setData(actividad.actividad,actividad.descripcion,actividad.actividad_id)" data-bs-toggle="modal" data-bs-target="#exampleModal_1">
                                                        <i class="bi bi-pencil-square"></i>
                                                    </button>
                                                </div>
                                                <div class="mx-1"> <!-- Contenedor con margen -->
                                                    <!-- Icono de eliminación -->
                                                    <button class="btn btn-danger btn-sm" @click.prevent="eliminarActividad(actividad.actividad_id)">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- Si no hay deportes disponibles, mostrar este mensaje -->
              <div class="main-container" v-else>
                <h1 class="text-center">No hay deportes registrados, por favor cree alguno</h1>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal_1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="input1" class="form-label">Nombre:</label>
                  <input type="text" class="form-control" v-model="nombreActividad2" :placeholder="nombreActividad">
                </div>
                <div class="mb-3">
                  <label for="input2" class="form-label">Descripcion:</label>
                  <input type="text" class="form-control" v-model="descripcionActividad2" :placeholder="descripcionActividad">
                </div>
                <button type="button" class="btn btn-danger" @click.prevent="editarActividad">Editar</button>
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
.main-container h1 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Fuente */
  font-size: 20px; /* Tamaño de la fuente */
  color: #555; /* Color del texto */
  text-align: center; /* Alineación del texto */
  margin-top: 6px;
}
.main-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Fuente */
  font-size: 15px; /* Tamaño de la fuente */
  color: #555; /* Color del texto */
  padding: 20px; /* Espaciado interno */
  background-color: #f0f0f0; /* Color de fondo */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra */
}

.icon-buttons button {
  margin-right: 10px; /* Aumenta el espacio entre los botones */
}

/* Estilos para las actividades */
.activity-item {
  padding: 10px; /* Espaciado interno */
  border: 1px solid #ccc; /* Borde */
  border-radius: 5px; /* Bordes redondeados */
  margin-bottom: 10px; /* Espacio inferior entre las actividades */
}

/* Estilos para el nombre de la actividad */
.activity-name {
  font-weight: bold; /* Texto en negrita */
}

/* Estilos para los iconos de Bootstrap */
.bi {
  vertical-align: middle; /* Alinear verticalmente con el texto */
}

</style>