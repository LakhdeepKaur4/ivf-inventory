import axios from 'axios';
import { toasterMessage } from "../utils.js";
import { ADD_CUSTOMER, GET_CUSTOMER, GET_ORDER_DETAILS, GET_ORDER_ADDRESS } from '../actionCreators/index';

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

export function getOrderAddress(URL, orderId) {
    return (dispatch) => {
        axios.get(`${URL}/api/orders/customer/address/${orderId}`)
            .then((response => {

                if (!response.data || !response.data.address) {
                    dispatch({
                        type: GET_ORDER_ADDRESS,
                        payload: null
                    })
                    return;
                }
                else {
                    dispatch({
                        type: GET_ORDER_ADDRESS,
                        payload: response.data.address
                    })
                }
            }))
    }
}


export function addCustomer(URL, payload,orderId) {
    return (dispatch) => {
        axios.post(`${URL}/api/customer`, payload)
            .then((response => {
                if(response.status===200 && response.data.message==='Customer created successfully'){
                    dispatch({type:ADD_CUSTOMER, payload:response.data.customer})
                    toasterMessage("success", response.data.message);
                    dispatch(addCustomerInOrder(URL,response.data.customer.customerId,orderId))
                }
            }))
            .catch((err) => {   

                if (err.isAxiosError) {
                    toasterMessage("error", 'ERROR ADDING CUSTOMER');
                }
                else {
                    toasterMessage("error", err);
                }
            })
    }
}

export function getCustomer(URL, search) {
    return (dispatch) => {
        axios.get(`${URL}/api/customer?search=${search}`)
            .then((response => {
                if (!response.data.customer || response.data.customer.length == 0) {
                    dispatch({
                        type: GET_CUSTOMER,
                        payload: []
                    })
                    return;
                }
                else {
                    dispatch({
                        type: GET_CUSTOMER,
                        payload: response.data.customer
                    })
                }
            }))
    }

}

//Add customer to an order

export function addCustomerInOrder(URL,customerId,orderId){
    return(dispatch)=>{
        axios.put(`${URL}/api/customer/${orderId}/${customerId}`)
        .then(response=>{
            dispatch(getOrderDetail(URL, orderId))
        })
    }
}