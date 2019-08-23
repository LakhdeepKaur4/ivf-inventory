import axios from 'axios';

import{URN,ADD_CUSTOMER,GET_CUSTOMER} from '../actionCreators/index';



export function addCustomer(name,surname,email,address,city,region,postalCode,phone){console.log(name,surname,email,address,city,region,postalCode,phone)
    
    const obj = {name,surname,email,address:{
        address1:address,
        city,region,postalCode
    },phone}
    const request =axios.post(`http://192.168.1.104:3003/api/customer`,obj)
    .then((response =>response.data))
    return {
        type: ADD_CUSTOMER,
        payload:request
    }
}

export function getCustomer(search){console.log(search)
    const request = axios.get(`http://192.168.1.104:3003/api/customer?search=${search}`)
    .then((response =>response.data))
    return {
        type: GET_CUSTOMER,
        payload:request
    }
}
