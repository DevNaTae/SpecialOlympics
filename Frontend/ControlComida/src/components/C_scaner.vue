<script setup>

</script>

<template>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style="background: #c9ae45; border-color: #c9ae45;">
    SCANER
</button>


  <!-- MODAL -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">ESCANER</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <!-- CUADRO SCANER -->
  <div class="row justify-content-center mt-5">
    <div class="col-sm-4 shadow p-3"  style="width:100%">
      <h5 class="text-center">Escanear codigo QR</h5>
      <div class="row text-center">
        <a id="btn-scan-qr" href="#">
          <img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/07/1499401426qr_icon.svg" class="img-fluid text-center" width="175">
        </a>
        <canvas hidden="" id="qr-canvas" class="img-fluid"></canvas>
        </div>
        <div class="row mx-5 my-3">
        <button class="btn btn-success btn-sm rounded-3 mb-2" onclick="encenderCamara()" style="background: orange;">Encender camara</button>
        <button class="btn btn-danger btn-sm rounded-3" onclick="cerrarCamara()">Detener camara</button>
      </div>
    </div>
  </div>
  <audio id="audioScaner" src="assets/sonido.mp3"></audio> 
  <!-- <script src="assets/js/index.js"></script> -->
<!-- TERMINA CUADRO SCANER -->

        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
        <button type="button" class="btn btn-primary" style="background: orange;">CONTINUAR</button>
      </div>
    </div>
  </div>
</div>
<!-- TERMINA MODAL -->


</template>