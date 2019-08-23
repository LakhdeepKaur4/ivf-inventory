import axios from 'axios';
import {URL, VIEW_CATEGORY} from '../actionCreators/index'

export function viewCategory(){
 const request= axios.get(`${URL}/category`)
 .then((response=>response.data))
    return {
        type:VIEW_CATEGORY,
        payload:request
    }
}