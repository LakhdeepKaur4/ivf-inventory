import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getViewOrder } from '../../actions/viewOrderAction';
import './viewOrder.css'
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';




class ViewOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            filterName: "customer",
            activePage: '1',
            limit:'5',
            totalItemsCount:'',
            host: ''
        }
    }

    

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            return x.orderId.toLowerCase().includes(search.toLowerCase()) ||
                x.customer.toLowerCase().includes(search.toLowerCase()) ||
                x.status.toLowerCase().includes(search.toLowerCase()) ||
                !search;
        }
    }

    handlePageChange = (pageNumber) => {
    }


    viewOrderFun = ({ viewOrder }) => {
        if (viewOrder) {


            return viewOrder.sort((item1, item2) => {
                var cmprVal = (item1.customer && item2.customer) ? (item1[this.state.filterName].localeCompare(item2[this.state.filterName])) : ''
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map(item => {
                return (
                    <tr key={item.orderId}>
                        <th scope="row"><i className="fa fa-plus-circle" aria-hidden="true"></i></th>
                        <td>{item.date}</td>
                        <td>{item.orderId}</td>
                        <td>{item.status === 'Failed' ? <span><i className="fa fa-circle" style={{ marginRight: '4px', color: 'red' }}></i></span> : item.status === 'Successful' ? <span><i className="fa fa-circle" style={{ marginRight: '4px', color: 'green' }}></i></span> : <span><i className="fa fa-circle" style={{ marginRight: '4px', color: 'yellow' }}></i></span>}{item.status}</td>
                        <td>{item.customer}</td>
                        <td>{item.stTotal}</td>
                        <td>{item.billing}</td>
                        <td>{item.shipping}</td>
                        <td>{item.order}</td>
                    </tr>
                )
            })
        }

    }

    setHost = async (host) => {
        await this.setState({ host: host });
        this.props.getViewOrder(this.state.host);
        
    }
   
    render(){
        let viewOrderData=
        <div className="table-responsive card">
        <table className="table">
        <thead>
             <tr>
             <th scope="col"></th>
             <th scope="col">DATE</th>
             <th scope="col">ORDER ID</th>
             <th scope="col">STATUS</th>
             <th scope="col">CUSTOMER</th>
             <th scope="col">ST TOTAL</th>
             <th scope="col">BILLING</th>
             <th scope="col">SHIPPING</th>
             <th scope="col">ORDER</th>
             <th scope="col">...</th>
             </tr>
         </thead>
         <tbody>
             {this.viewOrderFun(this.props.ViewOrderReducer)}
         </tbody>
        </table>
     </div>

     let navLink=<div>
          <nav className="navbar navbar-expand-sm navbar-light bg-faded">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
                <h4 className="navbar-brand"><b>VIEW ORDERS</b></h4>
                <div className="collapse navbar-collapse justify-content-end" id="nav-content">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">AllPayments</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">AllFulfillments</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Incomplete</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">... More</a>
                        </li>
                    </ul>
                </div>
        </nav>
       
     </div>

let navIcon=
<nav className="navbar navbar-expand-lg navbar-light bg-faded" style={{marginLeft: '-24px'}}>
    
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
        <li className="nav-item">
        <span className="nav-link"><i class="fas fa-plus" aria-hidden="true"></i><span style={{marginLeft: '5px'}}>New</span></span>
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
            <a className="nav-link" href="#">ExportsLimit</a>
        </li>
        <li className="nav-item">
        <span className="nav-link" style={{paddingTop: '1px'}}><span className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control searchBox" placeholder="Search" value={this.state.search}
                    onChange={this.searchOnChange} />
        </span></span>
        </li>

      
       
        <span className="nav-link"><Pagination activePage={this.state.activePage}
                     itemsCountPerPage={this.state.limit}
                     totalItemsCount={this.state.totalItemsCount}
                     onChange={this.handlePageChange}
                     itemClass='page-item'
                     linkClasss='page-link'
                     /></span>
      
       
        
       
        </ul>
    </div>
    </nav>
        return(
            <HostResolver hostToGet="mockup" hostResolved={host => {
                this.setHost(host)
            }}>
        <div>
           <Dashboard>
                {navLink}
              <div>
                {navIcon}
              </div>
                 <div>{viewOrderData}</div>
                 </Dashboard>
        </div>
          </HostResolver>
        )
    }
}

function mapStateToProps(state) {

    return {
        ViewOrderReducer: state.ViewOrderReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getViewOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);