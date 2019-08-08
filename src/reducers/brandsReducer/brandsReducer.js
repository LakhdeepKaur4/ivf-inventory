import {BRANDS_LIST,ADD_BRAND,DELETE_BRAND,DISABLE_BRAND,
    ENABLE_BRAND,BRAND_DETAIL,UPDATE_BRAND_DETAILS} from '../../actionCreators/index';

const initialState = {
    brandsList: '',
    isNewBrandAdd:false,
    isBrandDeleted:false,
    isBrandDisable:false,
    isBrandEnable:false,
    brandDetail:{},
    isBrandUpdate:false,
};

const BrandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BRANDS_LIST: {
            
            return {
                ...state,
                brandsList: action.payload.brands
            };
        }
        case ADD_BRAND: {
           
            return {
                ...state,
                isNewBrandAdd:action.payload
            };
        }
        case DELETE_BRAND:{
            return{
                ...state,
                isBrandDeleted:action.payload
            }
        }
        case DISABLE_BRAND:{
            return{
                ...state,
                isBrandDisable:action.payload
            }

        }
        case ENABLE_BRAND:{
            return{
                ...state,
                isBrandEnable:action.payload
            }
        }
        case BRAND_DETAIL:{
            return{
                ...state,
                brandDetail:action.payload

            }
        }
        case UPDATE_BRAND_DETAILS:{
            return {
                ...state,
                isBrandUpdate:action.payload
            }
        }
        default:
            return state;
    }
};

export default BrandsReducer;
