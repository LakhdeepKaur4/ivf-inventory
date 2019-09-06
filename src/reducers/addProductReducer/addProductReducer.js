import { ADD_PRODUCT } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return { ...state, postProduct: action.payload }

        default:
            return state;
    }
}