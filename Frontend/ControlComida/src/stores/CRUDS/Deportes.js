import { defineStore } from 'pinia'
import axios from 'axios'

export const C_Deportes = defineStore('Deportes',{
    state: ()=>(
        {
            deportes:[],
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',
            //url:'http://127.0.0.1:8000',
            url_env:import.meta.env.VITE_API_URL,

        }
    ),
    actions:{
        async get_Deportes(){
            try{
                const response = await fetch (`${this.url_env}/api/dashboard/get_deporte`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                this.deportes = jsonData;
                return jsonData;
            }
            catch (error) {
                console.log(error.response);
                return
            }
        },
        async post_Deportes(formdata){
            console.log(formdata);
            try{
                const response = await fetch (`${this.url_env}/api/dashboard/store_deporte` ,{
                    method:'POST',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body:JSON.stringify(formdata),
                })
                const jsonData = await response.json();
                return jsonData;
            }
            catch (error) {
                console.log(error.response);
                return
            }
        },
        async put_Deportes(formdata, id){
            try{
                const response = await fetch (`${this.url_env}/api/dashboard/update_deporte/${id}` ,{
                    method:'PUT',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body:JSON.stringify(formdata),
                })
                const jsonData = await response.json();
                return jsonData;
            }
            catch (error) {
                console.log(error.response);
                return
            }

        },
        async delete_Deportes(id){
            try{
                const response = await fetch (`${this.url_env}/api/dashboard/delete_deporte/${id}` ,{
                    method:'DELETE',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                return jsonData;
            }
            catch (error) {
                console.log(error.response);
                return
            }
        },
    },
})