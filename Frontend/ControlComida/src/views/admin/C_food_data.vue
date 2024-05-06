<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { C_print_upload } from '@/stores/Print_Credentials';
import { reactive } from 'vue';
import Swal from 'sweetalert2';
const C_credentriasl = C_print_upload();
const route = useRoute()
const router = useRouter();
const dataArray = ref([]);

const food_petition = async () => {
  // Mostrar el diálogo de confirmación
  const result = await Swal.fire({
    title: "Este deportista comera, esta seguro?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Si",
    denyButtonText: "No"
  });


  // Verificar si el usuario confirmó
  if (result.isConfirmed) {
    const loadingAlert = Swal.fire({
        title: 'Cargando...',
        html: '<div class="spinner-border text-primary mt-2 mb-2"></div>',
        allowOutsideClick: false, // Evitar que el usuario cierre la alerta haciendo clic fuera de ella
        showConfirmButton: false // No mostrar el botón de confirmación mientras se está cargando
    });
    try {
      // Realizar la petición a la API y esperar a que se resuelva
      const data = await C_credentriasl.food_promise(food_setting.almuerzo_id);
      loadingAlert.close();
      // Verificar el resultado de la petición
      if (data == true) {
        Swal.fire({
             icon: "success",
             title:'Registro Exitosamente',
             allowOutsideClick: false, // Evitar que el usuario cierre la alerta haciendo clic fuera de ella
             showConfirmButton: false // No mostrar el botón de confirmación mientras se está cargando 
        });
        setTimeout(() => {
            router.push({ name: 'C_status' });
        }, 2000);
      } else {
        console.log(data);
        Swal.fire('Error', data , 'error');
      }
    } catch (error) {
        loadingAlert.close();

      // Si hubo un error en la petición, mostrar un mensaje de error
      Swal.fire('Error', 'Hubo un error al realizar la acción', 'error');
    }
  }
};
const food_setting = reactive({
    url_image:'',
    nombre:'',
    apellido:'',
    genero:'',
    activo:'',
    completo:'',
    cedula:'',
    hora_inicio:'',
    hora_fin:'',
    almuerzo_id:'',
})

onMounted(() => {
  //console.log(route.query.Datos_deportista)
  const data = JSON.parse(route.query.Datos_deportista)
  //console.log(data);
  dataArray.value = data;
  food_setting.url_image = dataArray.value.deportista.url_imagen;
  food_setting.nombre = dataArray.value.deportista.nombre;
  food_setting.apellido = dataArray.value.deportista.apellido;
  food_setting.genero = dataArray.value.deportista.genero;
  food_setting.activo = dataArray.value.deportista.activo;
  food_setting.completo =dataArray.value.deportista.almuerzos[0].completado;
  food_setting.cedula = dataArray.value.deportista.cedula;
  ///
  food_setting.almuerzo_id = dataArray.value.deportista.almuerzos[0].id
  food_setting.hora_inicio = dataArray.value.deportista.almuerzos[0].hora_inicio ;
  food_setting.hora_fin = dataArray.value.deportista.almuerzos[0].hora_fin;
});
</script>
<template>
    <div class="body_vue">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid justify-content-end">
                <div>
                    <RouterLink :to="{name: 'C_status'}">
                        <button class="btn btn-success">
                            <i class="bi bi-arrow-90deg-left"></i>
                        </button>
                    </RouterLink>
                </div>
            </div>
        </nav>
        <div  class="content_vue my-auto d-flex align-items-center p-4 " >
            <div class="container">
                <div class="row  p-3 background_set border_sett_top" >
                    <div class="col-6 col-sm-4 ">
                        <div class="d-flex justify-content-center ">
                            <img class="img_food_state " :src="`http://127.0.0.1:8000/storage/${food_setting.url_image}`"> 
                        </div>
                    </div>
                    <div class="col-6 col-sm-8 ">
                        <div>
                            <h2>Nombre y apellidos:</h2>
                            <p>{{ food_setting.nombre }} {{ food_setting.apellido }}</p>
                        </div>
                        <div>
                            <h2>Genero</h2>
                             <!-- aqui debo hacer iconos de hombre y mujer  -->
                            <p>{{ food_setting.genero }}</p>
                            <h2>Estado</h2>
                            <div>
                                <p v-if=" food_setting.activo == true">
                                    Activo
                                </p>
                                <p v-else>
                                    De baja
                                </p>
                            </div>
                           <!-- aqui debo poner si es true o false el estado  -->
                        </div>
                    </div>
                </div>
                <div class="row  background_set border_sett_bottom">
                        <div class="col-12">
                            <div>
                                <div>
                                <h2 class="mb-4">Horarios de comida:</h2>
                                <p>{{ food_setting.hora_inicio }} -- {{ food_setting.hora_fin }} </p>
                                <div class="d-flex justify-content-between">
                                    <p>
                                        Almuerzo:
                                    </p>
                                    <button v-if="food_setting.completo == false" @click="food_petition" class="btn btn-success mb-2" >
                                        No ha comido
                                    </button>
                                    <button v-else  class="btn btn-warning mb-2">
                                        Ya comio
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div> 
    </div>
<!-- La pagina a la que va despues del scanner -->

</template>
<style scoped>
.img_food_state{
    border-radius: 50%;
    width: 180px;
    height: 200px;
    padding: 0;
    margin-left: -5px;
    
}
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
.img_state{
    border: 5px solid lightblue;
    padding: 10px;
    border-radius: 15px;
    background: lightblue;
}
.config_data{
    padding: 40px !important;
}
.background_set{
    background: lightblue;
}
.border_sett_top{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
.border_sett_bottom{
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}
</style>