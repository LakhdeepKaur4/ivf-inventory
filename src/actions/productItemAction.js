import axios from 'axios';

import{URN, PRODUCT_ITEM} from '../actionCreators/index';

export function getProductsItem(){
    console.log('hiiii')
    const request = axios.get(`${URN}/productsItem`)
    .then((response =>response.data))

    return {
        type: PRODUCT_ITEM,
        payload:request 
    }
}
