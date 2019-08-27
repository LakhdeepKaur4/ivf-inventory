import { GET_STORES } from '../../actionCreators/index';
let initialState = {
    stores:[]
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_STORES:
         return{...state, stores:action.payload}
        default:
         return state;
    }
}