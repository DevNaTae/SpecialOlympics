import { defineStore } from 'pinia'
import axios from 'axios'
export const C_session = defineStore('session',{
    state: ()=>(
        {
            prueba:'hola',
            url:'',
            user:[],
            verif:false
        }
    ),
    actions:{
        async init_session(formdata){
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login',formdata,{
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
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
                const response = await axios.post('http://127.0.0.1:8000/api/logout',null,{
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
                const response = await fetch ('http://127.0.0.1:8000/api/get_session',{
                    method:'GET',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                    },
                    credentials:'include',
                })
                console.log(response);
                if(response.status== 200){
                    this.verif = true;
                }
                
            } catch (error) {
                
            }
        }
    },

})
  