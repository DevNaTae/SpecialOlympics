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
//variables
const tiposInvitados = ref({});
const print_paginate_atleta= ref([]);
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
  await P_print_upload.get_paginateTipes();
  print_paginate_atleta.value = P_print_upload.print_unit
  // const primerObjeto = Object.values(tiposInvitados.value)[0];
  // first_id (primerObjeto.tipo_id)
  //llamada del qr

  modifySvgSizes();

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
const getImageUrl = (data) => {
  const baseUrl = P_print_upload.url;

  const imageUrl = data;
  return new URL(imageUrl, baseUrl).href;
};
const getQrUrl = (data) => {
  const baseUrl = P_print_upload.url;
  const imageUrl = data;
  return new URL(imageUrl, baseUrl).href;
};


//pdf
const cheked = ref(true);
const posiciones = ['arriba-izquierda', 'arriba-derecha', 'abajo-izquierda', 'abajo-derecha'];
const credencialesIndex = [1, 2, 3, 4, 5]; 
import jsPDF from 'jspdf';
import  html2pdf  from 'html2pdf.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generarPDF = async()=>{
  console.log('entre')
  //usar el locaStorage
  // const contenido = document.getElementById('contenidoParaPDF').innerHTML;
  // const docDefinition = {
  //   content: [
  //     { text: contenido }
  //   ]
  // };  
  // pdfMake.createPdf(docDefinition).open();


  // const pdf = new jsPDF();
  // const contenido = document.getElementById('contenidoParaPDF');
  // pdf.html(contenido, {
  //   callback: () => {
  //     // Guardar el PDF
  //     pdf.save('documento.pdf');
  //   }
  // });

  //este es el que mejor lo hace bien
  const contenido = document.getElementById('contenidoParaPDF');
  // await html2pdf()
  //   .from(contenido)
  //   .set({
  //     image: { type: 'jpeg', quality: 0.98 }, // Opcional: configuración de imagen
  //     filename: 'documento.pdf' // Nombre del archivo PDF
  //   })
  //   .save();
        var opt = {
            margin: 0,
            filename: 'time_sheet_report.pdf',
            image: { type: 'jpeg', quality: 0.20 },
            html2canvas: { scale: 2,useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
        };

        html2pdf().set(opt).from(contenido).save();


}
//modificar el qr
const svgContainers = ref([]);


function modifySvgSizes() {
  svgContainers.value =[];
  print_paginate_atleta.value.forEach((item, index) => {
    const parser = new DOMParser();
    const svgDocument = parser.parseFromString(item.qr, 'image/svg+xml');
    const svgElement = svgDocument.documentElement;

    // Modificar el ancho y alto del SVG
    svgElement.setAttribute('width', '80');
    svgElement.setAttribute('height', '150');
    svgContainers.value.push(svgElement);

  });
}
//paginacion
const currentPage = ref(1);
const goToPage = async(data)=>{
  currentPage.value = data;
  await P_print_upload.get_paginateTipes(currentPage.value);
  print_paginate_atleta.value = P_print_upload.print_unit
  modifySvgSizes()

}
const previousPage = async() => {
  // Ir a la página anterior si no estamos en la primera página
  if (currentPage.value > 1) {
    currentPage.value--;
    await P_print_upload.get_paginateTipes(currentPage.value);
    print_paginate_atleta.value = P_print_upload.print_unit
    modifySvgSizes()
    // Aquí puedes llamar a tu función para cargar los datos de la página
  }
};

const nextPage = async() => {
  // Ir a la página siguiente si no estamos en la última página
  if (currentPage.value < totalPages) {
    currentPage.value++;
    await P_print_upload.get_paginateTipes(currentPage.value);
    print_paginate_atleta.value = P_print_upload.print_unit
    modifySvgSizes()
    // Aquí puedes llamar a tu función para cargar los datos de la página
  }
};
</script>
<template>
  <!-- {{ P_print_upload.print_unit }} -->
  <!-- {{ P_print_upload.print_unit.url_image }} -->
  <div v-for="(paginate,index) in print_paginate_atleta">
    {{ paginate.url_image }}
  </div>
  <div v-for="(paginate,index) in print_paginate_atleta" class="border_y" hidden>
      <div class="border_v d-flex" v-if="svgContainers[index]">
        <div class="border_r " v-html="svgContainers[index].outerHTML"></div>
      </div>
  </div>


  
