import axios from 'axios';

import{URN, GET_BLOG} from '../actionCreators/index';



export function getBlog(){
    const request = axios.get(`${URN}/blog`)
    .then((response =>response.data))
    return {
        type: GET_BLOG,
        payload:request
    }
}
