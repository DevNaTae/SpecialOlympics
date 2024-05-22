import { defineStore } from 'pinia'
import axios from 'axios'


export const C_Almuerzo = defineStore('Almuerzo',{
    state: ()=>(
        {
            almuerzos:[],
            DateLunch:[],
            //url:'http://127.0.0.1:8000'
            url:'https://specialolimpics--production-jistoria.sierranegra.cloud',


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
                        //'X-Requested-With': 'XMLHttpRequest',
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
        async Excel_lunch(data){
            console.log('id selecionado '+ data);
            try {
                const response = await axios.post(`${this.url}/api/dashboard/launch_export`, 
                { horario_id: data },
                {
                    withCredentials: true, // Esto asegura que las cookies sean enviadas
                    responseType: 'blob'
                }
                ); // Cambia la ruta según tu configuración
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = URL.createObjectURL(blob);
        
                // Crea un enlace temporal y haz clic en él para descargar el archivo
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'almuerzo.xlsx');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error('Error al descargar el archivo Excel:', error);
            }
        },
    },
})