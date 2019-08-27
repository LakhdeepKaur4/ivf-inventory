import axios from 'axios';

import{URL,ADD_CUSTOMER,GET_CUSTOMER} from '../actionCreators/index';



export function addCustomer(name,surname,email,address,city,region,postalCode,phone){console.log(name,surname,email,address,city,region,postalCode,phone)
    
    const obj = {name,surname,email,address:{
        address1:address,
        city,region,postalCode
    },phone}
    const request =axios.post(`${URL}/customer`,obj)
    .then((response =>response.data))
    return {
        type: ADD_CUSTOMER,
        payload:request
    }
}

export function getCustomer(search){console.log(search)
    const request = axios.get(`${URL}/customer?search=${search}`)
    .then((response =>response.data))
    return {
        type: GET_CUSTOMER,
        payload:request
    }
}
