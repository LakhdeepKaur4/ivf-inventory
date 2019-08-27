import axios from 'axios';

import { toasterMessage } from "../utils.js";
import{GET_STORES} from '../actionCreators/index';

export function getStores(URL){
    return (dispatch)=>{
        axios.get(`${URL}/stores`)
        .then((response =>response.data))
        .then(stores=>{
            dispatch({
                type: GET_STORES,
                payload:stores
            });
        }).catch(err=>{
            if(err.isAxiosError){
                toasterMessage("error", 'ERROR FETCHING RECORDS');
            }
            else{
                toasterMessage("error", err);
            }
        });  
    }
};

