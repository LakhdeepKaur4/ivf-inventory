import axios from 'axios';

import{URN, URL, BRANDURL, CREATE_PRODUCT,POST_CREATE_PRODOCT,BRAND_PRODUCT} from '../actionCreators/index';

export function createProductDetails(){
    const request = axios.get(`${URN}/createProduct`)
    .then((response =>response.data))

    return {
        type: CREATE_PRODUCT,
        payload:request
    }
}

export const postProduct=(values)=>{
    console.log(values,"action product============")
    const request = axios.post(`${URL}/item`, values )
     .then(response => response.data)
    
     return{
 
         type:POST_CREATE_PRODOCT,
         payload: request 
     }
 
 }


 export function getBrands(){
    
    const request = axios.get(`${BRANDURL}`)
    .then(response =>response.data)

    return {
        type: BRAND_PRODUCT,
        payload:request
    }
}
