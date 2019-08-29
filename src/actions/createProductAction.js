import axios from 'axios';

import{CREATE_PRODUCT,POST_CREATE_PRODUCT, PRODUCT_DATA, PRODUCT_VARIANT, UPDATE_VARIANT} from '../actionCreators/index';



export function createProductDetails(URL){
    const request = axios.get(`${URL}/api/item`)
    .then(response =>response.data)

    return {
        type: CREATE_PRODUCT,
        payload:request
    }
}




export const productOption=(data)=>{
    return {
        type: POST_CREATE_PRODUCT,
        payload:data
    }
}

export const productVariant=(data)=>{
    return {
        type: PRODUCT_VARIANT,
        payload:data
    }
}
export const productData=(URL,data)=>{
    console.log(data,"=====================product data");
    const request = axios.post(`${URL}/api/item`, data )
     .then(response => response.data)
    
     return{
         type:PRODUCT_DATA,
         payload: request 
     }
}

export const updateVariant=(variants)=>{
     
     return{
         type:UPDATE_VARIANT,
         payload: variants
     }
}