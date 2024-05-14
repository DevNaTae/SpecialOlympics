import { defineStore } from "pinia";
import axios from 'axios';

export const  C_Atletas = defineStore('Atletas',{
    state: () =>(
        {
            Atleta_unit:null,
            pagina_inicio:null,
            pagina_final:null,
            pagina_actual:null,
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud'
        }
    ),
    actions:{
        async post_atletas(formdata){
            try {
                const response = await fetch (`${this.url}/api/dashboard/sportman` ,{
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
                const baseUrl = "https://specialolimpics--production-jistoria.sierranegra.cloud";
                const path = "/api/dashboard/sportman";
                const url = new URL(path, baseUrl);
                const data_enviar={
                    deporte: deporte,
                    page :page,
                    search:search,
                    provincia:provincia,
                }
                console.log(data_enviar);
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
                console.log(jsonData.data)
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
                const response = await fetch (`${this.url}/api/dashboard/sportman/${id}/edit`,{
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
                const response = await fetch(`${this.url}/api/dashboard/sportman/${id}`,{
                    method:'PUT',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
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
                const response = await fetch (`https://specialolimpics--production-jistoria.sierranegra.cloud/api/dashboard/sportman_active/${id}`,{
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
    }
})