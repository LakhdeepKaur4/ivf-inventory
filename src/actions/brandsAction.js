import axios from "axios";
import { toasterMessage } from "../utils.js";

import {
  BRANDURL,
  BRANDS_LIST,
  ADD_BRAND,
  DISABLE_BRAND,
  ENABLE_BRAND,
  BRAND_DETAIL,
  UPDATE_BRAND_DETAILS,
  CHANGE_STATUS
} from "../actionCreators/index";


export function getBrands() {
  
  return dispatch => {
    axios
      .get(BRANDURL)
      .then(response => {
        dispatch({ type: BRANDS_LIST, payload: response.data });
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

export function addBrand(data) {
  return dispatch => {
    axios
      .post(BRANDURL, data)
      .then(response => {
        if (
          response.status === 200 &&
          response.data.message === "Successful creation"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: ADD_BRAND, payload: true });
          dispatch(getBrands());
        }
        else if( response.status===200 && response.data.message==='Creation error'){
          toasterMessage("error",response.data.message)
        }
      })
      .catch(err => {
        toasterMessage("error",err);
      });
  };
}

export function enableBrand(id) {
  return dispatch => {
    axios
      .put(`${BRANDURL}/enable/${id}`)
      .then(response => {
        if (
          response.status === 200 &&
          response.data.message === "Brand enabled"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: ENABLE_BRAND, payload: true });
          dispatch(getBrands());
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

export function disableBrand(id) {
  return dispatch => {
    axios
      .put(`${BRANDURL}/disable/${id}`)
      .then(response => {
        if (
          response.status === 200 &&
          response.data.message === "Brand disabled"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: DISABLE_BRAND, payload: true });
          dispatch(getBrands());
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

export function getBrandDetails(id) {
  return dispatch => {
    axios
      .get(`${BRANDURL}/brand/${id}`)
      .then(response => {
        dispatch({ type: BRAND_DETAIL, payload: response.data.brand });
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

export function updateBrandDetails(data, id) {
  return dispatch => {
    axios
      .put(`${BRANDURL}/${id}`, data)
      .then(response => {
        if (
          response.status === 200 &&
          response.data.message === "Brand updated"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: UPDATE_BRAND_DETAILS, payload: true });
          dispatch(getBrands());
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

export function changeStatus(value, ids) {
  let payload = {
    status: value,
    ids: ids
  };
  return dispatch => {
    axios
      .put(`${BRANDURL}/multiselect`, payload)
      .then(response => {
        if (
          (response.status === 200 &&
            response.data.message === "Brands disabled successfully") ||
          response.data.message === "Brands enabled successfully"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: CHANGE_STATUS, payload: true });
          dispatch(getBrands());
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}
