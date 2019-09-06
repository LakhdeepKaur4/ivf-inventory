export default function loaderReducer(state = {
    showLoader:false
},action){
    switch(action.type){
        case 'SET_LOADER':
            return {
                ...state,
                showLoader:true
            }
        case 'RESET_LOADER':
            return {
                ...state,
                showLoader: false
            };
        default:
            return state;
    }
}