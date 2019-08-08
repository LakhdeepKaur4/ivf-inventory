import {PRODUCTS_VIEW} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case PRODUCTS_VIEW:
         return{...state, productList:action.payload}
         
         default:
         return state;
    }
}