import axios from 'axios';

import{URN, DATA_TO_STORE} from '../actionCreators/index';

export function getDataStore(){
    const request = axios.get(`${URN}/dataToStore`)
    .then((response =>response.data))

    return {
        type: DATA_TO_STORE,
        payload:request
    }
}

