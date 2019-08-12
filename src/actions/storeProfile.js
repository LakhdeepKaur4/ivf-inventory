import axios from 'axios';

import{URN, GET_COUNTRY,GET_CURRENCY} from '../actionCreators/index';

export function getCountry(){
    const request = axios.get(`${URN}/country`)
    .then((response =>response.data))

    return {
        type: GET_COUNTRY,
        payload:request
    }
}

export function getCurrency(){
    
    const request = axios.get(`${URN}/Currencies`)
    .then((response =>response.data))

    return {
        type: GET_CURRENCY,
        payload:request
    }
}