<div class="body_vue relleno_r" >
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
                      <h3>Pagina Actual:{{ currentPage }}</h3>
                      <h3>Pagina Siguiente:</h3>
                      <h3>Pagina final: {{ P_print_upload.pagina_final }}</h3>
                      <h3>En espera del procesar el siguiente doc qui poner un sweet alert</h3>
                    </div>

                  </div>
                  <div class="d-flex justify-content-center border_black">
                    <!-- paginacion -->
                    <button @click="previousPage" :disabled="currentPage === 1">
                      Anterior
                    </button>
                    <button v-for="pageNumber in P_print_upload.pagina_final" :key="pageNumber" @click="goToPage(pageNumber)">
                      {{ pageNumber }}
                    </button>
                    <button @click="nextPage" :disabled="currentPage === P_print_upload.pagina_final">
                      Siguiente
                    </button>
                  </div>

                </div>
                <div class="col-8 border_black" >
                  <div v-if="!cheked == true" class="base_edit_print d-flex justify-content-center align-items-center border_v">
                      <i class="bi bi-files font_print"></i>
                  </div>
                  <div class="border_v">

                  <div class="hoja-a4" id="contenidoParaPDF">
                    <img src="https://specialolimpics--production-jistoria.sierranegra.cloud/storage/images/oe._los_rios/amador_anderson_1207139005.jpg" class="imagen" style="top: 6.9em; left: 8.6em;">

                    <div v-for="(index, i) in print_paginate_atleta" :key="i" :class="`contenedor ${posiciones[i % 4]}`" >
                      <img :src="`https://specialolimpics--production-jistoria.sierranegra.cloud/`+index.url_image" class="imagen" style="top: 6.9em; left: 8.6em;">
                      <div class="texto medid_img" style="top: 29.9em; left: 11em; ">{{ index.name }}  {{ index.lastname }}</div>
                      <div class="texto medid_img" style="top: 31.5em; left: 11em; color:#2092d1;" >
                        DEPORTE: {{ index.sport }}
                      </div>
                      <div class="texto mb-2 medid_img" style="top: 33.5em; left: 11em; color:#2092d1;">
                        Evento:
                        <div class="d-flex justify-content-center ">
                          <div  class="me-2"  v-for="event in index.events">
                            <a >{{ event.activity }}</a>
                          </div>
                        </div>
                      </div>
                      <!-- <div v-html="index.qr" class="qr" style="top:27em; left: 19.7em;" hidden></div> -->
                      <div class=" d-flex qr"    v-if="svgContainers[i]" style="top:25em; left: 19.3em;" >
                        <div class="" v-html="svgContainers[i].outerHTML"></div>
                      </div>

                      <div class="texto2" style="top: 12.8em; left: 3em; color: white;">ATLETA</div>


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
.svg-container {
  width: 100px;
  height: 100px;
}


/* tarjeta */
.hoja-a4 {
            width: 210mm; /* Ancho de una hoja A4 */

            height: 296.3mm; /* Altura de una hoja A4 por defecto 297*/
            background-color: white; /* Color de fondo de la hoja */
            border: 0mm solid black; /* Borde para simular el borde de la hoja */
            margin: 20px auto; /* Margen para centrar la hoja en la página */
            position: relative; /* Posición relativa para los contenedores internos */
            overflow: hidden; /* Ocultar el contenido que se salga de la hoja */
            max-width: 210mm;
            max-height: auto;
            /* adicion mia */
            margin-top: 0;
        }

        /* Estilo para los contenedores internos */
        .contenedor {
            width: 50%; /* Cada contenedor ocupa el 50% del ancho de la hoja */
            height: 50%; /* Cada contenedor ocupa el 50% del alto de la hoja */
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
            bottom: 0px;
            left: 0px;
            
        }

        .abajo-derecha {
            bottom: 0px;
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
        .medid_img{
          width: 218px;
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