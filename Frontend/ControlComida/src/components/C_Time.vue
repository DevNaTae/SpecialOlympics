<script setup>
import { ref, onMounted } from 'vue';

const currentTime = ref('');

const updateTime = () => {
  const d = new Date();
  currentTime.value = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000); 
});
</script>
<template>
    <div class="d-flex justify-content-center">
        <h1>Hora actual:</h1>
    </div>
    <div class="d-flex justify-content-center">
        
        <h1>{{ currentTime }}</h1>
    </div>
</template>
<style>

</style>