import axios from 'axios';

import{URN, VIEW_ORDER} from '../actionCreators/index';

export function getViewOrder(){
    const request = axios.get(`${URN}/viewOrders`)
    .then((response =>response.data))

    return {
        type: VIEW_ORDER,
        payload:request
    }
}

