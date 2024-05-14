<script setup>
import C_Header from '../../components/C_Header.vue';
import C_footer from '../../components/C_Footer.vue';
import { C_print_upload } from '@/stores/Print_Credentials'
import { C_TiposInvitados } from '@/stores/CRUDS/Tipo_de_invitados';
import { C_Atletas } from '@/stores/CRUDS/Atleta';
import { Modal } from 'bootstrap';
import { ref,reactive,onMounted } from 'vue';

//pinias
const P_print_upload = C_print_upload()
const P_TiposInvitados = C_TiposInvitados()
const P_Atletas = C_Atletas();
//
const tiposInvitados = ref({});

onMounted( async()=>{
  const data = await P_TiposInvitados.get_TiposInvitados();
  P_TiposInvitados.TiposInvitados.forEach(tipo => {
    if (!tiposInvitados.value.hasOwnProperty(tipo.tipo_invitado_id)) {
    tiposInvitados.value[tipo.tipo_invitado_id] = {
      tipo_id: tipo.tipo_invitado_id,
      tipo_nombre: tipo.tipo_invitado_nombre,
      selected: false,
    }
  }  
  });
  // const primerObjeto = Object.values(tiposInvitados.value)[0];
  // first_id (primerObjeto.tipo_id)
})
const seleted_type = async(data)=>{
  console.log(data);
  for (const key in tiposInvitados.value) {
    tiposInvitados.value[key].selected = false;
  }
  tiposInvitados.value[data].selected = true;
  Modal.getInstance(document.getElementById('exampleModal')).hide();
  cheked.value = false;

}
const cheked = ref(true);
const posiciones = ['arriba-izquierda', 'arriba-derecha', 'abajo-izquierda', 'abajo-derecha'];
const credencialesIndex = [1, 2, 3, 4, 5]; // Índices de las credenciales

import jsPDF from 'jspdf';
import  html2pdf  from 'html2pdf.js';
const generarPDF = ()=>{
  console.log('entre')
  const contenido = document.getElementById('contenidoParaPDF');
  html2pdf()
    .from(contenido)
    .save();
}
</script>
<template>
<div class="body_vue">
        <div class="content_vue ">
            <C_Header></C_Header>
            <div class="container-fluid border_o mt-5 ">
              <div class="row">
                <div class="col-4 border_v">
                  <div class="border_y">
                    <h2>Opciones a Imprimir:</h2>
                    <div class="d-flex justify-content-center mb-2">
                      <button class="btn btn-primary me-2">
                        Atletas
                      </button>
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Invitados
                      </button>
                    </div>
                    <div class="border_o">
                      <button class="btn btn-info" @click="generarPDF">Generar PDF</button>
                      <h3>Pagina Actual:</h3>
                      <h3>Pagina Siguiente:</h3>
                      <h3>Pagina final:</h3>
                    </div>

                  </div>
                  <div class="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="col-8 border_black">
                  <div v-if="!cheked == true" class="base_edit_print d-flex justify-content-center align-items-center border_v">
                      <i class="bi bi-files font_print"></i>
                  </div>
                  <div class="border_v">

                  <div class="hoja-a4 mt-2" id="contenidoParaPDF">
                    <div v-for="(index, i) in credencialesIndex" :key="i" :class="`contenedor ${posiciones[i % 4]}`" >
                        <img src="../../assets/imgs/Yo.jpg" alt="Imagen" class="imagen" style="top: 6.9em; left: 8.6em;">
                        <div class="texto" style="top: 29.9em; left: 11em;">JOSE MARIA DE LAS MERCEDES LOURDES</div>
                        <div class="texto" style="top: 32.9em; left: 11em; color:#2092d1">DEPORTE: ATLETISMO</div>
                        <div class="texto2" style="top: 13em; left: 3em; color: white;">ATLETA</div>
                        <div class="texto2" style="top: 13em; left: -1.9em; color: white;"></div>
                        <img src="../../assets/imgs/Yo.jpg" alt="Imagen" class="qr" style="top:27em; left: 19.7em;">
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
    <!-- modal abajo -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Credenciales Seleccionado</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div v-for="tipoCredencial in tiposInvitados" :key="tipoCredencial.tipo_id" class="d-inline">
            <div>
                <div class="d-flex justify-content-between mt-2 mb-3">
                    {{ tipoCredencial.tipo_nombre }}
                    <div class="form-check">
                      <button class="btn btn-dark" @click="seleted_type(tipoCredencial.tipo_id)">
                        <i v-if="tipoCredencial.selected == false" class="bi bi-circle"></i>
                        <i v-else class="bi bi-check-circle-fill"></i>
                      </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>
