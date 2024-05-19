<script setup>
import Swal from 'sweetalert2';
import C_Header from '../../components/C_Header.vue';
import C_footer from '../../components/C_Footer.vue';
import { C_print_upload } from '@/stores/Print_Credentials'
import { C_TiposInvitados } from '@/stores/CRUDS/Tipo_de_invitados';
import { C_Atletas } from '@/stores/CRUDS/Atleta';
import { Modal } from 'bootstrap';
import { ref,reactive,onMounted,watch } from 'vue';

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
//sweetes alert
const ShowLoading = () => {
  const loadingAlert = Swal.fire({
    title: 'Procesando...',
    html: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>',
    showConfirmButton: false,
    allowOutsideClick: false, 
  });

  const CloseLoading = () => {
    Swal.close(); // Cerramos la instancia de SweetAlert2
  };

  return CloseLoading;
};
const ShowSuccess = ()=>{
    Swal.fire({
        icon: "success",
        title: 'PDFs Generados: ' + currentPage.value,
        allowOutsideClick: false, // Evitar que el usuario cierre la alerta haciendo clic fuera de ella
        showConfirmButton: false, // No mostrar el botón de confirmación mientras se está cargando
        timer: 4000,

    })
}
const Show_end=()=>{
  Swal.fire({
        icon: "success",
        title: 'Descarga por lote completada' ,
        allowOutsideClick: false, // Evitar que el usuario cierre la alerta haciendo clic fuera de ella
        showConfirmButton: false, // No mostrar el botón de confirmación mientras se está cargando
        timer: 4000,

    })
}
const ShowError = () =>{
    Swal.fire({
        icon:'error',
        title: 'Error al intentar hacer un documento',
        timer: 3000,
    })
}
const ShowLoading_wait = () => {
  const loadingAlert = Swal.fire({
    title: 'En espera ',
    html: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>',
    showConfirmButton: false,
    allowOutsideClick: false, 
  });

  const CloseLoading = () => {
    Swal.close(); // Cerramos la instancia de SweetAlert2
  };

  return CloseLoading;
};


//
const select_print = ref('')
//traer invitados
const get_paginate_invitados = async()=>{
  
  await P_print_upload.get_paginate_TiposInvitados();
  print_paginate_atleta.value = P_print_upload.print_unit
  modifySvgSizes();
  select_print.value = 'Invitados'
  currentPage.value = 1;
  next_page.value = 2;
  predit.value = 0;
}
//traer Atletas
const get_paginate_atletas = async()=>{
  await P_print_upload.get_paginateTipes(1);
  print_paginate_atleta.value = P_print_upload.print_unit
  modifySvgSizes();
  select_print.value = 'Atletas'
  currentPage.value = 1;
  next_page.value = 2;
  predit.value = 0;

}
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

