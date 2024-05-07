import { defineStore } from 'pinia'
import axios from 'axios'

export const C_Sportman = defineStore('Estado_personal',{
    state: ()=>(
        {
            prueba:'hola_1',
        }
    ),
    actions:{
        async get_sportman(){

        },
        async post_sportman(){

        },
        async put_sportman(){

        },
        async dismiss_sportman(){

        },
    },
})