import axios from 'axios';
import { toasterMessage } from '../utils.js';

import{URL,BRANDS_LIST,ADD_BRAND,DISABLE_BRAND,
    ENABLE_BRAND,BRAND_DETAIL,UPDATE_BRAND_DETAILS} from '../actionCreators/index';

export function getBrands(){
    return (dispatch)=>{
        axios.get(URL)
        .then(response=>{
            dispatch({type:BRANDS_LIST,payload:response.data})
        })
        .catch(err=>{
            toasterMessage("error",err);
        })
    }
}

export function addBrand(data){
    return(dispatch)=>{
        axios
        .post(URL,data)
        .then(response => {
            if(response.status===200 &&response.data.message==='Successful creation'){
                toasterMessage('success',response.data.message);
                dispatch({ type: ADD_BRAND, payload:true });
                dispatch(getBrands())
            }
               
        })
        .catch(err => {
       toasterMessage("error",err);
           
        });
    }
}

export function enableBrand(id){
    return(dispatch)=>{
        axios
        .put(`${URL}/enable/${id}`)
        .then(response => {
            if(response.status===200 &&response.data.message==='Brand enabled'){
                toasterMessage('success',response.data.message);
                dispatch({ type: ENABLE_BRAND, payload:true });
                dispatch(getBrands())
            }
               
        })
        .catch(err => {
       toasterMessage("error",err);
           
        });
    }
}


export function disableBrand(id){
    return(dispatch)=>{
        axios
        .put(`${URL}/disable/${id}`)
        .then(response => {
            if(response.status===200 &&response.data.message==='Brand disabled'){
                toasterMessage('success',response.data.message);
                dispatch({ type: DISABLE_BRAND, payload:true });
                dispatch(getBrands())
            }
               
        })
        .catch(err => {
              toasterMessage("error",err);
             
        });
    }
}


export function getBrandDetails(id){
    return(dispatch)=>{
        axios.get(`${URL}/brand/${id}`)
        .then(response=>{
            dispatch({type:BRAND_DETAIL,payload:response.data.brand})

        })
        .catch(err => {
            toasterMessage("error",err);
           
      });
    }
}

export  function updateBrandDetails(data,id){
    console.log('inside updateBrandDetails func ')
    return (dispatch)=>{
        axios.put(`${URL}/${id}`,data)
        .then(response=>{
            console.log('response update details....', response)
            if(response.status===200 && response.data.message==='Brand updated'){
                toasterMessage('success',response.data.message);
                dispatch({type:UPDATE_BRAND_DETAILS,payload:true})
                dispatch(getBrands())
            }
        })
        .catch(err => {
            toasterMessage("error",err);
           
      });
    }

}