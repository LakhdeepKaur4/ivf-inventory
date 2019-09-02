import axios from 'axios';
import { 
    VIEW_CATEGORY
} from '../actionCreators/index';
import { toasterMessage } from "../utils";

//Fetch Category
export function viewCategory(URL,pageNo=1,limit=5){
 const request= axios.get(`${URL}/api/category/${pageNo}/${limit}`)
 .then((response=>response.data))
    return {
        type:VIEW_CATEGORY,
        payload:request
    }
}

//Enable Category
// export function enableCategory(id,pageNo,URL) {
//     return dispatch => {
//       axios 
//         .put(`${URL}/api/brands/enable/${id}`)
//         .then(response => {
//           if (
//             response.status === 201 &&
//             response.data.message === "Brand enabled"
//           ) {
//             toasterMessage("success", response.data.message);
//             dispatch({ type: ENABLE_BRAND, payload: true });
//            if (currentPage===1) {
//              dispatch(getDefaultPageBrandsDetails(currentPage,url))
//            } else {
//              dispatch(getActivePageBrandsDetails(currentPage,url))
//            }
//           }
//         })
//         .catch(err => {
//           toasterMessage("error", err);
//         });
//     };
//   }


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
          if (
            response.status === 200
          ) {
            
            toasterMessage("success", response.data.message);            
          }
        })
        .catch(err => {
          toasterMessage("error", err);
        });
    }
  }
  
// Enable categories status
export function enableCategory(id,pageNo,URL) {
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
        });changeStatus
    };
}

// Disable Categories status
export function disableCategory(id,pageNo,URL) {
    return dispatch => {
     return axios
        .put(`${URL}/api/category/disable/${id}`)
        .then(response => {
            if (
              response.status === 200
            ) {
              
              toasterMessage("success", response.data.message);            
            }
          })
        .catch(err => {
          toasterMessage("error", err);
        });
    };
  }
