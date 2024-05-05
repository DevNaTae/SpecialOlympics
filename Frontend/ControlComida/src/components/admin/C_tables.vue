<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue';
// Define la prop datoRecibido
const props = defineProps({
  datoRecibido: String // Aquí debes especificar el tipo de dato que esperas recibir
});

// Usa la prop datoRecibido según sea necesario
const datoRecibido = ref(props.datoRecibido);

</script>
<template>
    <!-- debo hacer un load mientras se pide la peticion -->
    <div class="container mt-3">
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre</th>
                <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td><img width="60" height="60" src="../../assets/imgs/placeholder.png"></td>
                    <td class="b">
                        <p class="name_ajust ">
                            Nombre al azar completo demasiado completo demasido completo
                        </p>
                    </td>
                    <td>
                        <div class="d-inline">
                            <button  v-if="false">
                                <i class="bi bi-person-check "></i>
                            </button>
                            <button v-if="false">
                                <i class="bi bi-person-down"></i>
                            </button>
                            <button class="button_icon_status">
                                <i class="bi bi-screwdriver color_wicon"></i>
                            </button>
                            <button v-if="false">
                                <i class="bi bi-person-fill-check"></i>
                            </button>
                            <button class="button_icon_status color_wicon">
                                <i class="bi bi-person-fill-x" ></i>
                            </button>
                        </div>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

</template>
<style>
.name_ajust {
    white-space: normal; 
    word-wrap: break-word; 
}
.button_icon_status{
    padding: 10px;
    margin-left: 10px;
    margin-top: 5px;
    border-radius: 5px;
    background: black;
}
.color_wicon{
    color: azure;
    font-size: 1.5rem;
}
</style>