import { defineStore } from 'pinia'
import axios from 'axios'

export const C_TiposInvitados = defineStore('TiposInvitados',{
    state: ()=>(
        {
            prueba:'hola_1',
            TiposInvitados:[],
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',
            url_env:import.meta.env.VITE_API_URL,

        }
    ),
    actions:{
        async get_TiposInvitados(){
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/get_tg`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                this.TiposInvitados = jsonData
                return jsonData
            } catch (error) {
                
            }
        },
        async post_TiposInvitados(formdata){
            // console.log(formdata)
            try {
                const response = await fetch(`${this.url_env}/api/dashboard/store_tg`,{
                    method:'POST',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(
                        {
                            tipo_invitado_nombre:formdata
                        }    
                    )
                })
                // console.log(response);
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                
            }
        },
        async put_TiposInvitados(formdata, id){
            try {
                const response = await fetch(`${this.url_env}/api/dashboard/update_tg/${id}`,{
                    method:'PUT',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(formdata)
                })
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                
            }
        },
        async dismiss_TiposInvitados(id){
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/delete_tg/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                return false
            }
        },
    },
})