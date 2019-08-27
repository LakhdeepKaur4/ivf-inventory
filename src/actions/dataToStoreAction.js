import axios from 'axios';

import{ DATA_TO_STORE} from '../actionCreators/index';

export function getDataStore(URL){
    const request = axios.get(`${URL}/dataToStore`)
    .then((response =>response.data))

    return {
        type: DATA_TO_STORE,
        payload:request
    }
}

