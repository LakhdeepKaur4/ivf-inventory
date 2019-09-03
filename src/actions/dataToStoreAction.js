import axios from 'axios';

import{ DATA_TO_STORE} from '../actionCreators/index';

export function getDataStore(URL){
    console.log(URL)
    const request = axios.get(`${URL}/provision/instances`)
    .then((response =>response))

    return {
        type: DATA_TO_STORE,
        payload:request
    }
}

