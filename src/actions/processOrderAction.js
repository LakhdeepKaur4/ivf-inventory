import axios from 'axios';

import{ GET_ORDER_DETAILS } from '../actionCreators/index';

export function getProcessOrderStatus(URL, id){
    const request = axios.get(`${URL}/api/orders/${id}`)
    .then((response =>response.data))

    return {
        type: GET_ORDER_DETAILS,
        payload:request 
    }
}