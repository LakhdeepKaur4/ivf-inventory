import {DATA_TO_STORE} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case DATA_TO_STORE:
         return{...state, dataStore:action.payload}
         
         default:
         return state;
    }
}