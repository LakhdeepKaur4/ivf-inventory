import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Brands from './containers/DisplayBrands/displayBrands';
import AdvancedSearch from './containers/advancedSearch/advancedSearch';
import ViewOrder from './containers/viewOrder/viewOrder'
import AddProduct from './containers/addProducts/addProducts'; 
import EditOrder from './containers/editOrder/editOrder';
import Shipping from './containers/shipping/shipping';
import ProductsView from './containers/productsView/productsView';
import Login from './containers/login/login';
import Themes from './containers/Themes/themes';
import StoreProfile from './containers/storeProfile/storeProfile';
import Sidebar from './components/sidebar/sidebar';
import EditCustomerOrder from './containers/editCustomerOrder/editCustomerOrder';
import Products from './containers/products/products';
import AddBrands from './containers/AddBrands/addBrands'
import AddCategory from './containers/categories/categories';
import Header from './components/header/header';
import createCategory from './containers/createCategory/createCategory';
import DataToStore from './containers/dataToStore/dataToStore';
import EditBrand from './containers/EditBrand/editBrand';
import FileStructure from './components/fileStructure/fileStructure';
import CreatePage from './containers/createPage/CreatePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/createpage" component={CreatePage}/>
            <Route path="/filestructure" component={FileStructure} />
            <Route path="/dataToSTore" component={DataToStore} />
            <Route path="/header" component={Header} />
            <Route path="/createcategory" component={createCategory} />
            <Route path="/sidebar" component={Sidebar} />
            <Route path="/storeprofile" component={StoreProfile} />
            <Route path="/themes" component={Themes} />
            <Route path="/vieworders" component={ViewOrder} />
            <Route path="/create" component={AddProduct} />
            <Route path="/brands" component={Brands} />
            <Route path="/advancedSearch" exact component={AdvancedSearch}/>
            <Route path="/shipping" component={Shipping} />
            <Route path="/productsView" component={ProductsView} />
            <Route path="/addBrand" component={AddBrands}/>
            <Route path="/editCustomerOrder" component={EditCustomerOrder}/>
            <Route path="/editanorder" component={EditOrder} />
            <Route path="/addbrands" component={AddBrands}/>
            <Route path="/products" component={Products} />
            <Route path="/categories" component={AddCategory} />
            <Route path="/editBrand/:id" component={EditBrand}/>
            <Route path="/" component={Login} />
            
           </Switch>
        </div>

      </BrowserRouter>
     );
  }
}

export default App;