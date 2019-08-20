import {GET_BLOG} from '../../actionCreators/index';

export default function(state={},action){
    
    switch(action.type){

        case GET_BLOG:
            return{...state, blog:action.payload}
         default:
         return state;
    }
}