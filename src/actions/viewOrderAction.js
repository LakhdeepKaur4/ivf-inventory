import axios from 'axios';
import { toasterMessage } from "../utils.js";

import{VIEW_ORDER, SEARCH_KEYWORD} from '../actionCreators/index';

// Get search keywords
export function searchKeyword(data) {
    return dispatch => {
            dispatch({ type: SEARCH_KEYWORD, payload: data });
    };
  }
  
  // Get all orders
export function getViewOrder(URL) {
    return dispatch => {
      axios
        .get(`${URL}/api/orders/all`)
        .then(response => {
            dispatch({ type: VIEW_ORDER, payload: response.data });
        })
        .catch(err => {
          toasterMessage("error", err);
        });
    };
  }