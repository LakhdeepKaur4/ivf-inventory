import React, { Component } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    state = {
        pageOn: '',
        link: '',
        menuState: {
            'stores': {
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
                ...prevMenuState,
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
                            <a href="#homeSubmenu" onClick={this.toggleMenu.bind(this, "stores")} aria-expanded="false">
                                <span><i className="far fa-circle" aria-hidden="true"
                                    style={{ color: "red" }}></i></span>STORES</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.stores.isOpen ? "show" : ''}`
                            } >
                                <li>
                                    <a href="/productsView" id="abox" onClick={this.changeIcon}>
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>View Stores
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>Store Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>Blogs
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="active sidebarHead">
                            <a id="inventorySubmenuLink" href="#inventorySubmenu"
                                onClick={this.toggleMenu.bind(this, "inventory")} aria-expanded='false' >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>INVENTORY</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.inventory.isOpen ? "show" : ''}`
                            }
                                id="inventorySubmenu">
                                <li>
                                    {(this.state.pageOn === 'productsView') ? <Link to="/productsView">
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Products</span>
                                    </Link> : <Link to="/productsView" >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Products
                                    </Link>}
                                </li>
                                <li>
                                    {(this.state.pageOn === 'categories') ? <Link to="/categories" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Categories</span>
                                    </Link> : <Link to="/categories" >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Categories
                                    </Link>}
                                </li>
                                <li>
                                    <Link to="/brands" >
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>View Brands
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="active sidebarHead">
                            <a id="provisionSubmenuLink" href="#provisionSubmenu"
                                onClick={this.toggleMenu.bind(this, "provision")} aria-expanded="false" >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>PROVISION</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.provision.isOpen ? "show" : ''}`
                            } id="provisionSubmenu">
                                <li>
                                    {(this.state.pageOn === 'pushProductsView') ? <Link to="/pushProductsView" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Push Products</span>
                                    </Link> : <Link to="/pushProductsView" >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Push Products
                                    </Link>}
                                </li>
                                <li>
                                    {(this.state.pageOn === 'vieworders') ? <Link to="/vieworders" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Push Orders</span>
                                    </Link> : <Link to="/vieworders" >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Push Orders
                                    </Link>}
                                </li>
                                <li>
                                    <a href="#">
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>Push Customers
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="active sidebarHead">
                            <a id="ftSubmenuLink" href="#ftSubmenu"
                                onClick={this.toggleMenu.bind(this, "filter_and_search")} aria-expanded="false" >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>FILTER & SEARCH</a>
                            <ul className={
                                `collapse list-unstyled sidebarColl ${menuState.filter_and_search.isOpen ? "show" : ''}`
                            }
                                id="ftSubmenu">
                                <li>
                                    <a href="#">
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>Filter Orders
                                    </a>
                                </li>
                                <li>
                                    {(this.state.pageOn === 'blogPost') ? <a href="/blogPost" >
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Blog Post</span>
                                    </a> : <a href="/blogPost" >
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Blog post
                                    </a>}
                                </li>
                                <li>
                                    {(this.state.pageOn === 'blogSettings') ? <a href="/blogSettings">
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Blog Settings</span>
                                    </a> : <a href="/blogSettings">
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Blog Settings
                                    </a>}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default Sidebar;