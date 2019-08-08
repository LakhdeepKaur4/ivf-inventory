import axios from 'axios';

import{URN, EDIT_ORDER} from '../actionCreators/index';

export function getEditOrder(){
    const request = axios.get(`${URN}/editOrder`)
    .then((response =>response.data))
    return {
        type: EDIT_ORDER,
        payload:request
    }
}
