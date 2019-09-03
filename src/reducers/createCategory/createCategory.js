import {GET_INITIAL_CATEGORY,GET_PARTICULAR_CATEGORY,GET_SUB_CATEGORY} from '../../actionCreators/index';
export default function(state={},action){
    switch(action.type){
        case GET_INITIAL_CATEGORY:
         return{...state, initialCategory:action.payload}

        case GET_PARTICULAR_CATEGORY:{
            let id = action.payload.id;
            let categories = action.payload.data;
            let particularData = state.getParticularCategory;
            particularData[id] = categories;
            return{...state, getParticularCategory:{...particularData}}
        }

        case GET_SUB_CATEGORY:{
            let id = action.payload.id;
            let categories = action.payload.data;
            let subCategData = state.getSubCategory;
            subCategData[id] = categories;
            return{...state,getSubCategory:{...subCategData}}
        }         
         default:
         return state;
    }
}