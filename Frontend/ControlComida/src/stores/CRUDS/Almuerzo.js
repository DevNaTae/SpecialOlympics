import { defineStore } from 'pinia'
import axios from 'axios'


export const C_Almuerzo = defineStore('Almuerzo',{
    state: ()=>(
        {
            almuerzos:[],
            DateLunch:[],
            url:'http://127.0.0.1:8000'

        }
    ),
    actions:{
        async getAlmuerzo(){
            try {
                const response = await fetch (`${this.url}/api/dashboard/lunch_get`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                this.almuerzos = jsonData;
                return 
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async getDateLunch(){
            try {
                const response = await fetch (`${this.url}/api/dashboard/lunch_date`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                })
                const jsonData = await response.json();
                this.DateLunch = jsonData;
                console.log(jsonData);
                return jsonData;
            } catch (error) {
                console.log(error);
            }
        },
        async postAlmuerzo(formdata){
            console.log(formdata);
            try {
                const response = await fetch(`${this.url}/api/dashboard/lunch_store`,{
                    method:'POST',
                    headers:{
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(formdata)
                })
                const jsonData = await response.json();
                console.log(jsonData);
                return jsonData;
            } catch (error) {

                console.log(error);
            }
        },
        async deleteAlmuerzo(formdata){
            console.log(formdata);
            try {
                const response = await fetch(`${this.url}/api/dashboard/lunch_delete`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(formdata)
                })
                const jsonData = await response.json();
                console.log(jsonData);
                return jsonData;
            } catch (error) {
                console.log(error);
            }
        },
    },
})