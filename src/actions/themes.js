import axios from 'axios';

import{URN, THEME_ORDER} from '../actionCreators/index';

export function themes(){
    
    const request = axios.get(`${URN}/themes`)
    .then((response =>response.data))

    return {
        type: THEME_ORDER,
        payload:request
    }
}