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
import CreateProductReducer from './createProductReducer/createProductReducer';
import PushDataToStore from './pushDataToStore/pushDataToStore';
import BlogReducer from './blogReducer/blogReducer';
import catogoriesReducer from './catogoriesReducer/catogoriesReducer';
import StoresReducer from './storesReducer/storesReducer'

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
   PushDataToStore,
   BlogReducer,
   CreateProductReducer,
   catogoriesReducer,
   StoresReducer
})
export default rootReducer;