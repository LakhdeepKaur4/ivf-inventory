import axios from 'axios';

import{URN,URL, CREATE_PRODUCT,POST_CREATE_PRODOCT} from '../actionCreators/index';

export function createProductDetails(){
    const request = axios.get(`${URN}/createProduct`)
    .then((response =>response.data))

    return {
        type: CREATE_PRODUCT,
        payload:request
    }
}

export const postProduct=(values)=>{

    const request = axios.post(`${URL}/item` , values )
     .then(response => response.data)
    
 
     
     return{
 
         type:POST_CREATE_PRODOCT,
         payload: request 
     }
 
 }

