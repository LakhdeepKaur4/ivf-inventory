import axios from 'axios';

import{PRODUCT_ITEM} from '../actionCreators/index';

export function getProductsItem(URL){
    const request = axios.get(`${URL}/productsItem`)
    .then((response =>response.data))

    return {
        type: PRODUCT_ITEM,
        payload:request 
    }
}
