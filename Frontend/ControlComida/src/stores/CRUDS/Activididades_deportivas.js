import { defineStore } from 'pinia'
import axios from 'axios'

export const C_ActividadesD = defineStore('ActividadesDeportivas',{
    state: ()=>(
        {
            actividadesDeportivas:[],
        }
    ),
    actions:{
        async get_ActividadesD(id){
            try{
                console.log(id)
                const response = await fetch (`http://127.0.0.1:8000/api/dashboard/get_ad_f/${id}`,{
                    method:'GET',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                this.actividadesDeportivas = jsonData;
                console.log(jsonData);
                return jsonData;
            }catch (error) {
                console.log(error.response);
                return
            }
        },
        async post_ActividadesD(formdata){
            try{
                const response = await fetch (`http://127.0.0.1:8000/api/dashboard/store_ad`,{
                    method:'POST',
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
        async put_ActividadesD(formdata,id){
            console.log(id);
            try{
                const response = await fetch (`//127.0.0.1:8000/api/dashboard/update_ad/${id}`,{
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
                const response = await fetch (`http://127.0.0.1:8000/api/dashboard/delete_ad/${id}`,{
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