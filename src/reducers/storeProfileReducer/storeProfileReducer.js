import {GET_COUNTRY,GET_CURRENCY} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case GET_COUNTRY:
         return{...state, getCountry:action.payload}

        case GET_CURRENCY:
            return{...state, getCurrency:action.payload}
         
         default:
         return state;
    }
}