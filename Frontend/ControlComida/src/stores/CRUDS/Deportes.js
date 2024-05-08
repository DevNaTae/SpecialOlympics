import { defineStore } from 'pinia'
import axios from 'axios'

export const C_Deportes = defineStore('Deportes',{
    state: ()=>(
        {
            deportes:[],
        }
    ),
    actions:{
        async get_Deportes(){
            try{
                const response = await fetch (`http://127.0.0.1:8000/api/dashboard/get_deporte`,{
                    method:'GET',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
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
        async post_Deportes(){

        },
        async put_Deportes(){

        },
        async dismiss_Deportes(){

        },
    },
})