import axios from 'axios';

import{GET_BLOG} from '../actionCreators/index';

export function getBlog(URL){
    const request = axios.get(`${URL}/blog`)
    .then((response =>response.data))
    return {
        type: GET_BLOG,
        payload:request
    }
}
