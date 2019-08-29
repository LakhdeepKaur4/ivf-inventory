import { PRODUCT_ITEM, SEARCH } from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case PRODUCT_ITEM:
         return{...state, productItem:action.payload}
         
         case SEARCH:
            return{...state, search:action.payload}
            
         default:
         return state;
    }
}