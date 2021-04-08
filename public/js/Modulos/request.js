import { cache } from "webpack";

export async function makeReq(met, url, data){
    //Configuración de fecth
    const response = await fetch(url, met,{
        method: met,
        mode: 'cors',
        cache:'no-cache',
        credential: 'same-origin',
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    });
    //return response;
}