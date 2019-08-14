import axios from 'axios';

import{URN, CREATE_PRODUCT} from '../actionCreators/index';

export function createProductDetails(){
    const request = axios.get(`${URN}/createProduct`)
    .then((response =>response.data))

    return {
        type: CREATE_PRODUCT,
        payload:request
    }
}

