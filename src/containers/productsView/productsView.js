import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {getProductsView} from '../../actions/productsViewAction';
import Pagination from 'react-js-pagination';
import './productView.css'

import Dashboard from '../../components/dashboard/dashboard';

class ProductsView extends Component{
    constructor(props){
        super(props);

        this.state={
            search:'',
            activePage: '1',
            limit:'5',
            totalItemsCount:'',
            filterName:'name'
        }
    }
    
    componentDidMount(){
        this.props.getProductsView();
    }


    handlePageChange=(pageNumber)=> {
        console.log(`active page is ${pageNumber}`);    
            // this.props.getPageDetails(pageNumber);
      }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
     }

    searchFilter = (search) => {
        return function (x) { console.log(x)
            return x.sku.toLowerCase().includes(search.toLowerCase())  ||
            x.stock.toString().includes(search.toString()) ||
            x.name.toLowerCase().includes(search.toLowerCase())   ||
             !search;
        }
    }

    productsResult=({productList})=>{
          if(productList){
             

              return productList.sort((item1,item2)=>{
                var cmprVal =  (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
                }).filter(this.searchFilter(this.state.search)).map((item)=>{ 
               return(
                <tr>
                <td scope="row"><input type="checkbox"/></td>
                <td><img src={item.image} className="img-fluid" alt="Sheep"/></td>
                <td>{item.sku}</td>
                <td>{item.stock}</td>
                <td>{item.name}</td>
                <td>{item.price} $</td>
                <td>
                    {/* <div><button type="button" className="btn btn-outline" style={{color:'#1ABC9C'}}>Success</button></div> */}
                    {/* <div><button type="button" className="btn btn-outline">Warning</button></div> */}
                    <div><button class="button button1">Visible</button></div>
                    <div><button class="button button2">Invisible</button></div>
                   </td>
                <td><b>...</b></td>
                </tr>
               )
                
              })
          }
    }

    render(){
        let tableData=
        <div className="table-responsive card text-dark">
               <table className="table">
                <thead>
                    <tr>
                    <th scope="col"><input type="checkbox"/></th>
                    <th scope="col">Image</th>
                    <th scope="col">SKU</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">NAME</th>
                    <th scope="col">PRICE</th>
                    <th scope="col"></th>
                    <th scope="col">ACTIONS</th>
                    <th scope="col">...</th>
                    </tr>
                </thead>
                <tbody>
                    {this.productsResult(this.props.ProductsViewReducer)}                
                </tbody>
                </table>
        </div>
        
        let navLink=
          <nav className="navbar navbar-expand-sm navbar-light bg-faded">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
                <h4 className="navbar-brand"><b>PRODUCTS (VIEW)</b></h4>
                <div className="collapse navbar-collapse justify-content-end" id="nav-content">   
                <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="#">All</a>
                </li>
                
                <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Free Shipping</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Oofs</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Hidden</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Visible</a>
                </li>
                </ul>
                </div>
            </nav>

          


        let navIcon=
        <nav className="navbar navbar-expand-lg navbar-light bg-faded">
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
               
                <li className="nav-item">
                <span className="nav-link"><i class="fas fa-sort-amount-down" aria-hidden="true"></i></span>
                </li>

                <li className="nav-item">
                <span className="nav-link"><i class="fas fa-sort-amount-up" aria-hidden="true"></i></span>
                </li>
               
                <li className="nav-item">
                <span className="nav-link"><i class="fas fa-th-large" aria-hidden="true"></i></span>
                </li>
                <li className="nav-item66">
                <span className="nav-link">Limits 20<i class="fas fa-angle-down" aria-hidden="true"   style={{marginLeft: '5px'}} ></i></span>
                </li>
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Actions
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <span className="nav-link" style={{paddingTop: '1px'}}><span className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control" placeholder="Search" value={this.state.search}
                            onChange={this.searchOnChange} />
                </span></span>
                </li>

                <li className="nav-item">
                <span className="nav-link"><i class="fas fa-plus" aria-hidden="true" style={{marginLeft: '5px'}}></i><span style={{marginLeft: '5px'}}>New</span></span>
                </li>  
                </ul>
            </div>
            </nav>
        
        return(
        <div>
            <Dashboard>
            
        
           <div>
               {navLink}
           </div>
           <div>
               {navIcon}
           </div>
           <div style={{float: 'right'}}>
           <Pagination activePage={this.state.activePage}
                             itemsCountPerPage={this.state.limit}
                             totalItemsCount={this.state.totalItemsCount}
                             onChange={this.handlePageChange}
                             itemClass='page-item'
                             linkClasss='page-link'
                             />
            </div>
             {/* <div>
              <ul className="list-inline" style={{paddingLeft:'15px'}}>
              <li className="list-inline-item"><span><i class="fas fa-sort-amount-down" aria-hidden="true"></i></span></li>
                <li className="list-inline-item"><span><i class="fas fa-sort-amount-up" aria-hidden="true"></i></span></li>
                <li className="list-inline-item">Limit 20<span><i className="fa fa-angle-down" aria-hidden="true"></i></span></li>
                <li className="list-inline-item">Actions<span><i className="fa fa-angle-down" aria-hidden="true"></i></span></li>
                <li className="list-inline-item"><span><i className="fa fa-plus" aria-hidden="true"></i></span><label>New</label></li>
                 
                
                <li className="list-inline-item" style={{float:'right'}}>
                <Pagination activePage={this.state.activePage}
                             itemsCountPerPage={this.state.limit}
                             totalItemsCount={this.state.totalItemsCount}
                             onChange={this.handlePageChange}
                             itemClass='page-item'
                             linkClasss='page-link'/>
                </li>
                 
              </ul>
              </div> */}
           <div>
                 {tableData}
              </div>
      
        </Dashboard>
        </div>
        
       
        )
    }
}

function mapStateToProps(state){
      
    return{
       ProductsViewReducer: state.ProductsViewReducer      
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getProductsView}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsView);