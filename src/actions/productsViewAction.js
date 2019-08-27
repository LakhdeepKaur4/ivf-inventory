import axios from 'axios';

import{URN, PRODUCTS_VIEW} from '../actionCreators/index';

export function getProductsView(defaultPage){
    console.log('default page',defaultPage)
    const request = axios.get(`${URN}/api/item/${defaultPage}`)
    .then((response =>response.data))

    return {
        type: PRODUCTS_VIEW,
        payload:request
    }
}
