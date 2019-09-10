import axios from 'axios';
import { toasterMessage } from "../utils.js";

import{SEARCH_KEYWORD,SHOP_LIST,SERACH_RESULT} from '../actionCreators/index';

// Get search keywords
export function searchKeyword(data) {
    return dispatch => {
            dispatch({ type: SEARCH_KEYWORD, payload: data });
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
  .get(`${url}/api/orders/advancedSearch?searchTxt=${data.searchTxt}&orderStatus=${data.orderStatus}&paymentOption=${data.paymentOption}&orderId=${data.orderId}&orderStart=${data.orderStart}&orderEnd=${data.orderEnd}&createStartDate=${data.createStartDate}&createEndDate=${data.createEndDate}&updateStartDate=${data.updateStartDate}&updateEndDate=${data.updateEndDate}&shop=${data.shop}`)
  .then(response=>{
    if(response.data.orders.length===0){
      toasterMessage("success", response.data.message);
    }
    dispatch({type:SERACH_RESULT, payload:response.data.orders})
  })
}
  }