<style scoped>
/* tarjeta */
.hoja-a4 {
            width: 210mm; /* Ancho de una hoja A4 */
            height: 297mm; /* Altura de una hoja A4 */
            background-color: white; /* Color de fondo de la hoja */
            border: 1px solid black; /* Borde para simular el borde de la hoja */
            margin: 20px auto; /* Margen para centrar la hoja en la página */
            position: relative; /* Posición relativa para los contenedores internos */
            overflow: hidden; /* Ocultar el contenido que se salga de la hoja */
            max-width: 210mm;
            max-height: auto;
        }

        /* Estilo para los contenedores internos */
        .contenedor {
            width: 50%; /* Cada contenedor ocupa el 50% del ancho de la hoja */
            height: 51%; /* Cada contenedor ocupa el 50% del alto de la hoja */
            border: 1px dashed gray; /* Borde punteado para los contenedores */
            box-sizing: border-box; /* Incluir el borde en el tamaño total del contenedor */
            position: absolute;
            background-size: cover; /* Posición absoluta para superponer los contenedores */
            background-image: url('../../assets/imgs/Card.jpg');
            overflow: hidden; /* Ocultar el contenido que se salga del contenedor */
            display: flex; /* Para centrar el texto verticalmente */
            justify-content: center; /* Para centrar el texto horizontalmente */
            align-items: center; /* Para centrar el texto verticalmente */
        }

        /* Estilos para cada cuadrante */
        .arriba-izquierda {
            top: 0;
            left: 0;
            
        }

        .arriba-derecha {
            top: 0;
            right: 0;
            
        }

        .abajo-izquierda {
            bottom: 0;
            left: 0;
            
        }

        .abajo-derecha {
            bottom: 0;
            right: 0;
            
        }

        .texto {
            position: absolute; /* Posición absoluta para poder mover el texto */
            color: black; /* Color del texto */
            font-size: 70%; /* Tamaño de fuente */
            font-weight: bold; /* Negrita */
            pointer-events: none; /* Evitar que el texto afecte los eventos del ratón */
            text-align: center; /* Justificar el texto al centro */
            width: 50%; /* Hacer que el texto ocupe todo el ancho del contenedor */
            font-family: "Montserrat Alternates", sans-serif;
            color: #8c2b92;
        }

        .texto2 {
            position: absolute; /* Posición absoluta para poder mover el texto */
            color: black; /* Color del texto */
            font-size: 40px; /* Tamaño de fuente */
            font-weight: bold; /* Negrita */
            pointer-events: none; /* Evitar que el texto afecte los eventos del ratón */
            text-align: center; /* Justificar el texto al centro */
            width: 50%; /* Hacer que el texto ocupe todo el ancho del contenedor */
            font-family: "GFS Neohellenic", sans-serif;
            color: #8c2b92;
        }

        .imagen {
            position: absolute; /* Posición absoluta para poder mover la imagen */
            pointer-events: auto; /* Permitir que la imagen afecte los eventos del ratón */
            max-width: 100%; /* Asegurar que la imagen no exceda el ancho del contenedor */
            max-height: 100%; /* Asegurar que la imagen no exceda el alto del contenedor */
            width: 10em;
            height: 10.3em;
            border-radius: 4.5vh;
        }

        .qr {
            position: absolute; /* Posición absoluta para poder mover la imagen */
            pointer-events: auto; /* Permitir que la imagen afecte los eventos del ratón */
            max-width: 100%; /* Asegurar que la imagen no exceda el ancho del contenedor */
            max-height: 100%; /* Asegurar que la imagen no exceda el alto del contenedor */
            width: 10.5vh;
            height: 10.5vh;
        }
/*  */
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
.base_edit_print{
  border: 5px solid red;
  width: auto;
  height: 70vh;
}
.font_print{
  font-size: 5.0rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>