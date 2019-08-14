import { CREATE_PRODUCT } from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case CREATE_PRODUCT:
         return{...state, getProduct:action.payload}
         
         default:
         return state;
    }
}