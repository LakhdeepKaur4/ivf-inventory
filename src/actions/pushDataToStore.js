import {GET_FILTER_PRODUCTS,GET_STORES} from '../actionCreators/index';
import axios from 'axios';

export function getProducts(URL){
    const request = axios.get(`${URL}/products`)
    .then((response => response.data))

    return {
        type: GET_FILTER_PRODUCTS,
        payload:request
    }
}
export function getStores(URL){
    const request = axios.get(`${URL}/dataToStore`)
    .then((response => response.data))

    return {
        type: GET_STORES,
        payload:request
    }
}