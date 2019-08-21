import { VIEW_CATEGORY } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {
        case VIEW_CATEGORY:
            return { ...state, categoryData: action.payload }

        default:
            return state;
    }
}