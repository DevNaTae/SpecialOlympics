import { defineStore } from "pinia";
import axios from 'axios';

export const  C_Atletas = defineStore('Atletas',{
    state: () =>(
        {
            Atleta_unit:null,
            pagina_inicio:null,
            pagina_final:null,
            pagina_actual:null,
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',
            url2:'http://127.0.0.1:8000',
            url_env:import.meta.env.VITE_API_URL,

        }
    ),
    actions:{
        //ESTE GET ES MIO DIEGO NO LO TOMES EN CUENTA
        async get_deportistas(){
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/sportman_pluck`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                return jsonData;
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async post_atletas(formdata){
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/sportman` ,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body:JSON.stringify(formdata),
                })
                const jsonData = await response.json();
                return jsonData;
            } catch (error) {
                console.log(error);
            }
        },
        async get_atletas(deporte , search , page=1 , provincia ){
            try {
                const baseUrl = this.url_env;
                const path = "/api/dashboard/sportman";
                const url = new URL(path, baseUrl);
                const data_enviar={
                    deporte: deporte,
                    page :page,
                    search:search,
                    provincia:provincia,
                }
                //console.log(data_enviar);
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
                this.pagina_actual = jsonData.current_page;
                this.pagina_inicio = jsonData.from
                this.pagina_final = jsonData.last_page
                this.Atleta_unit = jsonData.data;
            } catch (error) {
                console.log(error);
            }
        },
        async get_atleta_edit(id){
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/sportman/${id}/edit`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async put_atleta(formData, id){
            try {
                const response = await fetch(`${this.url_env}/api/dashboard/sportman/${id}`,{
                    method:'PUT',
                    mode:'cors',
                    headers:{
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(formData)
                })
                const jsonData = await response.json();
                return jsonData
            } catch (error) {
                console.log(error);
            }
           
        },
        async dismis_atleta(id){
            try {
                const response = await fetch (`${this.url_env}/api/dashboard/sportman_active/${id}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                return jsonData

            } catch (error) {
                console.log(error);
            }
        },
        async post_actividades_deportivas(data){
            // console.log(data.atleta_id);
            // console.log(data.actividad_id);
            const ids = data.actividad_id;
            //console.log(ids);
            try {
                const response = await fetch(`${this.url_env}/api/dashboard/sportman_activities/${data.atleta_id}`,{
                    method:'POST',
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body:JSON.stringify(
                        {
                            ids
                        }
                    ),

                })
            } catch (error) {
                console.log(error);
            }
        }
    }
})