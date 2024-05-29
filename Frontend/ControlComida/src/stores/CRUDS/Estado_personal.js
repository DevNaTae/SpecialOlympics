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
            url_env:import.meta.env.VITE_API_URL,

        }
    ),
    actions:{
        async get_personal(){
            const response = await fetch (`${this.url_env}api/dashboard/get_guest`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Accept': 'application/json',
                },
                credentials:'include',
            })
            const jsonData = await response.json();
            return jsonData;
            //console.log(jsonData);
        },
        async get_typeC(data,page=1,search){
            const baseUrl = this.url_env;
            const path = "api/dashboard/get_guestf";
            const url = new URL(path, baseUrl);
            const data_enviar={
                tipo_invitado_id: data,
                page :page,
                search:search,
            }
            Object.keys(data_enviar).forEach(key=>{
                if(data_enviar[key] === null || data_enviar[key]=== undefined){
                    data_enviar[key] = '';
                }
                url.searchParams.append(key, data_enviar[key])
            })
            const response = await fetch (url,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Accept': 'application/json',
                },
                credentials:'include',
            })
            const jsonData = await response.json();
            // console.log('la pagina en la que estas es'+ jsonData.current_page);
            // console.log('la ultima pagina es'+jsonData.last_page);
            // console.log('desde el inicio'+jsonData.from);
            // console.log(jsonData)
            this.pagina_actual = jsonData.current_page;
            this.pagina_inicio = jsonData.from
            this.pagina_final = jsonData.last_page
            this.tc_unit=jsonData.data;

        },
        async post_personal(data_sett){
            let data = new FormData();
            data.append('cedula',data_sett.cedula);
            data.append('nombre', data_sett.nombre);
            data.append('apellido',data_sett.apellido);
            data.append('edad',data_sett.edad);
            data.append('genero',data_sett.genero);
            data.append('activo',data_sett.activo);
            data.append('provincia_id',data_sett.provincia_id);
            data.append('tipo_invitado_id',data_sett.tipo_invitado_id);
            data.append('fecha_nacimiento',data_sett.fecha_nacimiento);
            data.append('imagen',data_sett.imagen);
            
            try {
                const response = await fetch(`${this.url_env}api/dashboard/store_guest`,{
                    method:'POST',
                    headers:{
                        // 'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: data
                })
                // console.log(response);
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                
            }
        },
        async put_personal(formdata,id){
            try {
                const response = await fetch(`${this.url_env}api/dashboard/update_guest/${id}`,{
                    method:'PUT',
                    headers:{
                        // 'X-Requested-With': 'XMLHttpRequest',
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
                const response = await fetch (`${this.url_env}api/dashboard/delete_guest/${id}`,{
                    method:'POST',
                    headers:{
                        // 'X-Requested-With': 'XMLHttpRequest',
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