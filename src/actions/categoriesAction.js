import axios from 'axios';
import {VIEW_CATEGORY} from '../actionCreators/index'

export function viewCategory(URL,pageNo=1,limit=5){
 const request= axios.get(`${URL}/api/category/${pageNo}/${limit}`)
 .then((response=>response.data))
    return {
        type:VIEW_CATEGORY,
        payload:request
    }
}