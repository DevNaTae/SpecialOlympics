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
    title: "¿Se entregará el almuerzo? ¿Está seguro?",
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
  console.log(data);
  dataArray.value = data;
  console.log(dataArray.value.nombre)
  food_setting.url_image = dataArray.value.url_image;
  food_setting.nombre = dataArray.value.nombre;
  food_setting.apellido = dataArray.value.apellido;
  food_setting.genero = dataArray.value.genero;
  food_setting.activo = dataArray.value.activo;
  food_setting.completo =dataArray.value.almuerzos[0].completado;
  food_setting.cedula = dataArray.value.cedula;
  ///
  food_setting.almuerzo_id = dataArray.value.almuerzos[0].id 
  //hora de almuerzo
  food_setting.hora_inicio = dataArray.value.almuerzos[0].horario_comida.hora_inicio ;
  food_setting.hora_fin = dataArray.value.almuerzos[0].horario_comida.hora_fin;
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
        <div class="content_vue my-auto d-flex align-items-center">
            <div class="container-sm">
                <div class="row ">
                    <div class="col-12 pt-4">
                        <div class="container_food_data_top">
                            <div class="d-flex justify-content-between ">
                                <img class="img_logos" src="../../assets/imgs/Uleam.png">
                                <div >
                                    <i  class="bi bi-qr-code-scan" style="font-size: 4.0rem;" ></i>
                                </div>
                                <img class="img_logos" src="../../assets/imgs/olimpiadas_O.png">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-12 ">
                        <div class="container_food_data_middle p-5">
                            <!-- row image -->
                            <div class="row ">
                                <div class="col-12 col-sm-12 ">
                                    <div class="d-flex justify-content-center">
                                        <img v-if="food_setting.url_image === null" class="img_food_state " src="../../assets/imgs/Yo.jpg"> 
                                        <img v-else class="img_food_state " :src="`https://specialolimpics--production-jistoria.sierranegra.cloud/${food_setting.url_image}`"> 

                                    </div>
                                </div>
                            </div>
                            <!-- row info -->
                            <div class="row ">
                                <div>
                                    <h2 class="text-center">{{ food_setting.nombre }} {{ food_setting.apellido }}</h2>
                                </div>
                                <div>
                                </div>
                                <div class="col-12">
                                    <div>
                                        <div>
                                            <h2 class="text-center">Horar de comida:</h2>
                                            <p class="text-center">
                                                <p>{{ food_setting.hora_inicio }} -- {{ food_setting.hora_fin }} </p>
                                            </p>
                                            <h2 class="text-center">Almuerzo:</h2>
                                            <p class="text-center" v-if="food_setting.completo == true">
                                                <i class="font_size_data bi bi-check-circle-fill"></i>
                                            </p>
                                            <p class="text-center" v-else>
                                                <i class="font_size_data bi bi-x-circle-fill"></i>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-12  pb-4">
                        <div class="container_food_data_bottom">
                            <div class="d-flex justify-content-center pt-4">
                                <button v-if="food_setting.completo == true" class="btn btn-success mb-2" >
                                    Almuerzo entregado
                                </button>
                                <button v-else   @click="food_petition" class="btn btn-warning mb-2">
                                    Almuerzo no entregado
                                </button>
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
.font_size_data{
    font-size: 50px;
}
.container_food_data_top{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 100px;
    border-top: 0.1mm solid rgb(154, 149, 149);
    background: rgb(234, 228, 228) !important;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.605); 

}

.container_food_data_bottom{
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 100px;
    border-bottom: 0.1mm solid rgb(154, 149, 149);
    background: rgb(234, 228, 228) !important;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.605); 

}
.container_food_data_middle{
    background: rgb(183, 196, 163);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.605); 

}

.img_food_state{
    border: 5px solid rgb(236, 236, 236);
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
.img_logos{
    width: 80px;
    padding: 5px;
    height: 90px;
}
</style>