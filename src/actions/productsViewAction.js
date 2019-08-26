import axios from 'axios';

import{URLi, PRODUCTS_VIEW} from '../actionCreators/index';

export function getProductsView(){
    const request = axios.get(`${URLi}/products`)
    .then((response =>response.data))

    return {
        type: PRODUCTS_VIEW,
        payload:request
    }
}
