import React, { Component } from 'react'
import './storeSetting.css';
import Dashboard from '../dashboard/dashboard'
import {NavLink} from 'react-router-dom'

export default class StoreSetting extends Component {
    render() {
        return (
            <div className="store_setting">
                <Dashboard>
                    <div className="container">
                        <div className="store_setting_heading">store settings</div>
                        <div className="row col-12 p-0 settingRow">
                            <div className="col-4">
                                <NavLink to="/home">
                                <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-home"></i></div>
                                <div className="text-center iconLabel mt-3">Home page</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="col-4 "> 
                            <NavLink to="/logo" activeClassName="active_link">
                            <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-retweet"></i></div>
                                <div className="text-center iconLabel mt-3">Logo</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="col-4 ">
                                <NavLink to="/storeprofile" activeClassName= "active_link">
                            <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-user"></i></div>
                                <div className="text-center iconLabel mt-3">Profile</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                        {/* Row 2 start */}
                        <div className="row col-12 p-0 settingRow">
                            <div className="col-4">
                                <NavLink to="/billing">
                                <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-money-check-alt"></i></div>
                                <div className="text-center iconLabel mt-3">Billing</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="col-4 "> 
                            <NavLink to="/shipping">
                            <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-shipping-fast"></i></div>
                                <div className="text-center iconLabel mt-3">Shipping</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="col-4 ">
                                <NavLink to="/socialMedia">
                            <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fab fa-twitter"></i></div>
                                <div className="text-center iconLabel mt-3">Social Media</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                        {/* Row 2 ends */}

                        {/* Row 3 Starts */}

                        <div className="row col-12 p-0 settingRow">
                            <div className="col-4">
                                <NavLink to="/themes">
                                <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-pen"></i></div>
                                <div className="text-center iconLabel mt-3">Theme</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="col-4 "> 
                            <NavLink to="/contentSetting">
                            <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-file"></i></div>
                                <div className="text-center iconLabel mt-3">Content Pages</div>
                                </div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="col-4 ">
                                <NavLink to="/blogSettings">
                                <div className="setting_icon">
                                <div className="my-5">
                                <div className="text-center icon mb-3"><i className="fas fa-comment-alt"></i></div>
                                <div className="text-center iconLabel mt-3">Blog</div>
                                </div>
                                </div>
                                </NavLink>
                            
                            </div>
                        </div>
                        {/* Row 3 ends */}
                    </div>
                </Dashboard>
            </div>
        )
    }
}
