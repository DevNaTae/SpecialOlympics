import './assets/css/borders.css'
import './assets/css/main_v.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
//pinias

const app = createApp(App)

app.use(createPinia())
app.use(router)




app.mount('#app')
