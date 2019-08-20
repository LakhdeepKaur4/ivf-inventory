import axios from 'axios';

import{URN, URL, BRANDURL, CREATE_PRODUCT,POST_CREATE_PRODOCT,BRAND_PRODUCT, PRODUCT_DATA, PRODUCT_VARIANT} from '../actionCreators/index';

export function createProductDetails(){
    const request = axios.get(`${URN}/createProduct`)
    .then((response =>response.data))

    return {
        type: CREATE_PRODUCT,
        payload:request
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


export const productData=(data)=>{
    return {
        type: PRODUCT_DATA,
        payload:data
    }
}

export const productVariant=(data)=>{
    return {
        type: PRODUCT_VARIANT,
        payload:data
    }
}
export const productSubmit=(data)=>{
    const request = axios.post(`${URL}/item`, data )
     .then(response => response.data)
    
     return{
 
         type:POST_CREATE_PRODOCT,
         payload: request 
     }
}