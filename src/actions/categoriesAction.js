import axios from 'axios';
import {
  VIEW_CATEGORY
} from '../actionCreators/index';
import { toasterMessage } from "../utils";

//Fetch Category
export function viewCategory(URL, pageNo = 1, limit = 5) {
  const request = axios.get(`${URL}/api/category/${pageNo}/${limit}`)
    .then((response => response.data))
    .catch(err => {
      if (err.isAxiosError) {
        toasterMessage("error", 'ERROR FETCHING RECORDS');
      }
      else {
        toasterMessage("error", err);
      }
    });
  return {
    type: VIEW_CATEGORY,
    payload: request
  }
}


//Change multiple 
export function changeStatus(value, ids, pageNo, URL) {
  let payload = {
    status: value,
    ids: ids
  };
  return dispatch => {
    return axios
      .put(`${URL}/api/category/multiSelect/changeStatus`, payload)
      .then(response => {
        if (response.status === 200) {
          toasterMessage("success", response.data.message);
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  }
}

// Enable categories status
export function enableCategory(id, pageNo, URL) {
  return dispatch => {
    return axios
      .put(`${URL}/api/category/enable/${id}`)
      .then(response => {
        if (
          response.status === 200
        ) {
          toasterMessage("success", response.data.message);
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      }); changeStatus
  };
}

// Disable Categories status
export function disableCategory(id, pageNo, URL) {
  return dispatch => {
    return axios
      .put(`${URL}/api/category/disable/${id}`)
      .then(response => {
        if (response.status === 200) {
          toasterMessage("success", response.data.message);
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}
