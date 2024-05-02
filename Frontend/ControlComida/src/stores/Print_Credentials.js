import { defineStore } from 'pinia'
import axios from 'axios'

export const C_print_upload = defineStore('print_upload',{
    state: ()=>(
        {
            prueba:'hola_2',
            deportista:''
        }
    ),
    actions:{
        async get_qr(data){
            console.log(data);
            
            try {
                const response = await fetch (`http://127.0.0.1:8000/api/eats/${data}`,{
                    method:'GET',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                console.log(response)
                const jsonData = await response.json();
                this.deportista = jsonData
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    },
})