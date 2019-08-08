import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {getDataStore} from '../../actions/dataToStoreAction';
import '../../commonCss/style.css';
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';



class DataToStore extends Component{
    constructor(props){
        super(props);

        this.state={
            search: '',
            filterName:"customer",
            activePage: '1',
            limit:'5',
            totalItemsCount:''
        }
    }

    componentDidMount(){
        this.props.getDataStore();
    }

   


    viewOrderFun=({dataStore})=>{
        if(dataStore){
           

           return dataStore.map((item=>{
               return(
                   <tr>
                       <td><input type="checkbox"></input></td>
                       <td><image src={item.brandImage} alt="img"/></td>
                       <td>{item.storeName}</td>
                       <td>{item.location}</td>
                       <td>{item.type}</td>
                   </tr>
               )
           }))
        }

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
            <input type="text" className="form-control" placeholder="Search" value={this.state.search}
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