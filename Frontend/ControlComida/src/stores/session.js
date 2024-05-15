import { defineStore } from 'pinia'
import axios from 'axios'
export const C_session = defineStore('session',{
    state: ()=>(
        {
            prueba:'hola',
            url:'',
            user:[],
            verif:false,
            deportistas:'',
            url:'http://127.0.0.1:8000'

        }
    ),
    actions:{
        async init_session(formdata){
            try {
                const response = await axios.post(`${this.url}/api/login`,formdata,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
                console.log(response.data.user.role);
                this.user=response.data.user.role;
                this.verif=true;
                return true  
            } catch (error) {
                console.log(error.response);
                return false
            }

        },
        async logout(){
            console.log('entre')
            try {
                const response = await axios.post(`${this.url}/api/logout`,null,{
                    withCredentials: true
                })
                this.verif = false;
                return true
            } catch (error) {
                return false

            }
        },
        async get_session(){
            try {
                const response = await fetch (`${this.url}/api/get_session`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                if(response.status== 200){
                    this.verif = true;
                }
                console.log(jsonData.user.role);
                this.user = jsonData.user.role;
            } catch (error) {
                
            }
        },
        async data_qr(){
            try {
                const response = await fetch (`${this.url}/api/data_qr`,{
                    method:'GET',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                this.deportistas = jsonData
                console.log(jsonData);
            } catch (error) {
                
            }
        }
    },

})
  