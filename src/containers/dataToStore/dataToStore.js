import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {getDataStore} from '../../actions/dataToStoreAction';
import '../../commonCss/style.css';
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';
import './dataToStore.css';

class DataToStore extends Component{
    constructor(props){
        super(props);

        this.state={
            search: '',
            filterName:"customer",
            activePage: '1',
            limit:'5',
            totalItemsCount:'',
            productId:[],
            storeIds:[]
        }
    }

    componentDidMount(){
        this.props.getDataStore();
        console.log(location.href);
        var urlAr= location.href.split('/');
        var ids=urlAr[urlAr.length-1];
        console.log('shubnag',ids);
        this.setState({productId:ids});
        // console.log(this.state);
    }

   
    getStoreId=(id)=>{
        var IDS = [];
        IDS = this.state.storeIds;
              IDS.push(id);
        this.setState({storeIds:IDS})
        console.log(this.state.storeIds);

    }

    viewOrderFun=({dataStore})=>{
        if(dataStore){
            console.log("dataStore",dataStore)           

           return dataStore.map((item=>{
               return(
                   <tr>
                       <td><input type="checkbox" onClick={()=>this.getStoreId(item.id)}></input></td>
                       <td><img src={item.brandImage} className="img-fluid" alt="store"/></td>
                       <td>{item.storeName}</td>
                       <td>{item.location}</td>
                       <td>{item.type}</td>
                   </tr>
               )
           }))
        }

    }
    navigateNext=()=>{
        console.log(this.state.productId);
        console.log(this.state.storeIds);
        this.props.history.push(`/pushDataToStore/${this.state.productId}/${this.state.storeIds}`)
    }
    navigatePrevious=()=>{
        this.props.history.push('/productsView')
    }
   
    render(){
        let viewOrderData=
        <div className="table-responsive card">
        <table className="table">
        <thead>
             <tr style={{color:"#777777"}}>
             <th scope="col"><input type="checkbox"></input></th>
             <th scope="col">BRAND NAME</th>
             <th scope="col">STORE NAME</th>
             <th scope="col">LOCATION</th>
             <th scope="col">TYPE</th>

             </tr>
         </thead>
         <tbody>
             {this.viewOrderFun(this.props.DataToStoreReducer)}
         </tbody>
        </table>
     </div>

     let navLink=<div>
          <nav className="navbar navbar-expand-sm navbar-light bg-faded">
                <h4 className="navbar-brand"><b>PUSH DATA TO STORE</b></h4>
               
                
        </nav>
       
     </div>
     

let navIcon=
<nav className="navbar navbar-expand-lg navbar-light bg-faded">
    
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">

        <li className="nav-item">
        <span className="nav-link" style={{paddingTop: '1px'}}><span className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control searchBox" placeholder="Search" value={this.state.search}
                    onChange={this.searchOnChange} />
        </span></span>
        </li>
        

        <li className="nav-item">
        <span className="nav-link"><spna>Filter</spna><span style={{marginLeft: '5px'}}><i class="fas fa-angle-down" aria-hidden="true" style={{marginLeft: '5px'}}></i></span></span>
        </li>

        <li className="nav-item">
        <span className="nav-link"><spna>Push Information to stores</spna><span style={{marginLeft: '5px'}}><i className="fas fa-check-circle" aria-hidden="true" style={{marginLeft: '5px'}}></i></span></span>
        </li>
       
         
        </ul>
    </div>
    </nav>
        return(

        <div>
           <Dashboard>
                {navLink}
                <div className="md-stepper-horizontal orange">
                    <div className="md-step active done">
                        <div className="md-step-circle"><span>1</span></div>
                        <div className="md-step-title text-danger">Select Products</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step inactive1">
                        <div className="md-step-circle"><span className="text-danger">2</span></div>
                        <div className="md-step-title">Save to Store</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step inactive2">
                        <div className="md-step-circle"><span className="text-inactive2">3</span></div>
                        <div className="md-step-title">Proceed</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                </div>
              <div>
                {navIcon}
                <div style={{float:"right"}}>
                  <Pagination activePage={this.state.activePage}
                     itemsCountPerPage={this.state.limit}
                     totalItemsCount={this.state.totalItemsCount}
                     onChange={this.handlePageChange}
                     itemClass='page-item'
                     linkClasss='page-link'
                     />
        </div>
              </div>
              
              
                 <div>{viewOrderData}</div>
                 <div>
                 <button className="button-main button3" onClick={this.navigateNext}>Next</button>
                 <button className="button-main button3" onClick={this.navigatePrevious}>Previous</button>
              </div>
                 </Dashboard>
        </div>
            
            
        
        )
    }
}

function mapStateToProps(state){
    
    return{
     DataToStoreReducer : state.DataToStoreReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getDataStore}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(DataToStore);