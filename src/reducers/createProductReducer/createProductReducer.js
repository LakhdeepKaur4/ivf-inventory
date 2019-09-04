import { CREATE_PRODUCT,POST_CREATE_PRODUCT, BRAND_PRODUCT, PRODUCT_DATA, PRODUCT_VARIANT,UPDATE_PRODUCT, UPDATE_VARIANT, UPDATE_PRODUCT_ID } from '../../actionCreators/index';
export default function(state={productVariant:[]},action){
    switch(action.type){
        case UPDATE_PRODUCT_ID:
            return { ...state, getProductInfo:action.payload }
        case CREATE_PRODUCT:
         return{...state, getProduct:action.payload}

        case BRAND_PRODUCT:
            return{...state, brandsList:action.payload}

        case PRODUCT_DATA:
            return{...state, productData:action.payload}

        case UPDATE_PRODUCT:
             return{...state, productData:action.payload}
        
        case PRODUCT_VARIANT:
            return{...state, productVariant:[...state.productVariant, action.payload]}

        case UPDATE_VARIANT:
            return{...state, productVariant:action.payload}

        case POST_CREATE_PRODUCT:
            return{...state, product: action.payload}
         
         default:
         return state;
    }
}