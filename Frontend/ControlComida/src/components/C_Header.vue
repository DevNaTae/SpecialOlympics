<script setup>
import { C_session } from '@/stores/session'
const P_session = C_session();

const logout = ()=>{
    P_session.logout();
}
</script>
<template>
    <nav class="navbar bg-body-tertiary ">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../assets/imgs/Uleam.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top">
            </a>
            <div class="d-flex">
                <button @click="logout" class=" navbar-toggler" type="button" >
                    <i class="bi bi-door-open-fill"></i>
                </button>
                <button class="ms-3 navbar-toggler" type="button">
                    <i class="bi bi-download"></i>
                </button>
            </div>
        </div>
    </nav>
</template>
<style>

</style>