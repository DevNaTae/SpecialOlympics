<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');

const updateTime = () => {
  const d = new Date();
  currentTime.value = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};
//dias de la semana y mess
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const diaSemana = ref('');
const diaMes = ref('');
const mes = ref('');

// Función para obtener el día de la semana y del mes actual
const obtenerDiaYMesActual = () => {
  const fecha = new Date();
  const diaSemanaIndex = fecha.getDay();
  diaSemana.value = diasSemana[diaSemanaIndex];
  diaMes.value = fecha.getDate();
  mes.value = meses[fecha.getMonth()];
};
const intervalId = setInterval(obtenerDiaYMesActual, 1000);
// Limpiar el intervalo cuando el componente se desmonte
onUnmounted(() => {
  clearInterval(intervalId);
});
//el mounted
onMounted(() => {
  updateTime();
  obtenerDiaYMesActual();

  setInterval(updateTime, 1000); 
});

</script>
<template>
    <div class="d-flex justify-content-center">    
    
        <div class="hours_see">
          <h1>{{ diaSemana }}, {{ diaMes }} de {{ mes }}</h1>
          <div class="d-flex justify-content-center">
            <h1>{{ currentTime }}</h1>
          </div>
        </div>
    </div>
</template>
<style>
.hours_see{
  background: green;
  padding: 10px;
  border-radius: 10px;
  color: white;
}
</style>