const pdfGenerado = ref(false);
const generarPDF = async()=>{
        if(lotes_limit.value === 0){
          Swal.fire({
              icon:'error',
              title: 'No puede ser 0 la impresion de lotes',
              timer: 3000,
          })
          return
        }
        const closeLoadingAlert = ShowLoading();
        const contenido = document.getElementById('contenidoParaPDF');
        var opt = {
            margin: 0,
            filename: 'lotes.pdf',
            image: { type: 'jpeg', quality: 0.20 },
            html2canvas: { scale: 2,useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
        };
        pdfGenerado.value = false;

        await html2pdf().set(opt).from(contenido).save();

        pdfGenerado.value = true;
}
const contador = ref(0)
const lotes_limit= ref(1)
//validar el contador de lotes_limit
const validarNumero = (event) => {
  const input = event.target;
  let valor = input.value.trim();
  // Reemplazar comas por puntos para asegurar el formato decimal correcto
  valor = valor.replace(',', '.');
  // Validar si el valor es un número positivo
  if (isNaN(valor) || valor < 0) {
    input.value = '';
    lotes_limit.value = 0;
  } else if(valor > P_print_upload.pagina_final){
    input.value = P_print_upload.pagina_final;
    lotes_limit.value = P_print_upload.pagina_final;
  }else{
    lotes_limit.value = parseFloat(valor);
  }

}

watch(pdfGenerado, (nuevoEstado) => {
  if (nuevoEstado) {
    ShowSuccess();
    const timeoutId = setTimeout(()=>{
        if(contador.value === lotes_limit.value){
          contador.value = 0;
          Show_end();
      }else{
          nextPage();
          contador.value++
          if(contador.value === lotes_limit.value){
            contador.value = 0;
            Show_end();
            return
          }else{
            const timeoutId_1 = setTimeout(()=>{
              const closeLoadingAlert = ShowLoading_wait();
              generarPDF();
            }, 3000)
          }
      }
    }, 5000)
  } else {
    console.log('Generando PDF...');
  }
});
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
const next_page = ref(2);
const predit = ref(0);
const goToPage = async(data)=>{
  currentPage.value = data;
  predit.value= currentPage.value + 1;
  next_page.value=predit.value;
  if(select_print.value == 'Invitados'){
    await P_print_upload.get_paginate_TiposInvitados(currentPage.value);
  }
  if(select_print.value == 'Atletas'){
    await P_print_upload.get_paginateTipes(currentPage.value);
  }
  print_paginate_atleta.value = P_print_upload.print_unit
  modifySvgSizes()


}
const previousPage = async() => {
  // Ir a la página anterior si no estamos en la primera página
  if (currentPage.value > 1) {
    currentPage.value--;
    predit.value= currentPage.value - 1;
    next_page.value=predit.value;

    if(select_print.value == 'Invitados'){
      await P_print_upload.get_paginate_TiposInvitados(currentPage.value);
      print_paginate_atleta.value = P_print_upload.print_unit
    }
    if(select_print.value == 'Atletas'){
      await P_print_upload.get_paginateTipes(currentPage.value);
      print_paginate_atleta.value = P_print_upload.print_unit
    }
    modifySvgSizes()

  }

};

const nextPage = async() => {
  // Ir a la página siguiente si no estamos en la última página
  console.log(select_print.value);
    if (currentPage.value < P_print_upload.pagina_final) {
      currentPage.value++;

      predit.value= currentPage.value + 1;
      next_page.value=predit.value;

      if(select_print.value == 'Invitados'){
        await P_print_upload.get_paginate_TiposInvitados(currentPage.value);
        print_paginate_atleta.value = P_print_upload.print_unit
      }
      if(select_print.value == 'Atletas'){
        await P_print_upload.get_paginateTipes(currentPage.value);
        print_paginate_atleta.value = P_print_upload.print_unit
      }
      modifySvgSizes()


    }

};
</script>
<template>
  <div v-for="(paginate,index) in print_paginate_atleta" hidden>
    {{ paginate.url_image }}
  </div>
  <div v-for="(paginate,index) in print_paginate_atleta" class="border_y" hidden>
      <div class="border_v d-flex" v-if="svgContainers[index]">
        <div class="border_r " v-html="svgContainers[index].outerHTML"></div>
      </div>
  </div>


  
<div class="body_vue relleno_r" style="background-color: white;"> <!--bloque general, fondo de ventana generar PDF-->
        <div class="content_vue ">  <!--the same-->
            <C_Header></C_Header>
            <div class="container-fluid mt-5 " style="width: 95%; margin-bottom: 2em; padding:2em; box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5); border-radius: 1em; "><!--bloque anaranjado exterior-->
              <div class="row">

<!--inicio del cuadro de opciones-->                
              <!-- <div class="cuadro-izquierdo">   -->
                <div class="col-4 border_v" style="border: 5px; padding-right: 2em;"><!--cuadro morado izquierdo-->
                  <div class="border_y" style="border: 0px;"> <!--cuadro amarillo izquierdo-->
                    <h2 style="border-bottom: 2px solid black; padding-bottom: 10px;">Opciones a imprimir:</h2>
                    
                    <div class="botones-primeros">
                    <div class="d-flex justify-content-center mb-2">
                      <button @click="get_paginate_atletas"  class="btn btn-primary me-2">
                        Atletas
                      </button>
                      <button @click="get_paginate_invitados" type="button" class="btn btn-primary" >
                        Invitados
                      </button>
                    </div>
                    </div>
                    
                    <div v-if="select_print !== ''" class="border_o" style="border: 0px;"> <!--bloque anaranjado izquierdo-->
                      <div class="d-flex mt-2 mb-2">
                        <button class="btn btn-info" @click="generarPDF">Generar PDF</button>
                      </div>
                      <h5>
                          <p>Rango de lotes</p>
                          <input @input="validarNumero" v-model="lotes_limit" type="number" class="input_edit_print rounded" min="1" :max="P_print_upload.pagina_final"> 
                      </h5>
                      <h3>Pagina Actual:{{ currentPage }}</h3>
                      <h3>Pagina Siguiente: {{ next_page }}</h3>
                      <h3>Pagina final: {{ P_print_upload.pagina_final }}</h3>
                    </div>

                  </div>
                  <div v-if="select_print !== ''" class="d-flex justify-content-center border_black" style="border: 0px;"><!--cuadro negro izquierdo-->
                    <!-- paginacion -->
                    <button @click="previousPage" :disabled="currentPage === 1" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                      Anterior
                    </button>
                    <button v-for="pageNumber in P_print_upload.pagina_final" :key="pageNumber" @click="goToPage(pageNumber)">
                      {{ pageNumber }}
                    </button>
                    <button @click="nextPage" :disabled="currentPage === P_print_upload.pagina_final" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                      Siguiente
                    </button>
                  </div>
                </div>
              <!-- </div> -->
<!--fin del cuadro de opciones-->


<!--inicio del cuadro de impresion-->
              <!-- <div class="cuadro-derecho"> -->
                <div class="col-8" style="border-left: 2px solid black;"><!--bloque negro derecho-->
                  <div v-if="select_print == ''" class="base_edit_print d-flex justify-content-center align-items-center border_v">
                      <i class="bi bi-files font_print"></i>
                  </div>
                  <div class="border_v" style="border: 0px;"><!--bloque morado derecho-->

                  <div class="hoja-a4" v-if="select_print == 'Atletas'" id="contenidoParaPDF">
                    <img src="https://specialolimpics--production-jistoria.sierranegra.cloud/storage/images/oe._los_rios/amador_anderson_1207139005.jpg" class="imagen" style="top: 6.9em; left: 8.6em;">

                    <div v-for="(index, i) in print_paginate_atleta" :key="i" :class="`contenedor ${posiciones[i % 4]}`" style="border: 0px;" >
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

                      <div class="texto2" style="top: 17.2em; left: 2em;">ATLETA</div>
                    </div>
                  </div>
                  <div  v-if="select_print == 'Invitados'" class="hoja-a4" id="contenidoParaPDF" >
                    <img src="https://specialolimpics--production-jistoria.sierranegra.cloud/storage/images/oe._los_rios/amador_anderson_1207139005.jpg" class="imagen" style="top: 6.9em; left: 8.6em;">

                    <div v-for="(index, i) in print_paginate_atleta" :key="i" :class="`contenedor ${posiciones[i % 4]}`" style="border: 0px;" >
                      <img :src="`https://specialolimpics--production-jistoria.sierranegra.cloud/`+index.url_imagen" class="imagen" style="top: 6.9em; left: 8.6em;">
                      <div class="texto medid_img" style="top: 29.9em; left: 11em; ">{{ index.nombre }}  {{ index.apellido }}</div>

                      <div class="texto mb-2 medid_img" style="top: 34.5em; left: 11em; color:#2092d1;">
                        Cedula:
                        {{ index.cedula }}
                      </div>
                      <div class="texto mb-2 medid_img" style="top: 32.5em; left: 11em; color:#2092d1;">
                        {{ index.provincia }}
                      </div>
                      <!-- <div v-html="index.qr" class="qr" style="top:27em; left: 19.7em;" hidden></div> -->
                      <div class=" d-flex qr"    v-if="svgContainers[i]" style="top:25em; left: 19.3em;" >
                        <div class="" v-html="svgContainers[i].outerHTML"></div>
                      </div>

                      <div class="texto2" style="top: 17.2em; left: 2em;">
                        <a>{{ index.tipo_invitado }}</a>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              <!-- </div> -->
<!--fin del cuadro de impresion-->



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
            border: 0px solid black; /* Borde para simular el borde de la hoja */
            margin: 0px auto; /* Margen para centrar la hoja en la página */
            position: relative; /* Posición relativa para los contenedores internos */
            overflow: hidden; /* Ocultar el contenido que se salga de la hoja */
            max-width: 210mm;
            max-height: auto;
            /* adicion mia */
            margin-top: 0;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
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
            color: rgb(255, 255, 255); /* Color del texto */
            font-size: 30px; /* Tamaño de fuente */
            font-weight: bold; /* Negrita */
            pointer-events: none; /* Evitar que el texto afecte los eventos del ratón */
            text-align: center; /* Justificar el texto al centro */
            width: 80%; /* Hacer que el texto ocupe todo el ancho del contenedor */
            font-family: "GFS Neohellenic", sans-serif;
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

        .botones-primeros{
          display: flex;
          justify-items: left;
        }

        .botones-primeros button {
          margin-top: 5px;
          margin-bottom: 5px;
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
  background-color: #049DD9;
  color: #fff;
  text-align: center;
  padding: 20px;
  
}
.base_edit_print{
  border: 0px solid red;
  width: auto;
  height: 70vh;
}
.font_print{
  font-size: 5.0rem;
}
.input_edit_print {
  border: 3px solid black;
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