import {URN,GET_FILTER_PRODUCTS,GET_STORES} from '../actionCreators/index';
import axios from 'axios';

export function getProducts(){
    console.log('hiii action');
    const request = axios.get(`${URN}/products`)
    .then((response => response.data))

    return {
        type: GET_FILTER_PRODUCTS,
        payload:request
    }
}
export function getStores(){
    console.log('hiii action');
    const request = axios.get(`${URN}/dataToStore`)
    .then((response => response.data))

    return {
        type: GET_STORES,
        payload:request
    }
}