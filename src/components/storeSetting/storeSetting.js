import React, { Component } from "react";
import "./storeSetting.css";
import Dashboard from "../dashboard/dashboard";
import { NavLink } from "react-router-dom";
import $ from "jquery";

export default class StoreSetting extends Component {
    constructor(props){
        super(props);
        this.state={
            storeId:this.props.match.params.id
        }
    }

  handleStoreHome = () => {
    this.props.history.push(`/homeSetting/${this.state.storeId}`);
  };

  handleStoreLogo = () => {
    this.props.history.push(`/logoSetting/${this.state.storeId}`);
  };

  handleStoreProfile=()=>{
      this.props.history.push(`/storeprofile/${this.state.storeId}`)
  }

  handleStoreBilling=()=>{
    this.props.history.push(`/billingSetting/${this.state.storeId}`)
  }
  
  handleStoreShipping=()=>{
    this.props.history.push(`/shippingSetting/${this.state.storeId}`)
  }
  handleSocialMedia=()=>{
    this.props.history.push(`/socialMediaSetting/${this.state.storeId}`)
  }
  handleTheme=()=>{
    this.props.history.push(`/themes/${this.state.storeId}`)
  }
  handleContentPage=()=>{
    this.props.history.push(`/contentSetting/${this.state.storeId}`)
  }
  handleBlogSetting=()=>{
    this.props.history.push(`/blogSettings/${this.state.storeId}`)
  }
  render() {
    return (
      <div className="store_setting">
        <Dashboard>
          <div className="container">
            <div className="store_setting_heading">store settings</div>
            <div className="row col-12 p-0 settingRow">
              <div
                className="col-4  "
               
              >
                <div className="setting_icon active"  onClick={e => {
                  this.handleStoreHome(e);
                }}>
                  <div className="my-5">
                    <div className="text-center icon mb-3">
                      <i className="fas fa-home"></i>
                    </div>
                    <div className="text-center iconLabel mt-3">Home page</div>
                  </div>
                </div>
              </div>
              <div
                className="col-4 ">
                <div className="setting_icon"  onClick={e => {
                  this.handleStoreLogo(e)
                }}>
                  <div className="my-5">
                    <div className="text-center icon mb-3">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <div className="text-center iconLabel mt-3">Logo</div>
                  </div>
                </div>
              </div>
              <div className="col-4 ">
                  <div className="setting_icon"  onClick={e => {
                  this.handleStoreProfile(e)
                }}
                >
                    <div className="my-5">
                      <div className="text-center icon mb-3">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="text-center iconLabel mt-3">Profile</div>
                    </div>
                  </div>
              </div>
            </div>
            {/* Row 2 start */}
            <div className="row col-12 p-0 settingRow">
              <div className="col-4 setting-icons">
               
                  <div className="setting_icon" onClick={e => {
                  this.handleStoreBilling(e)
                }}>
                    <div className="my-5">
                      <div className="text-center icon mb-3">
                        <i className="fas fa-money-check-alt"></i>
                      </div>
                      <div className="text-center iconLabel mt-3">Billing</div>
                    </div>
                  </div>
              
              </div>
              <div className="col-4 ">
                
                  <div className="setting_icon" onClick={e => {
                  this.handleStoreShipping(e)
                }}>
                    <div className="my-5">
                      <div className="text-center icon mb-3">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <div className="text-center iconLabel mt-3">Shipping</div>
                    </div>
                  </div>
               
              </div>
              <div className="col-4 ">
                  <div className="setting_icon" onClick={e => {
                  this.handleSocialMedia(e)
                }}>
                    <div className="my-5">
                      <div className="text-center icon mb-3">
                        <i className="fab fa-twitter"></i>
                      </div>
                      <div className="text-center iconLabel mt-3">
                        Social Media
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {/* Row 2 ends */}

            {/* Row 3 Starts */}

            <div className="row col-12 p-0 settingRow">
              <div className="col-4">
                  <div className="setting_icon" onClick={e => {
                  this.handleTheme(e), this.toggleClass;
                }}>
                    <div className="my-5">
                      <div className="text-center icon mb-3">
                        <i className="fas fa-pen"></i>
                      </div>
                      <div className="text-center iconLabel mt-3">Theme</div>
                    </div>
                  </div>
              </div>
              <div className="col-4">
                  <div className="setting_icon" onClick={e => {
                  this.handleContentPage(e), this.toggleClass;
                }}>
                    <div className="my-5">
                      <div className="text-center icon mb-3">
                        <i className="fas fa-file"></i>
                      </div>
                      <div className="text-center iconLabel mt-3">
                        Content Pages
                      </div>
                    </div>
                  </div>
              </div>
              <div className="col-4 ">
               
                  <div className="setting_icon" onClick={e => {
                  this.handleBlogSetting(e), this.toggleClass;
                }}>
                    <div className="my-5">
                      <div className="text-center icon mb-3">
                        <i className="fas fa-comment-alt"></i>
                      </div>
                      <div className="text-center iconLabel mt-3">Blog</div>
                    </div>
                  </div>
              </div>
            </div>
            {/* Row 3 ends */}
          </div>
        </Dashboard>
      </div>
    );
  }
}
