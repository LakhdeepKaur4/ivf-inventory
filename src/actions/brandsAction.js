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
  CHANGE_STATUS,
  GET_PAGE_DETAIL,
  GET_ACTIVE_PAGE_DETAIL
} from "../actionCreators/index";

// Get all brands
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

// Get list of brands on default page
export function getDefaultPageBrandsDetails(defaultPage) {
  return dispatch => {
    axios
      .get(`${BRANDURL}/${defaultPage}`)
      .then(response => {
        dispatch({ type: GET_PAGE_DETAIL, payload: response.data });
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Get brands on active page
export function getActivePageBrandsDetails(pageNumber) {
  return dispatch => {
    axios
      .get(`${BRANDURL}/${pageNumber}`)
      .then(response => {
        dispatch({ type: GET_ACTIVE_PAGE_DETAIL, payload: response.data.brands.docs });
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Add brands
export function addBrand(data) {
  return dispatch => {
    axios
      .post(BRANDURL, data)
      .then(response => {
        if (
          response.status === 201 &&
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

// Enable brand status
export function enableBrand(id,currentPage) {
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
         if (currentPage===1) {
           dispatch(getDefaultPageBrandsDetails(currentPage))
         } else {
           dispatch(getActivePageBrandsDetails(currentPage))
         }
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Disable brands status
export function disableBrand(id,currentPage) {
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
          if (currentPage===1) {
            dispatch(getDefaultPageBrandsDetails(currentPage))
          } else {
            dispatch(getActivePageBrandsDetails(currentPage))
          }
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Get details of a brand
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

// Update brand details
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

// Change status of multiple brands
export function changeStatus(value, ids,currentPage) {
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
          if (currentPage===1) {
            dispatch(getDefaultPageBrandsDetails(currentPage))
          } else {
            dispatch(getActivePageBrandsDetails(currentPage))
          }
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}
