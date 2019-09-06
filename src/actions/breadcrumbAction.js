
import{ SET_BREADCRUMB } from '../actionCreators/index';

export function setBreadCrumb(url){
    return {
        type: SET_BREADCRUMB,
        payload:url
    }
}