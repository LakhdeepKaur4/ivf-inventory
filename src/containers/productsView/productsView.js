import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {getProductsView} from '../../actions/productsViewAction';
import Pagination from 'react-js-pagination';
import './productView.css';

import Dashboard from '../../components/dashboard/dashboard';

class ProductsView extends Component{
    constructor(props){
        super(props);

        this.state={
            search:'',
            activePage: '1',
            limit:'5',
            totalItemsCount:'',
            filterName:'name',
            sortVal:false,
            ids:[]
            
        }
    }

    btnClick=()=>{
        this.setState({checked:true})
        console.log(this.state.checked)

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
        return function (x) { 
            return x.sku.toLowerCase().includes(search.toLowerCase())  ||
            x.stock.toString().includes(search.toString()) ||
            x.name.toLowerCase().includes(search.toLowerCase())   ||
             !search;
        }
    }

    onSort=()=>{
    this.setState(()=>{
        return {   
            sortVal:true,
                    
                }});
                       
    }


    onSortInv=()=>{
        this.setState(()=>{
            return {   sortVal: false,
                        
                    }});
                           
        }

    onToggleDropDown = (option) => {
        
           this.props.onSizePerPageList(Number(option.target.value))
          }

          pickIds=(Ids)=>{
              console.log("selected ids",Ids);
              var IDS = [];
              IDS = this.state.ids;
              IDS.push(Ids);
              this.setState({ids:IDS})
          }

    productsResult=({productList})=>{
          if(productList){
              console.log('productlist',productList);
              return productList.sort((item1,item2)=>{
                var cmprVal =  (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
               }).filter(this.searchFilter(this.state.search)).map((item)=>{ 
               return(
                <tr>
                <td scope="row"><input type="checkbox" onClick={()=>this.pickIds(item.id)}/></td>
                <td><img src={item.image} className="img-fluid" alt="Sheep"/></td>
                <td>{item.sku}</td>
                <td>{item.stock}</td>
                <td>{item.name}</td>
                <td>{item.price} $</td>
                <td>
                    
                    <div><button class="button button1 active" onClick={this.btnClick}>Visible</button></div>
                    <div><button class="button button2" onClick={this.btnClick}>Invisible</button></div>
                   </td>
                <td><b>...</b></td>
                </tr>
               )
                
              })
          }
    }

    navigate=()=>{
        console.log('hii');
        console.log(this.state.ids);
        this.props.history.push(`/dataToStore/${this.state.ids}`)
    }

    render(){
        let tableData=
        <div className="table-responsive card text-dark">
               <table className="table">
                <thead>
                    <tr>
                    <th scope="col"><input type="checkbox"/></th>
                    <th scope="col">IMAGES</th>
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
                <div><h4 className="navbar-brand"><b>PRODUCTS (VIEW)</b></h4></div>
                
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
                <span className="nav-link" onClick={this.onSort}><i class="fas fa-sort-amount-down" aria-hidden="true"></i></span>
                </li>
            
                <li className="nav-item">
                <span className="nav-link" onClick={this.onSortInv}><i class="fas fa-sort-amount-up" aria-hidden="true"></i></span>
                </li>
               
                <li className="nav-item">
                <span className="nav-link"><i class="fas fa-th-large" aria-hidden="true"></i></span>
                </li>
                <li className="nav-item">
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
                <span className="nav-link" style={{paddingTop: '1px'}}><span className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control searchBox " placeholder="Search" value={this.state.search}
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
           <div className="md-stepper-horizontal orange">
                    <div className="md-step activeProductsView">
                        <div className="md-step-circle"><span>1</span></div>
                        <div className="md-step-title">Select Products</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step">
                        <div className="md-step-circle"><span>2</span></div>
                        <div className="md-step-title">Save to Store</div>
                        <div className="md-step-bar-left"></div>
                      
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step">
                        <div className="md-step-circle"><span>3</span></div>
                        <div className="md-step-title">Proceed</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
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
           
              <div>
                 {tableData}
              </div>
              <div>
                 <button className="button-main button3" onClick={this.navigate}>Next</button>
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