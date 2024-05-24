import { defineStore } from 'pinia'
import axios from 'axios'

export const C_Lugares = defineStore('Lugares',{
    state: ()=>(
        {
            prueba:'hola_1',
            lugares:null,
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',
            url_env:import.meta.env.VITE_API_URL,

        }
    ),
    actions:{
        async get_Lugares(){
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/get_lugar`,{
                    method:'GET',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                // console.log(response);
                const jsonData = await response.json();
                // console.log(jsonData);
                this.lugares = jsonData
            } catch (error) {
                console.log(error);
            }
        },
        async post_Lugares(formdata){
            try {
                const response = await fetch(`${this.url_env}/api/dashboard/store_lugar`,{
                    method:'POST',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(formdata)
                })
                // console.log(response);
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                console.log(error);
                return true
            }
        },
        async put_Lugares(formdata,id){
            try {
                const response = await fetch(`${this.url_env}/api/dashboard/update_lugar/${id}`,{
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
        async dismiss_Lugares(id){
            // console.log(id);
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/delete_lugar/${id}`,{
                    method:'DELETE',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                console.log(error);                
            }
        },
    },
})