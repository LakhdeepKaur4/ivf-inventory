import { combineReducers } from 'redux';
import ViewOrderReducer from './viewOrderReducer/viewOrderReducer';
import BrandsReducer from './brandsReducer/brandsReducer'
import AddProductReducer from './addProductReducer/addProductReducer';
import ThemeReducer from './themesReducer/themesReducer';
import StoreProfileReducer from './storeProfileReducer/storeProfileReducer';
import EditOrderReducer from './editAnOrderReducer/editAnOrderReducer';
import ProductsViewReducer from './productsViewReducer/productsViewReducer';
<<<<<<< HEAD
import CreateCategory from './createCategory/createCategory';
=======
import EditCustomerOrderReducer from './editCustomerOrderReducer/editCustomerOrderReducer';
>>>>>>> e188360c52bd710aeb0d3db1c3683f73f0298fd5

const rootReducer = combineReducers({
   ViewOrderReducer,
   AddProductReducer,
   ThemeReducer,
   StoreProfileReducer,
   BrandsReducer,
   EditOrderReducer,
   ProductsViewReducer,
<<<<<<< HEAD
   CreateCategory 
=======
   EditCustomerOrderReducer

>>>>>>> e188360c52bd710aeb0d3db1c3683f73f0298fd5
})
export default rootReducer;