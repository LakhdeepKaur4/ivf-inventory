import React, { Component } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { setBreadCrumb } from '../../actions/breadcrumbAction';
import { connect } from 'react-redux';

class Sidebar extends Component {
    state = {
        pageOn: '',
        link: '',
        menuState: {
            'stores': {
                isOpen: false
            },
            'dashboard': {
                isOpen: false
            },
            'inventory': {
                isOpen: false
            },
            'provision': {
                isOpen: false
            },
            'filter_and_search': {
                isOpen: false
            },
            'operations' : {
                isOpen: false
            }
        }
    }

    constructor() {
        super();
        let menuItemStr = localStorage.getItem('menuItem');
        if (menuItemStr) {
            let menuState = JSON.parse(menuItemStr);
            this.state.menuState = menuState;
        }
        else {

        }
    }

    toggleMenu(menuName) {
        this.setState(prevState => {
            let prevMenuState = prevState.menuState;
            return {
                ...prevState,
                menuState: {
                    ...prevMenuState,
                    [menuName]: {
                        ...prevMenuState[menuName],
                        isOpen: !prevMenuState[menuName].isOpen
                    }
                }
            };
        }, () => {
            localStorage.setItem('menuItem', JSON.stringify(this.state.menuState));
        });
    }

    componentDidMount() {
        let page = window.location.href;
        page = page.split("/")[3];
        this.setState({
            pageOn: page,
            link: localStorage.getItem('link')
        });
    }

    onChangeHeader = (url) => {
        this.props.setBreadCrumb(url);
    }

    render() {
        let menuState = this.state.menuState;
        return (
            <div>
                <div id="sidebar">
                    <div className="sidebar-header">
                        <img src="http://circle.usingimagination.co.uk/storage/settings/July2019/o84J95criNf1ZKNSBFuo.png" alt="Logo Icon" height="30" width="112" />
                    </div>

                    <ul className="list-unstyled components">
                        <li className="active sidebarHead">
                            <a href="javascript:void(0)" onClick={this.toggleMenu.bind(this, "stores")} aria-expanded={menuState.stores.isOpen}>
                                <span><i className="far fa-circle" aria-hidden="true"
                                    style={{ color: "red" }}></i></span>STORES</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.stores.isOpen ? "show" : ''}`
                            } id="">
                             
                                <li>
                                {(this.state.pageOn === 'storesView') ? <Link to="/storesView">
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Stores</span>
                                    </Link> : <Link to="/storesView" 
                                    onClick={this.onChangeHeader.bind(this,'Stores/View Stores')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Stores
                                    </Link>}
                                </li>   

                                 <li>
                                {(this.state.pageOn === 'newStore') ? <Link to="/" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Deploy New Store</span>
                                    </Link> : <Link to="/" onClick={this.onChangeHeader.bind(this,'Stores/Deploy New Store')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Deploy New Store
                                    </Link>}
                                </li>           
                            </ul>
                        </li>

                        <li className="active sidebarHead">
                            <a id="dashboardSubmenuLink" href="javascript:void(0)" 
                             onClick={this.toggleMenu.bind(this,"dashboard")} aria-expanded={menuState.dashboard.isOpen} >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>DASHBOARD</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.dashboard.isOpen ? "show" : ''}`
                            }
                                id="dashboardSubmenu">
                            </ul>
                        </li>


