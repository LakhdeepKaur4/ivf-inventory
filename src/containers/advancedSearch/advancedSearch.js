import React, { Component } from "react";
import "./advancedSearch.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dashboard from "../../components/dashboard/dashboard";
import HostResolver from "../../components/resolveHost/resolveHost";
import {connect} from "react-redux";
import {searchKeyword,getShopList} from "../../actions/viewOrderAction"

class AdvancedSearch extends Component {
  constructor() {
    super();
    this.state = {
      host: "",
      searchTxt:"",
      orderStatus:"",
      paymentOption:"",
      shop:"",
      orderId:"",
      orderStart:"",
      orderEnd:"",
      createStartDate:'',
      createEndDate:'',
      updateStartDate: '',
      updateEndDate: '',
      shopList:'',
    };
  }

  handleDateChange =(name,event)=> {
     this.setState({[name]:event})
  };

  // Handle Input change
  handleChangeInput=event=>{
      this.setState({[event.target.name]:event.target.value})
  }

  // handle next button
  handleNextButton=()=>{
    const {searchTxt,orderStatus,paymentOption,orderId,
      orderStart,orderEnd,createStartDate,createEndDate,
      updateStartDate,updateEndDate,shop}=this.state
    let payload={
      searchTxt:searchTxt,
      orderStatus:orderStatus,
      paymentOption:paymentOption,
      orderId:orderId,
      orderStart:orderStart,
      orderEnd:orderEnd,
      createStartDate:createStartDate,
      createEndDate:createEndDate,
      updateStartDate:updateStartDate,
      updateEndDate:updateEndDate,
      shop:shop
    }
  this.props.searchKeyword(payload)
  this.props.history.push('/vieworders')
  }
  setHost = host => {
   this.setState({ host });
   this.props.getShopList(host)
  };

  // display shops
  
  displayShopList = ({ shopList }) => {
    if (shopList) {
      return shopList.map(item => {
        return (
          <option key={item.id} value={item.instanceId}>
            {item.selectedNode}{" "}{item.rootDomain}
          </option>
        );
      });
    }
  };

