import axios from 'axios';

import{PRODUCT_ITEM,SEARCH} from '../actionCreators/index';

export function getProductsItem(URL){
    const request = axios.get(`${URL}/api/orders/items/1`)
    .then((response =>response.data))

    return {
        type: PRODUCT_ITEM,
        payload:request 
    }
}


export function getSearch(URL,search){console.log(URL)
    const request = axios.get(`${URL}/api/item/search?search=${search}`)
    .then((response =>response.data))

    return {
        type: SEARCH,
        payload:request 
    }
}
