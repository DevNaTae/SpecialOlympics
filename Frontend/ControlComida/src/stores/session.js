import { defineStore } from 'pinia'

export const C_session = defineStore('session',{
    state: ()=>(
        {
            prueba:'hola',
            url:''
        }
    ),
    actions:{
        async init_session(formdata){

        },
        async logout(){
            try {
                const data = await fetch('http://127.0.0.1:8000/logout',{
                    method:'POST',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                    },
                    credentials:'include', 
                })
                return true
            } catch (error) {
                return true
            }
        }
    },

})
  