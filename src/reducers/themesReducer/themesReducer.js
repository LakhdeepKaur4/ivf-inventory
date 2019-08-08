import {THEME_ORDER} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case THEME_ORDER:
         return{...state, themeOrder:action.payload}
         
         default:
         return state;
    }
}