import { defineStore } from 'pinia'
import axios from 'axios'

export const C_print_upload = defineStore('print_upload',{
    state: ()=>(
        {
            prueba:'hola_2',
            deportista:'',
            provincias:'',
            //url:'http://127.0.0.1:8000',
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',
            pagina_actual:'',
            pagina_inicio:'',
            pagina_final:'',
            print_unit:'',
        }
    ),
    actions:{
        async get_qr(data){
            console.log(data);
            try {
                const response = await fetch (`${this.url}/api/eats/${data}`,{
                    method:'GET',
                    headers:{
                        //'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                // console.log(response.status)
                if(response.status === 404){
                    const jsonData = await response.json();
                    console.log(jsonData);
                    return jsonData;
                }
                const jsonData = await response.json();
                console.log(jsonData)
                this.deportista = jsonData.data
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
                        //'X-Requested-With': 'XMLHttpRequest',
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
                return response
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
        },
        async get_paginate_Atletas(){

        },
        //paginar atletas
        async get_paginateTipes(page=1,provincias){
            //armado de la url
            const baseUrl = this.url;
            const path = '/api/dashboard/credentials_athlete';
            const url = new URL(path,baseUrl);
            console.log(url);
            const data_enviar ={
                page: page,
                provincia_id: provincias,
            }
            Object.keys(data_enviar).forEach(key=>{
                if(data_enviar[key] === null || data_enviar[key]=== undefined){
                    data_enviar[key] = '';
                }
                url.searchParams.append(key, data_enviar[key])
            })
            try {
                const response = await fetch(url,{
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
                console.log(jsonData.atletas)
                this.pagina_actual = jsonData.current_page;
                this.pagina_inicio = jsonData.from
                this.pagina_final = jsonData.last_page
                this.print_unit = jsonData.atletas;
            } catch (error) {
                console.log(error);
            }
            return true
            //
            try {
                const response = await fetch(`${this.url}/api/dashboard/credentials_athlete/?page=${page}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                console.log(response);
                const jsonData = await response.json();
                // console.log('la pagina en la que estas es'+ jsonData.current_page);
                // console.log('la ultima pagina es'+jsonData.last_page);
                // console.log('desde el inicio'+jsonData.from);
                console.log(jsonData.atletas)
                this.pagina_actual = jsonData.current_page;
                this.pagina_inicio = jsonData.from
                this.pagina_final = jsonData.last_page
                this.print_unit = jsonData.atletas;
            } catch (error) {
                
            }
        },
        //paginar invitador
        async get_paginate_TiposInvitados(page=1,provincias){
            try {
                const baseUrl = this.url;
                const path = '/api/dashboard/credentials_guest';
                const url = new URL(path,baseUrl);
                console.log(url);
                const data_enviar ={
                    page: page,
                    provincia_id: provincias,
                }
                Object.keys(data_enviar).forEach(key=>{
                    if(data_enviar[key] === null || data_enviar[key]=== undefined){
                        data_enviar[key] = '';
                    }
                    url.searchParams.append(key, data_enviar[key])
                })
                const response = await fetch(url,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                console.log(response);
                const jsonData = await response.json();
                this.pagina_actual = jsonData.current_page;
                this.pagina_inicio = jsonData.from
                this.pagina_final = jsonData.last_page
                this.print_unit = jsonData.invitados;
            } catch (error) {
                
            }

        },

    },
})