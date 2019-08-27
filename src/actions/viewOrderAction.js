import axios from 'axios';

import{VIEW_ORDER} from '../actionCreators/index';

export function getViewOrder(URL){
    const request = axios.get(`${URL}/viewOrders`)
    .then((response =>response.data))

    return {
        type: VIEW_ORDER,
        payload:request
    }
}

