import { createRouter, createWebHistory } from 'vue-router'
import { C_session } from '@/stores/session';
import C_login from '../views/C_login.vue'
import C_status from '../views/C_status.vue'

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

    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const session = C_session();
  
  // Si la sesión no está verificada y la ruta es diferente de '/', redirigir al login
  if (!session.verif && to.path !== '/') {
    next('/');
    return; // Importante: asegúrate de salir de la función aquí para evitar llamadas adicionales a next()
  }

  // Si la sesión no está verificada y la ruta es '/', intentar obtener la sesión
  if (!session.verif && to.path === '/') {
    try {
      await session.get_session();
      if (session.verif) {
        next('/status'); // Si la sesión está verificada después de obtenerla, redirigir al status
      } else {
        next(); // Si la sesión sigue sin estar verificada, permitir la navegación a la ruta de login
      }
    } catch (error) {
      console.error('Error al obtener la sesión:', error);
      next('/');
    }
    return; // Asegúrate de salir de la función aquí para evitar llamadas adicionales a next()
  }

  // Si la sesión está verificada, permitir la navegación
  next();

});



export default router;
