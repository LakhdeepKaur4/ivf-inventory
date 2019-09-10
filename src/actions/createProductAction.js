import axios from 'axios';

import{CREATE_PRODUCT,POST_CREATE_PRODUCT, PRODUCT_DATA, PRODUCT_VARIANT, UPDATE_VARIANT, UPDATE_PRODUCT, UPDATE_PRODUCT_ID} from '../actionCreators/index';



export function createProductDetails(URL){
    const request = axios.get(`${URL}/api/item`)
    .then(response =>response.data)

    return {
        type: CREATE_PRODUCT,
        payload:request
    }
}




export const createProductData=(brandId, name,sku, optStock, price,  subTitle, vendor, description, originCountry, template, hashtags, metafields, tagsInfo, productPictures)=>{
   const data={
        brandId, name,sku, optStock, price,  subTitle, vendor, description, originCountry, template, hashtags, metafields, tagsInfo, productPictures
    }
    console.log(data);
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

export const productData=(URL,payload)=>{
    console.log("==========payload",payload)
    const request = axios.post(`${URL}/api/item`, payload)
     .then(response => response.data)
     return{
         type:UPDATE_PRODUCT_ID,
         payload: request 
     }
}

export const updateVariant=(variants)=>{
     return {
         type:UPDATE_VARIANT,
         payload: variants
     }
}

export const updateProduct=(URL,id,product)=>{
    console.log(id,product,"=================id, product")
    const request = axios.put(`${URL}/api/item/${id}`, product )
    .then(response => response.data)
    .then(()=>{
        return {itemId: id, name: product.name};
    })
    return{
        type:UPDATE_PRODUCT_ID,
        payload: request
    }
}

export const getProductById = (URL, id)=>{
    const request = axios.get(`${URL}/api/item/${id}`)
    .then(response =>response.data)

    return {
        type: PRODUCT_DATA,
        payload:request
    }
}