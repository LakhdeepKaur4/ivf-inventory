import {VIEW_ORDER} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case VIEW_ORDER:
         return{...state, viewOrder:action.payload}
         
         default:
         return state;
    }
}