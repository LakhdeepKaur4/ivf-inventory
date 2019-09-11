import { ADD_CUSTOMER, GET_CUSTOMER, GET_ORDER_DETAILS } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {

        case ADD_CUSTOMER:
            return { ...state, add: action.payload }

        case GET_CUSTOMER:
            return {
                ...state,
                view: action.payload
            }
        case GET_ORDER_DETAILS:
            return {
                ...state, orderDetails:action.payload
            }
        default:
            return state;
    }
}