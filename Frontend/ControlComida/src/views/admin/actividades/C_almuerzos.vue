<script setup>
import Swal from 'sweetalert2';
import C_Header from '@/components/C_Header.vue';
import C_footer from '@/components/C_Footer.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';

</script>
<template>
    <div class="body_vue">
        <div class="content_vue">
            <C_Header></C_Header>

        </div>
        <footer class="footer_vue">
            <C_footer></C_footer>
        </footer>
    </div>

</template>
<style>

</style>