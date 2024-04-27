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
            try {
                const data = await $fetched('url',{
                    method:'POST',
                    body:formData,
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                    },
                    credentials:'include', 
                })
                return true
            } catch (error) {
                return false
            }
        },
        async logout(){
            try {
                
            } catch (error) {
                
            }
        }
    },

})
  