<script setup>
import Swal from 'sweetalert2';
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';
import { C_Almuerzo} from '@/stores/CRUDS/Almuerzo'
import { C_Atletas} from '@/stores/CRUDS/Atleta'
import { C_Sportman} from '@/stores/CRUDS/Estado_personal'
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

const storeAlmuerzo = C_Almuerzo();
const storeDeportista = C_Atletas();
const storeInvitado = C_Sportman();
const selectedUser = ref('');
const selectedDate = ref('');
const selectedTimeStart = ref('');
const selectedTimeEnd = ref('');
const showAssign = ref(false);
const showDelete = ref(false);
//pdf
const showExcel = ref(false);
const selectedDate_id = ref('');
const showAssignDiv = () => {
    showAssign.value = true;
    showDelete.value = false;
    showExcel.value = false;
    selectedUser.value = '';
    selectedDate.value = '';
    selectedTimeStart.value = '';
    selectedTimeEnd.value = '';
}
const showDeleteDiv = async () => {
    showAssign.value = false;
    showDelete.value = true;
    showExcel.value = false;
    selectedUser.value = '';
    selectedDate.value = '';
    selectedTimeStart.value = '';
    selectedTimeEnd.value = '';
    const closeLoadingAlert = ShowLoading();
    await storeAlmuerzo.getAlmuerzo();
    closeLoadingAlert();
}
const showExceldiv = ()=>{
    showExcel.value = !showExcel.value;
}
const deleteData = async (selectedUser,selectedDate) =>{
    const closeLoadingAlert = ShowLoading();
    switch (selectedUser){
        case '1':
            try{
                await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Eliminaras los almuerzos de deportistas del Dia '+selectedDate,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Asignar almuerzos',
                    cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                    const closeLoadingAlert = ShowLoading();
                    if (result.isConfirmed) {
                        const response = await storeAlmuerzo.deleteAlmuerzo({
                            horario_comida_id: selectedDate,
                            type: 1
                        });
                        if(response.success===true){
                            await storeAlmuerzo.getDateLunch();
                            await Swal.fire({
                                title: 'Almuerzos eliminados',
                                text: 'Se han eliminado los almuerzos correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            });

                        }else{  
                            await Swal.fire({
                                title: 'Error',
                                text: response.message,
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    }
                    closeLoadingAlert();
                });
            }catch(error){
                console.log(error);
            }
            break;
        case '2':
            try{
                await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Eliminaras los almuerzos de Invitados del Dia '+selectedDate,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Asignar almuerzos',
                    cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                    const closeLoadingAlert = ShowLoading();
                    if (result.isConfirmed) {
                        const response = await storeAlmuerzo.deleteAlmuerzo({
                            horario_comida_id: selectedDate,
                            type: 2
                        });
                        if(response.success===true){
                            await storeAlmuerzo.getDateLunch();
                            await Swal.fire({
                                title: 'Almuerzos eliminados',
                                text: 'Se han eliminado los almuerzos correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                        }else{
                            await Swal.fire({
                                title: 'Error',
                                text: response.message,
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    }
                    closeLoadingAlert();
                });
            }catch(error){
                console.log(error);
            }
            break;
    }
}
const setData = async (selectedUser,selectedDate, selectedTimeStart, selectedTimeEnd) => {
    const closeLoadingAlert = ShowLoading();
    switch(selectedUser){
        case '1':
            try {
                const response = await storeDeportista.get_deportistas();
                await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Asignaras almuerzos a '+response.length+' deportistas',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Asignar almuerzos',
                    cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                    const closeLoadingAlert = ShowLoading();
                    if (result.isConfirmed) {
                        const response2 =await storeAlmuerzo.postAlmuerzo({
                            array: response.map((atleta) => atleta.id),
                            horario_comida_id: selectedDate,
                            time_start: selectedTimeStart,
                            time_end: selectedTimeEnd,
                            type: 1
                        });
                        if(response2.success===true){
                            await Swal.fire({
                                title: 'Almuerzos asignados',
                                text: 'Se han asignado los almuerzos correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                        }else if(response2.usuarios_con_almuerzo.length>0){
                            await Swal.fire({
                                title: 'Error',
                                text: 'Algunos usuarios ya tienen asignado un almuerzo en este horario',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }else{
                            await Swal.fire({
                                title: 'Error',
                                text: response2.message,
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    }
                    closeLoadingAlert();
                });
                console.log(response)
            } catch (error) {
                console.log(error);
            }
            break;
        case '2':
            try {
                const response = await storeInvitado.get_personal();
                console.log(response)
                await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Asignaras almuerzos a '+response.length+' invitados',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Asignar almuerzos',
                    cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                    const closeLoadingAlert = ShowLoading();
                    if (result.isConfirmed) {
                        const response2 = await storeAlmuerzo.postAlmuerzo({
                            array: response.map((invitado) => invitado.invitado_id),
                            horario_comida_id: selectedDate,
                            type: 2
                        });
                        if(response2.success===true){
                            await Swal.fire({
                                title: 'Almuerzos asignados',
                                text: 'Se han asignado los almuerzos correctamente',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                        }else if(response2.usuarios_con_almuerzo.length>0){
                            await Swal.fire({
                                title: 'Error',
                                text: 'Algunos usuarios ya tienen asignado un almuerzo en este horario',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }else{
                            await Swal.fire({
                                title: 'Error',
                                text: response2.message,
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    }
                    closeLoadingAlert();    
                });
                
            } catch (error) {
                console.log(error);
            }
            break;

    }
}
onMounted(async () => {
    const closeLoadingAlert = ShowLoading();
    await storeAlmuerzo.getDateLunch();
    closeLoadingAlert();
});
const generarExcel = async ()=>{
    const closeLoadingAlert = ShowLoading();
    const data = await storeAlmuerzo.Excel_lunch(selectedDate_id.value);
    closeLoadingAlert();

}

</script>
<template>
    <div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>
            <div class="container mt-4">
                <div class="main-container mt-4 bordce">
                    <div class="row ">
                        <div class="col-6 ">
                            <div class="text-start mt-4">
                                <button @click="showExceldiv" class="btn btn-primary me-2">generarExcel</button>
                            </div>
                        </div>
                        <div class="col-6 ">
                            <div class="text-end mt-4">
                                <button @click="showAssignDiv" class="btn btn-primary me-2">Asignar</button>
                                <button @click="showDeleteDiv" class="btn btn-danger me-2">Eliminar</button>
                            </div>
                        </div>
                    </div>
                    <div class="row  mt-4" v-if="showExcel">
                        <div class="col-4">
                            Seleccione un horario a generar
                            <select v-model="selectedDate_id" class="form-select">
                                <option value="" disabled selected>Selecciona una fecha</option>
                                <option v-for="Dates in storeAlmuerzo.DateLunch" :key="Dates.id" :value="Dates.id">
                                    {{ Dates.fecha }} -- {{ Dates.horario }}
                                </option>
                            </select>
                        </div>
                        <div class="col-6">
                            <button @click="generarExcel()" class="btn btn-primary mt-4">Generar Excel</button>
                        </div>
                    </div>
                    <div v-if="showAssign">
                        <div class="container mt-4">
                            <div class="row mt-4">
                                <div class="col-md-4 p-2">
                                    <h1>Selecciona una fecha:</h1>
                                </div>
                                <div class="col-md-7">
                                    <div class="row">
                                        <div class="col-md-6 p-3">
                                            <select v-model="selectedDate" class="form-select">
                                                <option value="" disabled selected>Selecciona una fecha</option>
                                                <option v-for="Dates in storeAlmuerzo.DateLunch" :key="Dates.id" :value="Dates.id">
                                                    {{ Dates.fecha }} -- {{ Dates.horario }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="timeInicio">Hora de inicio:</label>
                                            <input type="time" id="timeInicio" v-model="selectedTimeStart" class="form-control">
                                        </div>
                                        <div class="col-md-3">
                                            <label for="timeFin">Hora de fin:</label>
                                            <input type="time" id="timeFin" v-model="selectedTimeEnd" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p v-if="selectedTimeStart > selectedTimeEnd" class="text-danger">La hora de fin debe ser mayor a la hora de inicio</p>
                        <div class="row mt-4" v-if="selectedDate !== '' && selectedTimeStart!=='' && selectedTimeEnd!=='' || selectedTimeStart < selectedTimeEnd">
                            <div class="col-md-4">
                                <h1>Asigna almuerzos:</h1>
                            </div>
                            <div class="col-md-6">
                                <select v-model="selectedUser" class="form-select">
                                    <option value="1" >Deportistas</option>
                                    <option value="2" >Invitados</option>
                                </select>
                                <div class="form-group mt-3">
                                    <button @:click="setData(selectedUser,selectedDate,selectedTimeStart,selectedTimeEnd)" class="btn btn-primary" :disabled=" selectedDate === '' || selectedUser=== ''">Asignar almuerzo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="showDelete">
                        <div  class="scrollable-div col-md-6">
                            <div class="col-md-6">
                                <h1>Selecciona una fecha:</h1>
                            </div>
                            
                            <div class="col-md-8">
                                <select v-model="selectedDate" class="form-select">
                                    <option value="" disabled selected>Selecciona una fecha</option>
                                    <option v-for="Dates in storeAlmuerzo.DateLunch" :key="Dates.id" :value="Dates.id">{{ Dates.horario }} -- {{Dates.hora_inicio}}-{{Dates.hora_fin}}</option>
                                </select>
                            </div>
                            <div class="col mt-4" v-if="selectedDate !== ''">
                                <div class="col-md-6">
                                    <h1>Selecciona usuario:</h1>
                                </div>
                                <div class="col-md-8">
                                    <select v-model="selectedUser" class="form-select">
                                        <option value="1" >Deportistas</option>
                                        <option value="2" >Invitados</option>
                                    </select>
                                    <div class="form-group mt-3 ">
                                        <button @:click="deleteData(selectedUser,selectedDate)" class="btn btn-danger" :disabled=" selectedDate === '' || selectedUser=== ''">Eliminar almuerzo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  class="scrollable-div col-md-6">
                            <div class="col">
                                <div class="col-md" v-for="almuerzos in storeAlmuerzo.almuerzos" :key="almuerzos.id">
                                    <div class="row">
                                        <div class="col-md mt-3">
                                            <p>{{ almuerzos.id }}</p>
                                        </div>
                                        <div class="col-md mt-3">
                                            <p v-if="almuerzos.deportista_id">Deportista</p>
                                            <p v-else-if="almuerzos.invitado_id">Invitado</p>
                                        </div>
                                        <div class="col-md mt-3">
                                            <p v-if="almuerzos.horario_comida_id == 1">Dia 1</p>
                                            <p v-if="almuerzos.horario_comida_id == 2">Dia 2</p>
                                            <p v-if="almuerzos.horario_comida_id == 3">Dia 3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
.scrollable-div {
    max-height: 400px; /* Establece la altura máxima a partir de la cual se aplicará el scroll */
    overflow-y: auto; /* Agrega scroll vertical cuando los items exceden la altura máxima */
}
</style>