import { ADD_CUSTOMER, GET_CUSTOMER, GET_ORDER_DETAILS, GET_ORDER_ADDRESS } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {

        case ADD_CUSTOMER:
            return { ...state, add: action.payload }

        case GET_CUSTOMER:
            return {
                ...state,
                existingCustomers: action.payload
            }
        case GET_ORDER_DETAILS:
            return {
                ...state, orderDetails:action.payload
            }
        case GET_ORDER_ADDRESS:
            return {
                ...state, orderAddress:action.payload
            }
        default:
            return state;
    }
}