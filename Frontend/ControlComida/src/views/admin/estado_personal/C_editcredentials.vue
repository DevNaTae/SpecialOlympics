<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';
import { C_Sportman } from '@/stores/CRUDS/Estado_personal';
import { C_TiposInvitados } from '@/stores/CRUDS/Tipo_de_invitados';
import { C_print_upload } from '@/stores/Print_Credentials'
import Swal from 'sweetalert2';
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
const route = useRoute()
const router = useRouter();
const P_estadoC= C_Sportman();
const P_print_upload = C_print_upload()
const id_invitado = ref('');
const P_TiposInvitados = C_TiposInvitados();

const provincia_seleccionada = ref('');
const tipo_invitado_seleccionado = ref('');

const query_credentials = reactive({
    cedula:'',
    nombre:'',
    apellido:'',
    edad:'',
    genero:'',
    activo:'',
    provincia_id:'',
    tipo_invitado_id:'',
    fecha_nacimiento:'',

})

const tiposInvitados = ref({});
const provincias = ref('');

onMounted(async()=>{
    const closeLoadingAlert = ShowLoading();
    const data = JSON.parse(route.query.Datos_deportista)
    query_credentials.cedula = data.cedula;
    query_credentials.nombre = data.nombre;
    query_credentials.apellido = data.apellido;
    query_credentials.edad = data.edad;
    query_credentials.genero = data.genero;
    query_credentials.activo = data.activo;
    id_invitado.value = data.invitado_id;
    query_credentials.provincia_id = data.provincia_id;
    query_credentials.tipo_invitado_id = data.tipo_invitado_id;
    query_credentials.fecha_nacimiento = data.fecha_nacimiento
    const datas = await P_TiposInvitados.get_TiposInvitados();
    P_TiposInvitados.TiposInvitados.forEach(tipo => {
        if (!tiposInvitados.value.hasOwnProperty(tipo.tipo_invitado_id)) {
        tiposInvitados.value[tipo.tipo_invitado_id] = {
        tipo_id: tipo.tipo_invitado_id,
        tipo_nombre: tipo.tipo_invitado_nombre,
        selected: false,
        }
    }  
    });
    await P_print_upload.get_provincia()
    provincias.value = P_print_upload.provincias;
    provincia_seleccionada.value = query_credentials.provincia_id;
    tipo_invitado_seleccionado.value = query_credentials.tipo_invitado_id;
    closeLoadingAlert();

})
const provincia_sett = ()=>{
  console.log('Valor seleccionado:', provincia_seleccionada.value);
  query_credentials.provincia_id = provincia_seleccionada.value;
} 
const tipo_invitado_sett = ()=>{
    query_credentials.tipo_invitado_id = tipo_invitado_seleccionado.value;
}
const credentials_update = async()=>{
    const closeLoadingAlert = ShowLoading();
    const data = await P_estadoC.put_personal(query_credentials, id_invitado.value)
    console.log(data);
    if(data.success == "false"){
        await Swal.fire({
            title: 'Error',
            text: data.error,
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
        return;
    }else{
        await Swal.fire({
        title: 'Invitado editado',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Entendido'
        });
        router.go(-1)
    }
    closeLoadingAlert()

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




</script>
<template>
    <div class="body_vue">
    <div class="content_vue">
        <C_Header></C_Header>
        <form class="mt-4" @submit.prevent="credentials_update">
            <div class="container">
                <h2>Tipo de Invitado:</h2>
                <div class="row ">
                    <div class="col-12 col-sm-3 base_dataEdit_top rounded ">
                        <div class="d-flex align-items-center" style="height: 100% ;">
                            <div  class="mx-auto">
                                <div class="d-flex justify-content-center">
                                    <i class="img_base_edit bi bi-person-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-9">
                        <div class=" base_dataEdit_top p-3 rounded">
                            <h2>Datos Pesonales:</h2>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                        <input v-model="query_credentials.nombre" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Apellido</label>
                                        <input v-model="query_credentials.apellido" type="text" class="form-control" id="exampleInputPassword1">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Edad</label>
                                        <input v-model="query_credentials.edad" type="number" min="0" class="form-control" id="exampleInputPassword1">
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                        <div class="mb-3">
                                            <label for="exampleInputPassword1" class="form-label">fecha de nacimiento</label>
                                            <input v-model="query_credentials.fecha_nacimiento" class="form-control" type="date" id="fecha" name="fecha">
                                        </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12  col-sm-6">
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Estado</label>
                                        <select v-model="query_credentials.activo" class="form-select" aria-label="Default select example">
                                            <option value="true">Activo</option>
                                            <option value="false">De baja</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Genero</label>
                                        <select v-model="query_credentials.genero" class="form-select" aria-label="Default select example">
                                            <option value="M">Masculino</option>
                                            <option value="F">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-12  col-sm-6 ">
                                    Provincia Seleccionada
                                    <select v-model="provincia_seleccionada" class="form-select" aria-label="Default select example" @change="provincia_sett">
                                        <option v-for="datos in provincias" :value="datos.provincia_id">
                                        {{ datos.provincia }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-12  col-sm-6 ">
                                    Tipo de invitado
                                    <select v-model="tipo_invitado_seleccionado" class="form-select" aria-label="Default select example" @change="tipo_invitado_sett">
                                        <option v-for="datos in tiposInvitados" :value="datos.tipo_id">
                                            {{ datos.tipo_nombre }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-info mb-3 mt-2">
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </form>
    </div>
    <footer class="footer_vue">
            <C_footer></C_footer>
    </footer>
</div>
</template>
<style>
.img_base_edit{
    border-radius: 50%;
    font-size: 8.5rem;
}
.base_dataEdit{
    border: 0px solid red;
    padding: 10px;
    border-radius: 5px;
    background: rgb(192, 189, 189); 
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);

}
.base_dataEdit_top{
    /* background: rgb(235, 229, 229);  */
    /* border-bottom: 0.1mm solid rgb(154, 149, 149); */
    background: rgb(235, 201, 201) !important;
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);


}

</style>