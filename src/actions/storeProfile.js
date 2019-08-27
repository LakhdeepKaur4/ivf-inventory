import axios from 'axios';

import{GET_COUNTRY,GET_CURRENCY} from '../actionCreators/index';

export function getCountry(URL){
    console.log(URL)
    const request = axios.get(`${URL}/country`)
    .then((response =>response.data))

    return {
        type: GET_COUNTRY,
        payload:request
    }
}

export function getCurrency(URL){
    console.log(URL)
    const request = axios.get(`${URL}/Currencies`)
    .then((response =>response.data))

    return {
        type: GET_CURRENCY,
        payload:request
    }
}