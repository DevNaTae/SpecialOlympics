import { defineStore } from 'pinia'
import axios from 'axios'

export const C_ActividadesD = defineStore('ActividadesDeportivas',{
    state: ()=>(
        {
            actividadesDeportivas:[],
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',
            url_env:import.meta.env.VITE_API_URL,

        }
    ),
    actions:{
        async get_ActividadesD(id){
            try{
                const response = await fetch (`${this.url_env}api/dashboard/get_ad_f/${id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                this.actividadesDeportivas = jsonData;
                return jsonData;
            }catch (error) {
                console.log(error.response);
                return
            }
        },
        async post_ActividadesD(formdata){
            try{
                const response = await fetch (`${this.url_env}api/dashboard/store_ad`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(formdata)
                })
                const jsonData = await response.json();
                return jsonData;
            }catch (error) {
                console.log(error.response);
                return
            }
        },
        async put_ActividadesD(formdata,id){
            try{
                const response = await fetch (`${this.url_env}api/dashboard/update_ad/${id}`,{
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
                return jsonData;
            }catch (error) {
                console.log(error.response);
                return
            }
        },
        async delete_ActividadesD(id){
            try{
                const response = await fetch (`${this.url_env}api/dashboard/delete_ad/${id}`,{
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
            }catch (error) {
                console.log(error.response);
                return
            }
        },
    },
})