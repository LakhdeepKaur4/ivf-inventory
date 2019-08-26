import axios from 'axios';

import{URL, PRODUCT_ITEM} from '../actionCreators/index';

export function getProductsItem(){
    const request = axios.get(`${URL}/orders/items/1`)
    .then((response =>response.data))

    return {
        type: PRODUCT_ITEM,
        payload:request 
    }
}
