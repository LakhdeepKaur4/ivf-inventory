import axios from 'axios';
import { toasterMessage } from "../utils.js"

import{GET_INITIAL_CATEGORY,GET_PARTICULAR_CATEGORY,GET_SUB_CATEGORY,ON_SUBMIT} from '../actionCreators/index';

export function GetInitialCategory(URL){
    const request = axios.get(`${URL}/api/category/initial`)
    .then((response => response.data))
    .then(data=>{
       return data['category'];
    }).catch(err=>{
        if(err.isAxiosError){
            toasterMessage("error", 'ERROR FETCHING FILESTRUCTURE');
        }
        else{
            toasterMessage("error", err);
        }
    });;

    return {
        type: GET_INITIAL_CATEGORY,
        payload:request
    }
}

export function GetParticularCategory(URL,id){
    const request = axios.get(`${URL}/api/category/${id}`)
    .then((response => {
        if(response.data && response.data.length){
            return response.data[0].subCategories
        }
        return [];
    }))
    .then(data=>{
       return {
           id,
           data
       }
    });

    return {
        type: GET_PARTICULAR_CATEGORY,
        payload:request
    }
}

export function GetSubCategory(URL,id){
    const request = axios.get(`${URL}/api/category/${id}`)
    .then((response => {        
        if(response.data && response.data.length){
            return response.data[0].subCategories
        }
        return [];
    }))
    .then(data=>{
        return {
            id,
            data
        }
    });

    return {
        type: GET_SUB_CATEGORY,
        payload:request
    }

}
export function onSubmit(URL,values){
    const request = axios.post(`${URL}/api/category/`,values)
    .then((response => response.data))

    return {
        type: ON_SUBMIT,
        payload:request
    }
}