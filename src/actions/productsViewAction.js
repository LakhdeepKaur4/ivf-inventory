import axios from 'axios';

import{ PRODUCTS_VIEW} from '../actionCreators/index';

export function getProductsView(URL, categoryId=null){
    let url = `${URL}/products`;
    if(categoryId){
        url = `${URL}/api/item/category/${categoryId}`;
    }

    const request = axios.get(url)
    .then((response =>{
        console.log("response ",categoryId?response.data.item:response.data);
     return categoryId?response.data.item:response.data
        
    }))

    return {
        type: PRODUCTS_VIEW,
        payload:request
    }
}
