import { combineReducers } from 'redux';
import ViewOrderReducer from './viewOrderReducer/viewOrderReducer';
import BrandsReducer from './brandsReducer/brandsReducer'
import AddProductReducer from './addProductReducer/addProductReducer';
import ThemeReducer from './themesReducer/themesReducer';
import StoreProfileReducer from './storeProfileReducer/storeProfileReducer';
import EditOrderReducer from './editAnOrderReducer/editAnOrderReducer';
import ProductsViewReducer from './productsViewReducer/productsViewReducer';
import CreateCategory from './createCategory/createCategory';
import EditCustomerOrderReducer from './editCustomerOrderReducer/editCustomerOrderReducer';
import DataToStoreReducer from './dataToStoreReducer/dataToStoreReducer';
import ProductItemReducer from './productItemReducer/productItemReducer';
const rootReducer = combineReducers({
   ViewOrderReducer,
   AddProductReducer,
   ThemeReducer,
   StoreProfileReducer,
   BrandsReducer,
   EditOrderReducer,
   ProductsViewReducer,
   CreateCategory ,
   EditCustomerOrderReducer,
   DataToStoreReducer,
   ProductItemReducer,
})
export default rootReducer;