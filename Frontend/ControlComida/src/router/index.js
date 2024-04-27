import { createRouter, createWebHistory } from 'vue-router'
import C_login from '../views/C_login.vue'
import C_status from '../views/C_status.vue'
const routes = [
  {
    path: '/',
    name: 'C_login',
    component: C_login
  },
  {
    path: '/status',
    name: 'C_status',
    component: C_status
  }


];
const router = createRouter({
  history: createWebHistory('/Control&Security/'), // Establece '/Control&Security' como la base de la historia
  routes
});
export default router;
