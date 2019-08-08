import axios from 'axios';

import{URN, GET_CITY,ADD_CUSTOMER,GET_CUSTOMER} from '../actionCreators/index';

export function getCity(){
    const request = axios.get(`${URN}/city`)
    .then((response =>response.data))
    return {
        type: GET_CITY,
        payload:request
    }
}

export function addCustomer(name,surname,email,address,city,region,postalCode,phone,rememberMe){
    const obj = {name,surname,email,address,city,region,postalCode,phone,rememberMe}
    const request =axios.post(`${URN}/newCustomer`,obj)
    .then((response =>response.data))
    return {
        type: ADD_CUSTOMER,
        payload:request
    }
}

export function getCustomer(){
    const request = axios.get(`${URN}/newCustomer`)
    .then((response =>response.data))
    return {
        type: GET_CUSTOMER,
        payload:request
    }
}
