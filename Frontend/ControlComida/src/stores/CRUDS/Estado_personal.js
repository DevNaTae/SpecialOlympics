import { defineStore } from 'pinia'
import axios from 'axios'

export const C_Sportman = defineStore('Estado_personal',{
    state: ()=>(
        {
            prueba:'hola_1',
            total:'',
            tc_unit:'',
            pagina_inicio:null,
            pagina_final:null,
            pagina_actual:null,
        }
    ),
    actions:{
        async get_personal(){
            const response = await fetch (`http://127.0.0.1:8000/api/dashboard/get_guest`,{
                method:'GET',
                headers:{
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type':'application/json',
                    'Accept': 'application/json',
                },
                credentials:'include',
            })
            const jsonData = await response.json();
            //console.log(jsonData);
        },
        async get_typeC(data,page=1){
            const response = await fetch (`http://127.0.0.1:8000/api/dashboard/get_guestf/${data}?page=${page}`,{
                method:'GET',
                headers:{
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type':'application/json',
                    'Accept': 'application/json',
                },
                credentials:'include',
            })
            const jsonData = await response.json();
            console.log('la pagina en la que estas es'+ jsonData.current_page);
            console.log('la ultima pagina es'+jsonData.last_page);
            console.log('desde el inicio'+jsonData.from);
            console.log(jsonData)
            this.pagina_actual = jsonData.current_page;
            this.pagina_inicio = jsonData.from
            this.pagina_final = jsonData.last_page
            this.tc_unit=jsonData.data;

        },
        async post_personal(){

        },
        async put_personal(){

        },
        async dismiss_personal(){

        },
    },
})