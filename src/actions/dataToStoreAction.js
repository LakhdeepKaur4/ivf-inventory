import axios from 'axios';
import { toasterMessage } from "../utils.js"

import{ DATA_TO_STORE} from '../actionCreators/index';

export function getDataStore(URL){
    const request = axios.get(`${URL}/provision/instances`)
    .then((response =>{
        if(!response.headers['content-type'].includes('json')){
            throw('ERROR FETCHING RECORDS');
            return;
        }
      return  response
        
    })).catch(err=>{console.log('errrrrrrr',err)
        if(err.isAxiosError){
            toasterMessage("error", 'ERROR FETCHING RECORDS');
        }
        else{
            toasterMessage("error", err);
        }
    });  

    return {
        type: DATA_TO_STORE,
        payload:request
    }
}

