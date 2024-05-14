import { defineStore } from 'pinia'
import axios from 'axios'

export const C_print_upload = defineStore('print_upload',{
    state: ()=>(
        {
            prueba:'hola_2',
            deportista:'',
            provincias:'',
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',

        }
    ),
    actions:{
        async get_qr(data){
            console.log(data);
            try {
                const response = await fetch (`${this.url}/api/eats/${data}`,{
                    method:'GET',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                // console.log(response.status)
                if(response.status === 404){
                    return false
                }
                const jsonData = await response.json();
                this.deportista = jsonData
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async food_promise(data){
            console.log(data)
            try {
                const response = await fetch(`${this.url}/api/eats_mark/${data}`,{
                    method:'POST',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                //console.log(response);
                if(response.status == 422){
                    const jsonData = await response.json();
                    //console.log(jsonData.message);
                    return jsonData.message
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }

        },
        async get_provincia(){
            try {
                const response = await fetch (`${this.url}/api/dashboard/get_provincia`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                //console.log(response.message);
                const jsonData = await response.json();
                //console.log(jsonData);
                this.provincias = jsonData
            } catch (error) {
                console.log(error);
            }
        },
        async upload_xls(data){
            try {
                console.log(data);
                const response = await axios.post(`${this.url}/api/dashboard/deportista_import`,data,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true,
                })
                console.log(response);
                return true
            } catch (error) {
                console.log(error);
                return error
            }
            // return false
            // return true
        },
        async upload_imgs(formData,id){
            console.log(formData);
            console.log(id);
            try {
                const response = await fetch(`${this.url}/api/dashboard/deportista_images/${id}`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    },
                    body: formData,
                    credentials:'include',
                })
            } catch (error) {
                console.log(error);
            }
        }

    },
})