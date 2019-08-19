import { CREATE_PRODUCT,POST_CREATE_PRODUCT } from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case CREATE_PRODUCT:
         return{...state, getProduct:action.payload}

         case POST_CREATE_PRODUCT:
            return{...state, postProduct:action.payload}
         
         default:
         return state;
    }
}