import axios from 'axios';

import{ EDIT_ORDER } from '../actionCreators/index';

export function getEditOrder(URL){
    const request = axios.get(`${URL}/api/editOrder`)
    .then((response =>response.data))
    return {
        type: EDIT_ORDER,
        payload:request
    }
}
