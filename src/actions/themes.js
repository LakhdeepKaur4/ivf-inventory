import axios from 'axios';

import{ THEME_ORDER} from '../actionCreators/index';

export function themes(URL){
    
    const request = axios.get(`${URL}/themes`)
    .then((response =>response.data))

    return {
        type: THEME_ORDER,
        payload:request
    }
}