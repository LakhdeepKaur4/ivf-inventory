import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import './StoresView.css';
import  { getStores } from './../../actions/storesAction';
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';

class ProductsView extends Component {

    state = {
        activePage: 1,
        limit:10,
        totalItemsCount:100,
        ordering:1,
        stores:[]
    }
    
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.stores !== this.props.stores) {
            let stores = nextProps.stores.map(store=>({
                ...store
            }));
            this.setState({stores});
        }
    }

    setHost = host => {
        this.setState({host});
        this.props.getStores(host);
    }


    handlePageChange = ()=>{

    }

    renderPagination(){
        return <Pagination activePage={this.state.activePage}
            firstPageText={<i class="fa fa-angle-left"></i>}
            lastPageText={<i class="fa fa-angle-right"></i>}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.totalItemsCount}
            onChange={this.handlePageChange}
            itemClass='page-item'
            linkClasss='page-link'
        />
    }

    renderHeader() {
        return (
            <header>
                <div className="sw-header">
                    <h2 className="sw-title">View Stores</h2>
                </div>
                <div className="sw-action-bar">
                    <div className="sw-action-bar__item">
                        <span 
                            className="sw-action-bar__text dropdown-toggle"
                            href="#" id="navbarDropdownMenuLink" role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                                Actions
                        </span>
                        <div className="dropdown-menu" 
                            aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <div className="sw-action-bar__item">
                        <span className="sw-action-bar__text dropdown-toggle" 
                            href="#" id="navbarDropdownMenuLink2" 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                            Filter
                        </span>
                        <div className="dropdown-menu" 
                            aria-labelledby="navbarDropdownMenuLink2">
                            <a className="dropdown-item" href="#">Action1</a>
                            <a className="dropdown-item" href="#">Another action1</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <div className="sw-action-bar__item">
                        <span className="sw-action-bar__text" role="button">
                            {
                                this.state.ordering == 1?
                                <i class="fas fa-sort-amount-down" aria-hidden="true"></i>:
                                <i class="fas fa-sort-amount-up" aria-hidden="true"></i>
                            }
                            Order
                        </span>
                    </div>
                    <div className="sw-action-bar__item">
                        <span className="sw-action-bar__text" role="button">
                            <i class="fa fa-plus"></i>
                            New
                        </span>
                    </div>
                    <div className="sw-action-bar__item sw-action-bar__item--right">
                        {this.renderPagination()}
                    </div>
                </div>
            </header>
        );
    }

    renderTableData() {

        return this.state.stores.map((store) => {
            return (
                <tr>
                    <td><input type="checkbox" /></td>
                    <td><img src={store.img_src} width="60px" height="60px"/></td>
                    <td>{store.name}</td>
                    <td>{store.domain}</td>
                    <td>{store.type}</td>
                </tr>
            );
        });
    }

    renderTable() {
        return (
            <div className="sw-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox"/></th>
                            <th scope="col">STORE LOGO</th>
                            <th scope="col">STORE NAME</th>
                            <th scope="col">STORE DOMAIN</th>
                            <th scope="col">STORE TYPE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData(this.props.ProductsViewReducer)}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <HostResolver hostToGet="mockup" hostResolved={host => {
                this.setHost(host);
            }}>
                <Dashboard>
                    <div className="sw-wrapper-page">
                        {this.renderHeader()}
                        {this.renderTable()}
                    </div>
                </Dashboard>
            </HostResolver>
        );
    }
}

function mapStateToProps(state) {
    let { stores } = state.StoresReducer;
    return {
       stores
    }
}

export default connect(mapStateToProps, { getStores })(ProductsView);