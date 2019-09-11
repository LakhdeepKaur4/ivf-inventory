import {SEARCH_KEYWORD,SHOP_LIST,SERACH_RESULT} from '../../actionCreators/index';
const initialState={
    viewOrder:[],
    seachKeyword:'',
    isSearchKeywordReceived:false,
    shopList:''
}

const ViewOrderReducer=(state=initialState,action)=>{
    switch(action.type){
        case SEARCH_KEYWORD:{
            return{
                ...state,
                seachKeyword:action.payload,
                isSearchKeywordReceived:true
            }
        }
        case SHOP_LIST:{
            return{
                ...state,
                shopList:action.payload
            }
        }
        case SERACH_RESULT:{
            return{
                ...state,
                viewOrder:action.payload
            }
        }
        default:
            return state;
    }
}
export default ViewOrderReducer