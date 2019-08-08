import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getViewOrder } from '../../actions/viewOrderAction';
import '../../commonCss/style.css';
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';




class ViewOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            filterName: "customer",
            activePage: '1',
            limit: '5',
            totalItemsCount: ''
        }
    }

    componentDidMount() {
        this.props.getViewOrder();
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            console.log(x)
            return x.orderId.toLowerCase().includes(search.toLowerCase()) ||
                x.customer.toLowerCase().includes(search.toLowerCase()) ||
                x.status.toLowerCase().includes(search.toLowerCase()) ||
                !search;
        }
    }

    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
    }


    viewOrderFun = ({ viewOrder }) => {
        if (viewOrder) {
            console.log(viewOrder, "result view order")

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

    render() {
        let viewOrderData =
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

        let navLink = <div>
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

        let navIcon =
            <div className="row text-muted">
                <div className="col-2 my-auto"><i class="fas fa-plus" aria-hidden="true"></i><span >New</span></div>
                <div className="col-2 dropdown"><span className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Actions
            </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div></div>
                <div className="col-2 my-auto"><a href="#" className="text-muted">Exports Limit</a></div>
                <div className="col-2"><span className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control" placeholder="Search" value={this.state.search}
                        onChange={this.searchOnChange} />
                </span></div>
                <div className="col"><div>
                    <Pagination activePage={this.state.activePage}
                        itemsCountPerPage={this.state.limit}
                        totalItemsCount={this.state.totalItemsCount}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClasss='page-link'
                    /></div>
                </div>
            </div>
        return (

            <div>
                <Dashboard>
                    {navLink}

                    <div>
                        {navIcon}
                    </div>


                    <div>{viewOrderData}</div>
                </Dashboard>
            </div>



        )
    }
}

function mapStateToProps(state) {
    console.log(state, "view order")
    return {
        ViewOrderReducer: state.ViewOrderReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getViewOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);