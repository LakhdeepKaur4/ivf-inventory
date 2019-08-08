import axios from 'axios';

import{URN, ADD_PRODUCT} from '../actionCreators/index';

export const postProduct=(home, title, permalink, subtitle, vendor, price, inventorytosale, inventorystock, description, country, template, sitemap, image, facebook, twitter, pinterest, google,tag,detailname, detailinfo)=>{
    let data = { home, title, permalink, subtitle, vendor, price, inventorytosale, inventorystock, description, country, template, sitemap, image, facebook, twitter, pinterest, google,tag,detailname, detailinfo }
    const request = axios.post(`${URN}/product`, data)
    .then((response =>response.data))

    console.log(request)

    return {
        type: ADD_PRODUCT,
        payload:request
    }
}
