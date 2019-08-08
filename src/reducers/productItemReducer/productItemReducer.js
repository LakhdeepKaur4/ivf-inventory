import { PRODUCT_ITEM } from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case PRODUCT_ITEM:
         return{...state, productItem:action.payload}
         
         default:
         return state;
    }
}