                        <li className="active sidebarHead">
                            <a id="inventorySubmenuLink" href="javascript:void(0)" 
                             onClick={this.toggleMenu.bind(this,"inventory")} aria-expanded={menuState.inventory.isOpen} >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>INVENTORY</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.inventory.isOpen ? "show" : ''}`
                            }
                                id="inventorySubmenu">
                                <li>
                                    {(this.state.pageOn === 'productsView') ? <Link to="/productsView" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Products</span>
                                    </Link> : <Link to="/productsView" onClick={this.onChangeHeader.bind(this,'Inventory/View Products')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Products
                                    </Link>}
                                </li>
                                <li>
                                {(this.state.pageOn === 'brands') ? <Link to="/brands" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Brands</span>
                                    </Link> : 
                                    <Link to="/brands" onClick={this.onChangeHeader.bind(this,'Inventory/View Brands')} >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span><span>View Brands</span>
                                    </Link>
                                }
                                </li>
                                <li>
                                    {(this.state.pageOn === 'categories') ? <Link to="/categories" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Categories</span>
                                    </Link> : <Link to="/categories" onClick={this.onChangeHeader.bind(this,'Inventory/View Categories')} >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Categories
                                    </Link>}
                                </li>
                                
                            </ul>
                        </li>

                        <li className="active sidebarHead">
                            <a id="provisionSubmenuLink" href="javascript:void(0)"
                          
                          onClick={this.toggleMenu.bind(this,"provision")} aria-expanded={menuState.provision.isOpen} >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>PROVISION</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.provision.isOpen ? "show" : ''}`
                            } id="provisionSubmenu">
                                <li>
                                    {(this.state.pageOn === 'pushProductsView') ? <Link to="/pushProductsView" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Push Products</span>
                                    </Link> : 
                                    <Link to="/pushProductsView" onClick={this.onChangeHeader.bind(this,'Provision/Push Products')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Push Products
                                    </Link>}
                                </li>
                                <li>
                                    {(this.state.pageOn === '') ? <Link to="/"  >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Push Orders</span>
                                    </Link> : 
                                    <Link to="/" onClick={this.onChangeHeader.bind(this,'Provision/Push Orders')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Push Orders
                                    </Link>}
                                </li>
                                <li>
                                    {(this.state.pageOn === '') ? 
                                    <Link to="/"  >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Push Customers</span>
                                    </Link> : 
                                    <Link to="/" onClick={this.onChangeHeader.bind(this,'Provision/Push Customers')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Push Customers
                                    </Link>}
                                </li>
                        
                            </ul>
                        </li>

                        <li className="active sidebarHead">
                            <a id="operationsSubmenuLink" href="javascript:void(0)" 
                             onClick={this.toggleMenu.bind(this,'operations')} aria-expanded={menuState.operations.isOpen} >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>OPERATIONS</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.operations.isOpen ? "show" : ''}`
                            }
                                id="operationsSubmenu">
                                <li>
                                    {(this.state.pageOn === 'vieworders') ? 
                                    <Link to="/vieworders" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Orders</span>
                                    </Link> : 
                                    <Link to="/vieworders" onClick={this.onChangeHeader.bind(this,'Operations/View Orders')} >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Orders
                                    </Link>}
                                </li>
                                <li>
                                {(this.state.pageOn === '') ? 
                                    <Link to="/" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Shipments</span>
                                    </Link> : 
                                    <Link to="/" onClick={this.onChangeHeader.bind(this,'Operations/View Shipments')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span><span>View Shipments</span>
                                    </Link>
                                }
                                </li>
                                <li>
                                    {(this.state.pageOn === '') ? 
                                    <Link to="/"  >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Payments</span>
                                    </Link> : 
                                    <Link to="/" onClick={this.onChangeHeader.bind(this,'Operations/View Payments')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Payments
                                    </Link>}
                                </li>
                                
                            </ul>
                        </li>

                        <li className="active sidebarHead">
                            <a id="ftSubmenuLink" href="javascript:void(0)"
                                onClick={this.toggleMenu.bind(this, "filter_and_search")} aria-expanded={menuState.filter_and_search.isOpen} >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>ADVANCE SEARCH</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.filter_and_search.isOpen ? "show" : ''}`
                            }
                                id="ftSubmenu">
                                <li>
                                    {(this.state.pageOn === 'advancedSearch') ? 
                                    <Link to="/advancedSearch"  >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Filter Orders</span>
                                    </Link> : 
                                    <Link to="/advancedSearch" onClick={this.onChangeHeader.bind(this,'Advance search/Filter Orders')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Filter Orders
                                    </Link>}
                                </li>
                                
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setBreadCrumb
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Sidebar);