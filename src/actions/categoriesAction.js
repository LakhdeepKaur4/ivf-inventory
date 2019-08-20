import axios from 'axios';
import {URN, VIEW_CATEGORY} from '../actionCreators/index'

export function viewCategory(){
 const request= axios.get(`${URN}/category`)
 .then((response=>response.data))
    return {
        type:VIEW_CATEGORY,
        payload:request
    }
}