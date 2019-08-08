import axios from 'axios';

import{URN, PRODUCTS_VIEW} from '../actionCreators/index';

export function getProductsView(){
    const request = axios.get(`${URN}/products`)
    .then((response =>response.data))

    return {
        type: PRODUCTS_VIEW,
        payload:request
    }
}
