import {VIEW_ORDER,SEARCH_KEYWORD} from '../../actionCreators/index';
const initialState={
    viewOrder:[],
    seachKeyword:[],
    isSearchKeywordReceived:false
}

const ViewOrderReducer=(state=initialState,action)=>{
    switch(action.type){
        case VIEW_ORDER:{
            return{
                ...state,
                viewOrder:action.payload
            }
        }
        case SEARCH_KEYWORD:{
            return{
                ...state,
                seachKeyword:action.payload,
                isSearchKeywordReceived:true
            }
        }
        default:
            return state;
    }
}
export default ViewOrderReducer