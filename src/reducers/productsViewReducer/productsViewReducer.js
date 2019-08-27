import {PRODUCTS_VIEW,MOCK_PRODUCTS_VIEW} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case PRODUCTS_VIEW:
         return{...state, productList:action.payload}

        case MOCK_PRODUCTS_VIEW:
            return{...state, productListMock:action.payload} 
         
         default:
         return state;
    }
}