import React, { Component } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom'
import $ from 'jquery';
class Sidebar extends Component {
    state = {
        pageOn: '',
        link:''
    }

    componentDidMount() {
        let page = window.location.href;
        page = page.slice(page.lastIndexOf("/") + 1);
        this.setState({
            pageOn: page,
            link: localStorage.getItem('link')
        });
        
        $(`${localStorage.getItem('link')}`).attr('aria-expanded','true');
        $(`${localStorage.getItem('link')}`).attr('class','');
        $(`${localStorage.getItem('link').slice(0,-4)}`).attr('class','collapse list-unstyled sidebarColl show');
    }

    clicked = link => {
        // console.log(link);
        // this.setState({link: link});
        localStorage.setItem('link',link);
    }

    render() {
        // console.log(this.state.link);
        return (
            <div>
                <div id="sidebar">
                    <div className="sidebar-header">
                        <img src="http://circle.usingimagination.co.uk/storage/settings/July2019/o84J95criNf1ZKNSBFuo.png" alt="Logo Icon" height="30" width="112" />
                    </div>

                    <ul className="list-unstyled components">
                        <li className="active sidebarHead">
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>STORES</a>
                            <ul className="collapse list-unstyled sidebarColl" id="homeSubmenu">
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
                            <a id="inventorySubmenuLink" href="#inventorySubmenu" data-toggle="collapse" aria-expanded='false' >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>INVENTORY</a>
                            <ul className="collapse list-unstyled sidebarColl" id="inventorySubmenu">
                                <li>
                                    {(this.state.pageOn === 'productsView') ? <Link to="/productsView" onClick={this.clicked('#inventorySubmenuLink')}>
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>View Products</span>
                                    </Link> : <Link to="/productsView" onClick={this.clicked('#inventorySubmenuLink')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>View Products
                                    </Link>}
                                </li>
                                <li>
                                    <Link to="/categories" onClick={this.clicked('#inventorySubmenuLink')}>
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>View Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/brands" onClick={this.clicked('#inventorySubmenuLink')}>
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>View Brands
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="active sidebarHead">
                            <a id="provisionSubmenuLink" href="#provisionSubmenu" data-toggle="collapse" aria-expanded="false" >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>PROVISION</a>
                            <ul className="collapse list-unstyled sidebarColl" id="provisionSubmenu">
                                <li>
                                    {(this.state.pageOn === 'dataToSTore') ? <Link to="/dataToSTore" onClick={this.clicked('#provisionSubmenuLink')}>
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Push Products</span>
                                    </Link> : <Link to="/dataToSTore" onClick={this.clicked('#provisionSubmenuLink')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Push Products
                                    </Link>}
                                </li>
                                <li>
                                    {(this.state.pageOn === 'vieworders') ? <Link to="/vieworders" onClick={this.clicked('#provisionSubmenuLink')}>
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Push Orders</span>
                                    </Link> : <Link to="/vieworders" onClick={this.clicked('#provisionSubmenuLink')}>
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
                            <a id="ftSubmenuLink" href="#ftSubmenu" data-toggle="collapse" aria-expanded="false" >
                                <span><i className="far fa-circle" aria-hidden="true" style={{ color: "red" }}></i></span>FILTER & SEARCH</a>
                            <ul className="collapse list-unstyled sidebarColl" id="ftSubmenu">
                                <li>
                                    <a href="#">
                                        <span>
                                            <i className="far fa-circle" aria-hidden="true"></i>
                                        </span>Filter Orders
                                    </a>
                                </li>
                                <li>
                                    {(this.state.pageOn === 'blogPost') ? <a href="/blogPost" onClick={this.clicked('#ftSubmenuLink')}>
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{ color: "red" }}>Blog Post</span>
                                    </a> : <a href="/blogPost" onClick={this.clicked('#ftSubmenuLink')}>
                                            <span>
                                                <i className="far fa-circle" aria-hidden="true"></i>
                                            </span>Blog post
                                    </a>}
                                </li>
                                <li>
                                    {(this.state.pageOn === 'blogSettings') ? <a href="/blogSettings">
                                        <span>
                                            <i className="fas fa-circle" aria-hidden="true"></i>
                                        </span><span style={{color:"red"}}>Blog Settings</span>
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