import {GET_FILTER_PRODUCTS,GET_STORES} from '../actionCreators/index';
import { toasterMessage } from "../utils.js"
import axios from 'axios';

export function getProducts(URL,productId){
    console.log(URL);
    console.log(productId);
    var arr= productId.map((item)=>{
        return `ids=${item}`
    })
    console.log(arr);
    var newArr= arr.join('&');
    console.log(newArr);
    const request = axios.get(`${URL}/api/item/multiselect/ids?${newArr}`)
    .then((response => response.data)).catch(err=>{
        if(err.isAxiosError){
            console.log('shd');
            toasterMessage("error", 'ERROR FETCHING RECORDS');
        }
        else{
            toasterMessage("error", err);
        }
    });

    return {
        type: GET_FILTER_PRODUCTS,
        payload:request
    }
}
export function getStores(URL){
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',URL)
    const request = axios.get(`${URL}/provision/instances`)
    .then((response => response.data))
    .catch(err=>{
    if(err.isAxiosError){
        toasterMessage("error", 'ERROR FETCHING RECORDS');
    }
    else{
        toasterMessage("error", err);
    }
});

    return {
        type: GET_STORES,
        payload:request
    }
}