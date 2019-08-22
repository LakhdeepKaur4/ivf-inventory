import { CREATE_PRODUCT,POST_CREATE_PRODUCT, BRAND_PRODUCT, PRODUCT_DATA, PRODUCT_VARIANT } from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case CREATE_PRODUCT:
         return{...state, getProduct:action.payload}

        case BRAND_PRODUCT:
            return{...state, brandsList:action.payload}

        case PRODUCT_DATA:
            return{...state, productData:action.payload}
        
        case PRODUCT_VARIANT:
            return{...state, productVariant:action.payload}

        case POST_CREATE_PRODUCT:
            return{...state, postProduct:action.payload}
         
         default:
         return state;
    }
}