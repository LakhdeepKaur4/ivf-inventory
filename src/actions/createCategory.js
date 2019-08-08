import axios from 'axios';

import{URL,GET_INITIAL_CATEGORY,GET_PARTICULAR_CATEGORY,GET_SUB_CATEGORY,ON_SUBMIT} from '../actionCreators/index';

export function GetInitialCategory(){
    console.log('hiii action');
    const request = axios.get(`${URL}/category/initial`)
    .then((response => response.data))

    return {
        type: GET_INITIAL_CATEGORY,
        payload:request
    }
}

export function GetParticularCategory(id){
    console.log('action',id);
    
    const request = axios.get(`${URL}/category/${id}`)
    .then((response => response.data))

    return {
        type: GET_PARTICULAR_CATEGORY,
        payload:request
    }
}

export function GetSubCategory(id){
    console.log('actionsandy',id)

    const request = axios.get(`${URL}/category/${id}`)
    .then((response => response.data))

    return {
        type: GET_SUB_CATEGORY,
        payload:request
    }

}
export function onSubmit(values){
    console.log('actionvaluessssss',values);

    const request = axios.post(`${URL}/category/`,values)
    .then((response => response.data))

    return {
        type: ON_SUBMIT,
        payload:request
    }
}