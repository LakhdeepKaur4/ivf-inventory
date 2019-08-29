import axios from 'axios';

import{ PRODUCTS_VIEW,MOCK_PRODUCTS_VIEW} from '../actionCreators/index';

export function getProductsView(URL, categoryId=null,defaultPage){
    console.log(categoryId);
    let url = `${URL}/api/item/${defaultPage}`;
    if(categoryId){
        url = `${URL}/api/item/category/${categoryId}`;
    }

    const request = axios.get(url)
    .then((response =>{
     return categoryId?response.data.item:response.data
        
    }))

    return {
        type: PRODUCTS_VIEW,
        payload:request
    }
}
export function getMockProductsView(URL,defaultPage){
        let url = `${URL}/api/item/${defaultPage}`

    const request = axios.get(url)
    .then((response =>{
      return response.data   
    }))

    return {
        type: MOCK_PRODUCTS_VIEW,
        payload:request
    }
}