  render() {
    return (
      <HostResolver
        hostToGet="voxel"
        hostResolved={host => {
          this.setHost(host);
        }}
      >
        <Dashboard>
          <div className="container containerAdvancedSearch">
            <h3 className="p-4" style={{ color: "#555555" }}>
              ADVANCED SEARCH
            </h3>
            <span className="ml-4 search-keyword">
              Search Key words (tags)
            </span>
            <div className="row w-100">
              <div className="col-5">
                <div className="col-12">
                  <div className="md-form active-purple-2 mb-3 advanced-search">
                    <input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                      type="text"
                      style={{ backgroundColor: "transparent" }}
                      placeholder="search products"
                      value={this.state.searchTxt}
                      name="searchTxt"
                      onChange={this.handleChangeInput}
                    />
                  </div>

                  <div className="md-form active-purple-2 mb-3">
                    <select
                      className=" selectAdvancedSearch form-control border 
                      border-top-0 border-right-0 border-left-0 border-dark rounded-0 "
                      style={{ backgroundColor: "#F2F4F7" }}
                      type="select"
                      name='orderStatus'
                      value={this.state.orderStatus}
                      onChange={this.handleChangeInput}
                    >
                      <option>
                        Order status
                      </option>
                      <option  value="ordered">
                        Ordered
                      </option>
                      <option  value="Processing">
                        Processing
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                    <i className="fa fa-angle-down "></i>
                  </div>

                  <div className="md-form active-purple-2 mb-3">
                    <select
                      className=" selectAdvancedSearch form-control border border-top-0
                       border-right-0 border-left-0 border-dark rounded-0 "
                      style={{ backgroundColor: "#F2F4F7" }}
                      type="select"
                      name="paymentOption"
                      value={this.state.paymentOption}
                      onChange={this.handleChangeInput}
                    >
                      <option>Payment method</option>
                      <option value='method1'>Method1</option>
                      <option value='method2'>Method2</option>

                    </select>
                    <i className="fa fa-angle-down"></i>
                  </div>

                  <div className="md-form active-purple-2 mb-3 ">
                    <select
                      className=" selectAdvancedSearch fa fa-angle-down form-control 
                      border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                      type="select"
                      style={{ backgroundColor: "#F2F4F7" }}
                      placeholder="Select"
                      name="shop"
                      value={this.state.shop}
                      onChange={this.handleChangeInput}
                    >
                      <option>Shop</option>
                      {this.displayShopList(this.props.ViewOrderReducer)}
                    </select>
                    <i className="fa fa-angle-down"></i>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="col-12">
                  <div className="md-form active-purple-2 mb-3 row">
                    <div className="col-5 fontLabels">Order ID</div>
                    <div className="col-7">
                    <input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 float-left"
                      type="text"
                      name="orderId"
                      value={this.state.orderId}
                      onChange={this.handleChangeInput}
                      style={{ backgroundColor: "transparent" }}
                    />
            
                    </div>
                  </div>

                  <div className="md-form active-purple-2 mb-3 row">
                    <div className="col-5 fontLabels">Order Amount</div>
                    <div className="col-3"><input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                      type="text"
                      value={this.state.orderStart}
                      name="orderStart"
                      onChange={this.handleChangeInput}
                      style={{ backgroundColor: "transparent" }}
                    /></div>
                    <div className="col-1 fontLabels">to</div>
                    <div className="col-3">
                    <input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                      type="text"
                      name="orderEnd"
                      value={this.state.orderEnd}
                      onChange={this.handleChangeInput}
                      style={{ backgroundColor: "transparent" }}
                    />
                    </div>
                  </div>

                  <div className="md-form active-purple-2 mb-3 row">
                    <div className="mt-auto mb-auto col-5 fontLabels">
                      Order createdAt from
                    </div>
                    <div className="col-3">
                    <DatePicker
                      selected={this.state.createStartDate}
                      onChange={(event)=>{this.handleDateChange('createStartDate',event)}}
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                    />
                    <i className="far fa-calendar-alt"></i>
                    </div>
                  
                    <div className="col-1 fontLabels">to</div>
                    <div className="col-3">
                    <DatePicker
                      selected={this.state.createEndDate}
                      onChange={(event)=>{this.handleDateChange('createEndDate',event)}}
                      name="createEndDate"
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                    />
                    <i className="far fa-calendar-alt"></i>
                    </div>
                  </div>

                  <div className="md-form active-purple-2 mb-3 row">
                    <div className="mt-auto mb-auto col-5 fontLabels">
                      Order updatedAt from
                    </div>
                    <div className="col-3">
                    <DatePicker
                      selected={this.state.updateStartDate}
                      onChange={(event)=>{this.handleDateChange('updateStartDate',event)}}
                      name="updateStartDate"
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                    />
                    <i className="far fa-calendar-alt"></i>
                    </div>
                  
                    <div className="col-1 fontLabels">to</div>
                    <div className="col-3">
                    <DatePicker
                      selected={this.state.updateEndDate}
                      onChange={(event)=>{this.handleDateChange('updateEndDate',event)}}
                      name="updateEndDate"
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                    />
                    <i className="far fa-calendar-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn pl-5 pr-5 rounded-pill btnNextAdvanced"
                onClick={this.handleNextButton}
              >
                NEXT STEP
              </button>
            </div>
          </div>
        </Dashboard>
      </HostResolver>
    );
  }
}

const mapStateToProps=state=>{
  return{
  isSearchKeywordReceived:state.ViewOrderReducer.isSearchKeywordReceived,
  ViewOrderReducer:state.ViewOrderReducer
  }
}
export default connect(
  mapStateToProps,
  {searchKeyword,getShopList}
)(AdvancedSearch);
