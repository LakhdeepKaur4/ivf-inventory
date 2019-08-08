import {GET_INITIAL_CATEGORY,GET_PARTICULAR_CATEGORY,GET_SUB_CATEGORY} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case GET_INITIAL_CATEGORY:
         return{...state, initialCategory:action.payload}

        case GET_PARTICULAR_CATEGORY:
            return{...state, getParticularCategory:action.payload}

        case GET_SUB_CATEGORY:
            return{...state,getSubCategory:action.payload}
         
         default:
         return state;
    }
}