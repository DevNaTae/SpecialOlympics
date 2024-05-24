import './assets/base.css'
// import './assets/plugins/qrCode.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.bundle.min.js'
//recuerda que llamarlo asi es de la forma vaga lo correcyo es llamarlo de forma de componente
import 'bootstrap-icons/font/bootstrap-icons.css'
//pinias

const app = createApp(App)

app.use(createPinia())
app.use(router)




app.mount('#app')
