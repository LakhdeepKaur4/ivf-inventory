import axios from 'axios';
import { toasterMessage } from "../utils.js";

import{VIEW_ORDER, SEARCH_KEYWORD,SHOP_LIST,SERACH_RESULT} from '../actionCreators/index';

// Get search keywords
export function searchKeyword(data) {
    return dispatch => {
            dispatch({ type: SEARCH_KEYWORD, payload: data });
    };
  }
  
  // Get all orders
export function getViewOrder(url) {
    return dispatch => {
      axios
        .get(`${url}/api/orders/all`)
        .then(response => {
            dispatch({ type: VIEW_ORDER, payload: response.data });
        })
        .catch(err => {
          toasterMessage("error", err);
        });
    };
  }

  // get list of shops
  export function getShopList(url){
    return dispatch=>{
      axios
      .get(`${url}/provision/instances`)
      .then(response=>{
        dispatch({type:SHOP_LIST,payload:response.data.data})
      })
    }
  }

  //Get Search result

  export function getSearchResult(url,data){
  return dispatch=>{
  axios
  .get(`${url}/api/orders/advancedSearch?orderStatus=${data.orderStatus}&orderStart=80`)
  .then(response=>{
    dispatch({type:SERACH_RESULT, payload:response.data.orders})
  })
}
  }