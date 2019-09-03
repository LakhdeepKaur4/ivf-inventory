import axios from 'axios';

import{ PRODUCTS_VIEW,MOCK_PRODUCTS_VIEW} from '../actionCreators/index';

export function getProductsView(URL, categoryId=null,defaultPage,limit){
    let url = `${URL}/api/item/${defaultPage}/${limit}`;
    if(categoryId){
        url = `${URL}/api/item/category/${categoryId}`;
    }
    const request = axios.get(url)
    .then((response =>{
     return categoryId?response.data.items.docs:response.data
        
    }))

    return {
        type: PRODUCTS_VIEW,
        payload:request
    }
}
export function getMockProductsView(URL,defaultPage,limit){
        let url = `${URL}/api/item/${defaultPage}/${limit}`

    const request = axios.get(url)
    .then((response =>{
      return response.data   
    }))

    return {
        type: MOCK_PRODUCTS_VIEW,
        payload:request
    }
}
