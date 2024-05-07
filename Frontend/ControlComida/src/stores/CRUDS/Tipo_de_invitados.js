import { defineStore } from 'pinia'
import axios from 'axios'

export const C_TiposInvitados = defineStore('TiposInvitados',{
    state: ()=>(
        {
            prueba:'hola_1',
        }
    ),
    actions:{
        async get_TiposInvitados(){

        },
        async post_TiposInvitados(){

        },
        async put_TiposInvitados(){

        },
        async dismiss_TiposInvitados(){

        },
    },
})