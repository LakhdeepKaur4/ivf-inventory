import React, { Component } from 'react';
import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import Brands from './containers/displayBrands/displayBrands';
import AdvancedSearch from './containers/advancedSearch/advancedSearch';
import ViewOrder from './containers/viewOrder/viewOrder'
// import AddProduct from './containers/addProducts/addProducts';
import EditOrder from './containers/editOrder/editOrder';
// import Shipping from './containers/shipping/shipping';
import PushProductsView from './containers/pushProductsView/pushProductsView';
import Login from './containers/login/login';
import Themes from './containers/themes/themes';
import StoreProfile from './containers/storeProfile/storeProfile';
import Sidebar from './components/sidebar/sidebar';
import EditCustomerOrder from './containers/editCustomerOrder/editCustomerOrder';
import Products from './containers/products/products';
import AddBrand from './containers/addBrand/addBrand'
import Categories from './containers/categories/categories';
import Header from './components/header/header';
import createCategory from './containers/createCategory/createCategory';
import DataToStore from './containers/dataToStore/dataToStore';
import EditBrand from './containers/editBrand/editBrand'
import CreateProduct from './containers/createProduct/createProduct';
import ProductVariant from './containers/productVariant/productVariant';
import ProductVariantOption from './containers/productVariantOption/productVariantOption';
import FileStructure from './components/fileStructure/fileStructure';
import PushDataToStore from './containers/pushDataToStore/pushDataToStore';
import CreatePage from './containers/createPage/CreatePage';
import BlogPost from './containers/blogPost/blogPost';
import BlogSettings from './containers/blogSettings/blogSettings';
import Blog from './containers/blog/blog';
import ProductView from './containers/productView/productView';
import productView from './containers/productView/productView';
import StoresView from './containers/storesView/storesView';
import UnderConstruction from './components/maintenance/maintenance';
import StoreSetting from './components/storeSetting/storeSetting'

class App extends Component {
  constructor(){
    super();    
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/storeSettings" component={ UnderConstruction } />
            <Route path="/storesView" component={StoresView} />
            <Route path="/productsView/:id" component={productView} />
            <Route path="/editcategory/:id" component={createCategory} />
            <Route path="/productsView" component={ProductView} />
            <Route path="/pushDataToStore" component={PushDataToStore} />
            <Route path="/createProduct/createVariant"   component={ProductVariant} />
            <Route path="/createProduct/editVariant/:id"  component={ProductVariant} />
            <Route path="/createProduct/variant/:title/createOption"   component={ProductVariantOption} />
            <Route path="/createProduct/variant/:title/editOption/:id"  component={ProductVariantOption}/>
            <Route path="/createProduct" component={CreateProduct} />
            <Route path="/createpage" component={CreatePage} />
            <Route path="/filestructure" component={FileStructure} />
            <Route path="/dataToStore" component={DataToStore} />
            <Route path="/header" component={Header} />
            <Route path="/createcategory" component={createCategory} />
            <Route path="/sidebar" component={Sidebar} />
            <Route path="/storeprofile" component={StoreProfile} />
            <Route path="/themes" component={Themes} />
            <Route path="/vieworders" component={ViewOrder} />
            {/* <Route path="/create" component={AddProduct} /> */}
            <Route path="/brands" component={Brands} />
            <Route path="/advancedSearch" exact component={AdvancedSearch} />
            {/* <Route path="/shipping" component={Shipping} /> */}
            <Route path="/pushProductsView" component={PushProductsView} />
            <Route path="/addBrand" component={AddBrand} />
            <Route path="/editanorder" component={EditCustomerOrder} />
            <Route path="/finalizeorder" component={EditOrder} />
            <Route path="/addbrand" component={AddBrand} />
            <Route path="/editproducts" component={Products} />
            <Route path="/categories" component={Categories} />
            <Route path="/editBrand/:id" component={EditBrand} />
            <Route path="/blogPost" component={BlogPost} />
            <Route path="/blogSettings" component={BlogSettings} />
            <Route path="/blog" component={Blog} />
            <Route path="/storeSetting" component={StoreSetting}/>
            <Route path='/notFound' component={UnderConstruction} />
            <Redirect from='*' to='/notFound' />
            <Route path="/" component={Login} />
            
          </Switch>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;