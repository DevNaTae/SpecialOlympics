import { createRouter, createWebHistory } from 'vue-router'
import { C_session } from '@/stores/session';
import C_login from '../views/C_login.vue'
import C_status from '../views/C_status.vue'
import Swal from 'sweetalert2';
//opciones admin
import C_PrintCredentials from '../views/admin/C_PrintCredentials.vue'
import C_SportmanState from '../views/admin/estado_personal/C_SportmanState.vue'
import C_upload from '../views/admin/C_Upload.vue';
import C_CreateCredentials from '@/views/admin/estado_personal/C_CreateCredentials.vue';
//editar estado del personal
import C_editcredentials from '@/views/admin/estado_personal/C_editcredentials.vue';
//actividades de los cruds
import C_deportes from '@/views/admin/actividades/C_deportes.vue';
import C_actividades_deportivas from '@/views/admin/actividades/C_actividades_deportivas.vue';
import C_lugares from '@/views/admin/actividades/C_lugares.vue';
import C_tiposInvitados from '@/views/admin/actividades/C_tiposInvitados.vue';
//opciones para voluntarios
import C_food_data from '@/views/admin/C_food_data.vue';
//Atletas
import C_Atletas from '@/views/admin/Atletas/C_Atletas.vue';
import C_edit_Atletas from '@/views/admin/Atletas/C_edit_Atletas.vue';
import C_CreateAtletas from '@/views/admin/Atletas/C_CreateAtletas.vue';

const router = createRouter({
  history: createWebHistory('/Control&Security/'), // Establece '/Control&Security' como la base de la historia
  routes: [
    {
      path: '/',
      name: 'C_login',
      component: C_login,
      meta: { requiresAuth: false } // Marca la ruta como no requiere autenticación

    },
    {
      path: '/status',
      name: 'C_status',
      component: C_status,
      meta: { requiresAuth: true } // Marca la ruta como requiere autenticación

    },
    {
      path: '/admin/PrintCredentials',
      name: 'C_printCredentials',
      component: C_PrintCredentials,
      meta: { requiresAuth: true } // Marca la ruta como requiere autenticación

    },
    {
      path: '/admin/SportmanState',
      name: 'C_SportmanState',
      component: C_SportmanState,
      meta: { requiresAuth: true } // Marca la ruta como requiere autenticación

    },
    {
      path: '/admin/Upload',
      name: 'C_Upload',
      component: C_upload,
      meta: { requiresAuth: true } // Marca la ruta como requiere autenticación

    },
    {
      path: '/admin/CreateCredentials',
      name: 'C_CreateCredentials',
      component: C_CreateCredentials,
      meta: { requiresAuth: true }
    },
    {
      path:'/volunteer/food_state/:f_num',
      name:'C_food_state',
      component: C_food_data,
      meta: { requiresAuth: true }


    },
    //actividades deportivas
    {
      path: '/admin/actividades/deportes',
      name: 'C_deportes',
      component: C_deportes,
      meta: { requiresAuth: true }

    },
    {
      path:'/admin/actividades/actividades_deportivas',
      name: 'C_actividades_deportivas',
      component:C_actividades_deportivas,
      meta: { requiresAuth: true }

    },
    {
      path:'/admin/actividades/lugares',
      name:'C_lugares',
      component: C_lugares,
      meta: { requiresAuth: true }

    },
    {
      path:'/admin/actividades/tipos_de_invitados',
      name:'C_tiposInvitados',
      component: C_tiposInvitados,
      meta: { requiresAuth: true }

    },
    {
      path:'/admin/actividades/editar_credenciales/:f_num',
      name: 'C_editcredentials',
      component: C_editcredentials,
      meta: { requiresAuth: true }

    },
    //atletas
    {
      path:'/admin/Atleta/GestionarAtletas',
      name:'C_Atletas',
      component:C_Atletas,
      meta: { requiresAuth: true },
    },
    {
      path:'/admin/GestionarAtletas/edit_atletlas/:f_num',
      name:'C_edit_atletas',
      component: C_edit_Atletas,
      meta: { requiresAuth: true }
    },
    {
      path:'/admin/GestionarAtletas/Create_Atletas',
      name:'C_create_atletas',
      component: C_CreateAtletas,
      meta: { requiresAuth: true }
    },
    
  ]
});

//Ronny si llegas a hacer el trabajo y te arroja un error 500
//comenta esto y una ves que termines lo vuelves a descomentar
router.beforeEach(async (to, from, next) => {
  const session = C_session();
  const loadingAlert = ShowLoading();

  // Si la ruta requiere autenticación, verifica el rol del usuario
  if (to.meta.requiresAuth) {
    // console.log('entre al auth')
    // Si la ruta es una ruta /admin/, verifica si el usuario tiene el rol de administrador
    if (to.path.startsWith('/admin/')) {
      await session.get_session();
      if (!session.verif || session.user !== 'Administrador') {
        next('/');
        return;
      }
    } else if(to.path.startsWith('/volunteer/')){
      await session.get_session();
      if (!session.verif || session.user !== 'Voluntario') {
        next('/');
        loadingAlert.close();
        return;
      }
    } else   {
      // Si la ruta no es una ruta /admin/, verifica si la sesión está verificada
      if (!session.verif) {
        next('/');
        return;
      }
    }
  }

  // Si la sesión no está verificada y la ruta es '/', intentar obtener la sesión
  if (!session.verif && to.path === '/') {
    // console.log('entre al auth_2')
    try {
      await session.get_session();
      if (session.verif) {
        loadingAlert.close();
        next('/status');
      } else {
        loadingAlert.close();
        next();
      }
    } catch (error) {
      console.error('Error al obtener la sesión:', error);
      next('/');
    }
    return;
  }

  loadingAlert.close();
  next();
});
const ShowLoading = () => {
  return Swal.fire({
    title: 'Cargando Ruta',
    html: '<div class="spinner-border text-primary mt-2 mb-2"></div>',
    showConfirmButton: false,
    showCancelButton: false, // Muestra el botón de "Cancelar"
    allowOutsideClick: false, 

  });
};

export default router;
