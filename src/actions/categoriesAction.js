import axios from 'axios';
import {VIEW_CATEGORY} from '../actionCreators/index'

export function viewCategory(URL){
    console.log(URL)
 const request= axios.get(`${URL}/api/category`)
 .then((response=>response.data))
    return {
        type:VIEW_CATEGORY,
        payload:request
    }
}