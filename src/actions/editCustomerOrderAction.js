import axios from 'axios';

import { ADD_CUSTOMER, GET_CUSTOMER } from '../actionCreators/index';



export function addCustomer(URL,payload) {
console.log('inside addCustomer')
    
    const request = axios.post(`${URL}/api/customer`, payload)
        .then((response => response.data))
    return {
        type: ADD_CUSTOMER,
        payload: request
    }
}

export function getCustomer(URL, search) {
    console.log('inside getCustomer action...')
    const request = axios.get(`${URL}/api/customer?search=${search}`)
        .then((response => response.data))
    return {
        type: GET_CUSTOMER,
        payload: request
    }
}
