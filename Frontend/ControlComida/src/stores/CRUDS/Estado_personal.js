import { defineStore } from 'pinia'
import axios from 'axios'

export const C_Sportman = defineStore('Estado_personal',{
    state: ()=>(
        {
            prueba:'hola_1',
            total:'',
            tc_unit:null,
            pagina_inicio:null,
            pagina_final:null,
            pagina_actual:null,
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',
        }
    ),
    actions:{
        async get_personal(){
            const response = await fetch (`${this.url}/api/dashboard/get_guest`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Accept': 'application/json',
                },
                credentials:'include',
            })
            const jsonData = await response.json();
            //console.log(jsonData);
        },
        async get_typeC(data,page=1){
            const response = await fetch (`${this.url}/api/dashboard/get_guestf/${data}?page=${page}`,{
                method:'GET',
                headers:{
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
        async post_personal(formdata){
            try {
                const response = await fetch(`${this.url}/api/dashboard/store_guest`,{
                    method:'POST',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(formdata)
                })
                console.log(response);
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                
            }
        },
        async put_personal(formdata,id){
            try {
                const response = await fetch(`${this.url}/api/dashboard/update_guest/${id}`,{
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
                return jsonData
            } catch (error) {
                
            }
        },
        async dismiss_personal(id){
            try {
                const response = await fetch (`${this.url}/api/dashboard/delete_guest/${id}`,{
                    method:'DELETE',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                
            }
        },
    },
})