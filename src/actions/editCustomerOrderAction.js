import axios from 'axios';
import { toasterMessage } from "../utils.js";
import { ADD_CUSTOMER, GET_CUSTOMER, GET_ORDER_DETAILS } from '../actionCreators/index';

export function getOrderDetail(URL, orderId) {
    return function (dispatch) {
        axios.get(`${URL}/api/orders/${orderId}`)
            .then((response => {
                dispatch({
                    type: GET_ORDER_DETAILS,
                    payload: response.data
                });
            })).catch((err) => {
                dispatch({
                    type: GET_ORDER_DETAILS,
                    payload: null
                });
                if (err.isAxiosError) {
                    toasterMessage("error", 'ERROR FETCHING ORDER DETAILS');
                }
                else {
                    toasterMessage("error", err);
                }
            })

    }
}




export function addCustomer(URL, payload) {

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
