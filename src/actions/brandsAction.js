import axios from "axios";
import { toasterMessage } from "../utils.js";

import {
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
export function getBrands(URL) {
  
  return dispatch => {
    axios
      .get(`${URL}/api/brands`)
      .then(response => {
          dispatch({ type: BRANDS_LIST, payload: response.data });
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Get list of brands on default page
export function getDefaultPageBrandsDetails(defaultPage,url) {
  return dispatch => {
    axios
      .get(`${url}/api/brands/${defaultPage}`)
      .then(response => {
        dispatch({ type: GET_PAGE_DETAIL, payload: response.data });
      })
      .catch(err => {
        if(err.isAxiosError){
          toasterMessage("error", 'ERROR FETCHING RECORDS');
      }
      else
        toasterMessage("error", err);
      });
  };
}

// Get brands on active page
export function getActivePageBrandsDetails(pageNumber,url) {
  return dispatch => {
    axios
      .get(`${url}/api/brands/${pageNumber}`)
      .then(response => {
        if(response.status===200 || response.status===201){
          dispatch({ type: GET_ACTIVE_PAGE_DETAIL, payload: response.data.brands.docs });
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Add brands
export function addBrand(data,url,page) {
  return dispatch => {
    axios
      .post(`${url}/api/brands`, data)
      .then(response => {
        if (
          response.status===201||response.status===200 &&
          response.data.message==="Successful creation"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: ADD_BRAND, payload: true });
          if(page===1){
            dispatch(getDefaultPageBrandsDetails(page,url))
          }
          else{
            dispatch(getActivePageBrandsDetails(page,url))
          }
          
        }
        
      })
      .catch(err => {
        if(err.isAxiosError){
          toasterMessage("error", 'ERROR FETCHING RECORDS');
      }
      else if(err.response.status===400){
        toasterMessage("error",err.response.data.message);
      }
       
      });
  };
}

// Enable brand status
export function enableBrand(id,currentPage,url) {
  return dispatch => {
    axios
      .put(`${url}/api/brands/enable/${id}`)
      .then(response => {
        if (
          response.status===200 ||response.status===201 &&
          response.data.message==="Brand enabled"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: ENABLE_BRAND, payload: true });
         if (currentPage===1) {
           dispatch(getDefaultPageBrandsDetails(currentPage,url))
         } else {
           dispatch(getActivePageBrandsDetails(currentPage,url))
         }
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });changeStatus
  };
}

// Disable brands status
export function disableBrand(id,currentPage,url) {
  return dispatch => {
    axios
      .put(`${url}/api/brands/disable/${id}`)
      .then(response => {
        if (
          response.status===201 || response.status===200 &&
          response.data.message==="Brand disabled"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: DISABLE_BRAND, payload: true });
          if (currentPage===1) {
            dispatch(getDefaultPageBrandsDetails(currentPage,url))
          } else {
            dispatch(getActivePageBrandsDetails(currentPage,url))
          }
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Get details of a brand
export function getBrandDetails(id,url) {
  return dispatch => {
    axios
      .get(`${url}/api/brands/brand/${id}`)
      .then(response => {
        dispatch({ type: BRAND_DETAIL, payload: response.data.brand });
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Update brand details
export function updateBrandDetails(data,id,url) {
  console.log(url,data);
  return dispatch => {
    axios
      .put(`${url}/api/brands/${id}`, data)
      .then(response => {
        console.log(response)
        if (
          response.status===200 || response.status===201 &&
          response.data.message==="Brand updated"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: UPDATE_BRAND_DETAILS, payload: response.data });
          dispatch(getDefaultPageBrandsDetails(1,url));
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}

// Change status of multiple brands
export function changeStatus(value, ids,currentPage,url) {
  let payload = {
    status: value,
    ids: ids
  };
  return dispatch => {
    axios
      .put(`${url}/api/brands/multiselect`, payload)
      .then(response => {
        if (
          (response.status===200 || response.status===201 &&
            response.data.message==="Brands disabled successfully") ||
          response.data.message==="Brands enabled successfully"
        ) {
          toasterMessage("success", response.data.message);
          dispatch({ type: CHANGE_STATUS, payload: true });
          if (currentPage===1) {
            dispatch(getDefaultPageBrandsDetails(currentPage,url))
          } else {
            dispatch(getActivePageBrandsDetails(currentPage,url))
          }
        }
      })
      .catch(err => {
        toasterMessage("error", err);
      });
  };
}
