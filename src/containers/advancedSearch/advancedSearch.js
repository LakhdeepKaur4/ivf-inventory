import React, { Component } from "react";
import "./advancedSearch.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dashboard from "../../components/dashboard/dashboard";
import HostResolver from "../../components/resolveHost/resolveHost";

class AdvancedSearch extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      host: "",
      searchTxt:"",
      optionStatus:"",
      paymentOption:"",
      shop:"",
      orderId:"",
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  // Handle Input change
  handleChangeInput=event=>{
    //   console.log(`Name is :${event.target.name} and value ${event.target.value}`)
      this.setState({[event.target.name]:event.target.value} )
 //   this.props.getSearchResult(this.state.searchTxt,this.state.host)
  }
  setHost = async host => {
    await this.setState({ host });
  };

  render() {
    return (
      <HostResolver
        hostToGet="inventory"
        hostResolved={host => {
          this.setHost(host);
        }}
      >
        <Dashboard>
          <div className="container containerAdvancedSearch">
            <h3 className="p-4" style={{ color: "#555555" }}>
              ADVANCED SEARCH
            </h3>
            <span className="ml-4" style={{ color: "salmon" }}>
              Search Key words (tags)
            </span>
            <div className="row w-100">
              <div className="col-5">
                <div className="col-12">
                  <div className="md-form active-purple-2 mb-3">
                    <input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0"
                      type="text"
                      style={{ backgroundColor: "transparent" }}
                      placeholder="pants,nike"
                      value={this.state.searchTxt}
                      name="searchTxt"
                      onChange={this.handleChangeInput}
                    />
                  </div>

                  <div className="md-form active-purple-2 mb-3">
                    <select
                      className="selectAdvancedSearch form-control border 
                      border-top-0 border-right-0 border-left-0 border-dark rounded-0 "
                      style={{ backgroundColor: "#F2F4F7" }}
                      type="select"
                      name='optionStatus'
                      value={this.state.optionStatus}
                      onChange={this.handleChangeInput}
                    >
                      <option>
                        Order status
                      </option>
                      <option  value="Open">
                        Open
                      </option>
                      <option  value="Processing">
                        Processing
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                    <i className="fa fa-angle-down"></i>
                  </div>

                  <div className="md-form active-purple-2 mb-3">
                    <select
                      className="selectAdvancedSearch form-control border 
                      border-top-0 border-right-0 border-left-0 border-dark rounded-0"
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
                    >
                      <option>Shop</option>
                    </select>
                    <i className="fa fa-angle-down"></i>
                  </div>
                </div>
              </div>
              <div className="col-5" style={{ color: "#43425D" }}>
                <div className="col-12">
                  <div className="md-form active-purple-2 mb-3 row">
                    <div className="col-6">Order ID</div>
                    <input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 col-2"
                      type="text"
                      name="odrderId"
                      value={this.state.orderId}
                      onChange={this.handleChangeInput}
                      style={{ backgroundColor: "transparent" }}
                    />
            
                  </div>

                  <div className="md-form active-purple-2 mb-3 row">
                    <div className="col-6">Order Total</div>
                    <input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 col-2"
                      type="text"
                      style={{ backgroundColor: "transparent" }}
                    />
                    <div className="col-2">to</div>
                    <input
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 col-2"
                      type="text"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>

                  <div className="md-form active-purple-2 mb-3 row">
                    <div className="mt-auto mb-auto col-2 mr-4">
                      Order Created
                    </div>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 col-6"
                    />
                    <div
                      className="col-1 mt-auto mb-auto"
                      style={{ marginLeft: "-100px" }}
                    >
                      <i className="far fa-calendar-alt"></i>
                    </div>
                    <div className="col-2">to</div>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 col-6"
                    />
                    <div
                      className="col-1 mt-auto mb-auto"
                      style={{ marginLeft: "-100px" }}
                    >
                      <i className="far fa-calendar-alt"></i>
                    </div>
                  </div>

                  <div className="md-form active-purple-2 mb-3 row">
                    <div
                      className="mt-auto mb-auto col-5"
                      style={{ marginRight: "-50px" }}
                    >
                      Order Update
                    </div>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 col-6"
                    />
                    <div
                      className="col-1 mt-auto mb-auto"
                      style={{ marginLeft: "-100px" }}
                    >
                      <i className="far fa-calendar-alt"></i>
                    </div>
                    <div className="col-2">to</div>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      className="form-control border border-top-0 
                      border-right-0 border-left-0 border-dark rounded-0 col-6"
                    />
                    <div
                      className="col-1 mt-auto mb-auto"
                      style={{ marginLeft: "-100px" }}
                    >
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
              >
                NEXT STEP
              </button>
            </div>
            <div style={{ height: "52px" }}></div>
          </div>
        </Dashboard>
      </HostResolver>
    );
  }
}

export default AdvancedSearch;
