import {ADD_CUSTOMER,GET_CUSTOMER} from '../../actionCreators/index';

export default function(state={},action){
    console.log('inside reducer....', action.payload)
    
    switch(action.type){

        case ADD_CUSTOMER:
        return{...state, add:action.payload}
        
        case GET_CUSTOMER:
            return{...state, 
                view:action.payload}
         default:
         return state;
    }
}