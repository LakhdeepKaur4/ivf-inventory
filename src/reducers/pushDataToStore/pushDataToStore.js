import {GET_FILTER_PRODUCTS,GET_STORES} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case GET_FILTER_PRODUCTS:
         return{...state, getFilterProducts:action.payload}

        case GET_STORES:
            return{...state, getStores:action.payload}
         
         default:
         return state;
    }
}