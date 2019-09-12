import { GET_ORDER_DETAILS } from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case GET_ORDER_DETAILS:
         return{...state, orderDataStatus:[action.payload]}

         default:
         return state;
    }
}