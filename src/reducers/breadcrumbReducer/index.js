import { SET_BREADCRUMB } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {
        case SET_BREADCRUMB:
            return { ...state, breadCrumb: action.payload }

        default:
            return state;
    }
}