import axios from 'axios';

import{ADD_CUSTOMER,GET_CUSTOMER} from '../actionCreators/index';



export function addCustomer(URL,name,surname,email,address,city,region,postalCode,phone){console.log(name,surname,email,address,city,region,postalCode,phone)
    
    const obj = {name,surname,email,address:{
        address1:address,
        city,region,postalCode
    },phone}
    const request =axios.post(`${URL}/api/customer`,obj)
    .then((response =>response.data))
    return {
        type: ADD_CUSTOMER,
        payload:request
    }
}

export function getCustomer(URL,search){console.log(search)
    const request = axios.get(`${URL}/api/customer?search=${search}`)
    .then((response =>response.data))
    return {
        type: GET_CUSTOMER,
        payload:request
    }
}
