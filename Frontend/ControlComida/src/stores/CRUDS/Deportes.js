import { defineStore } from 'pinia'
import axios from 'axios'

export const C_Deportes = defineStore('Deportes',{
    state: ()=>(
        {
            prueba:'hola_1',
        }
    ),
    actions:{
        async get_Deportes(){

        },
        async post_Deportes(){

        },
        async put_Deportes(){

        },
        async dismiss_Deportes(){

        },
    },
})