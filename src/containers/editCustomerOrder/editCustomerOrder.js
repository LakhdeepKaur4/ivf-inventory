import React, { Component } from "react";
import "./editCustomerOrder.css";
import {
  addCustomer,
  getCustomer,
  getOrderDetail,
  getOrderAddress
} from "../../actions/editCustomerOrderAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dashboard from "../../components/dashboard/dashboard";
import HostResolver from "../../components/resolveHost/resolveHost";

class EditCustomerOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: "",
      search: "",
      host: "",
      orderId: "",
      newCustomerDetail: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalcode: "",
        password: "",
        confirmPassword: "",
        phone: ""
      },
      tab: {
        tabNo: 1
      }
    };
  }

  onInitialLoad = host => {
    this.setState(
      {
        host
      },
      () => {
        let orderId = this.props.match.params.orderId;
        this.getOrderDetailsData(orderId);
      }
    );
  };

  componentWillReceiveProps(nextProps) {
    let orderId = nextProps.match.params.orderId;
    if (this.state.orderId != orderId) {
      this.getOrderDetailsData(orderId);
    }
  }

  getOrderDetailsData(orderId) {
    this.setState({
      orderId
    });
    this.props.getOrderDetail(this.state.host, orderId);
    this.props.getOrderAddress(this.state.host, orderId);
  }

  nextStepHandle = () => {
    if (this.props.orderId) {
      this.props.history.push(`/editproducts/${this.props.orderId}`);
    }
  };

  prevStatusHandle = () => {
    this.props.history.push("/vieworders");
  };

  searchOnChange = e => {
    this.props.getCustomer(this.state.host, e.target.value);
    this.setState({ search: e.target.value });
  };

  searchFilter = search => {
    return function(x) {
      return x.name.toLowerCase().includes(search.toLowerCase()) || !search;
    };
  };

  onChangeData = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      newCustomerDetail: {
        ...prevState.newCustomerDetail,
        [name]: value
      }
    }));
  };

  add = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      country,
      postalcode,
      state,
      phone,
      password
    } = this.state.newCustomerDetail;
    let payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      city: city,
      state: state,
      country: country,
      poastalcode: postalcode,
      phone: phone,
      password: password
    };
    this.props.addCustomer(this.state.host, payload,this.props.orderId);
  };

  updateTab = tabNo => {
    this.setState(prevState => ({
      tab: {
        ...prevState.tab,
        tabNo
      }
    }));
  };

  existingCustomer = customers => {
    if (customers) {
      return customers.map(item => {
        return item ? (
          <tr>
            <td>{`${item.firstname} ${item.lastname}`}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>{item.address}</td>
            <td>
              <button className="buttonupdate">
                <font color="#1ABC9C">Update</font>
              </button>
            </td>
          </tr>
        ) : (
          ""
        );
      });
    }
  };

  renderTabContent = () => {
    let tabContent = null;
    if (this.state.tab.tabNo == 1) {
      tabContent = (
        <div className="row">
          <div className="col-12">
            <div
              style={{ padding: "15px" }}
              className="md-form active-purple-2 mb-3 toggleCustomer1 row mt-3"
            >
              <div
                className="col-1"
                style={{ fontSize: "1.5rem", marginLeft: "-0.8rem" }}
              >
                <i className="fa fa-search"></i>
              </div>
              <div className="col-11">
                <input
                  className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                  list="customer"
                  name="search"
                  onChange={this.searchOnChange}
                  style={{
                    width: "50%",
                    backgroundColor: "transparent"
                  }}
                  placeholder="Search by name and email"
                  value={this.state.search}
                />

                <table className="table table-borderless existing-customers">
                  <tbody>
                    {this.existingCustomer(this.props.existingCustomers)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      tabContent = (
        <div className="toggleCustomer2">
          <div className="row mt-3 col-12">
            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="firstName"
                placeholder="First name"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.firstName}
              />
            </div>
            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="email"
                style={{ backgroundColor: "transparent" }}
                name="email"
                placeholder="Email"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.email}
              />
            </div>
          </div>
          <div className="row col-12">
            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="lastName"
                placeholder="Last name"
                value={this.state.newCustomerDetail.lastName}
                onChange={this.onChangeData}
              />
            </div>

            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="city"
                placeholder="City"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.city}
              />
            </div>
          </div>
          <div className=" row col-12">
            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="state"
                placeholder="State"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.state}
              />
            </div>
            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="country"
                placeholder="Country"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.country}
              />
            </div>
          </div>
          <div className="row col-12">
            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="postalcode"
                placeholder="Postal code"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.postalcode}
              />
            </div>

            <div className="md-form active-purple-2 mb-3 col-sm ">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="address"
                placeholder="Address"
                onChange={this.onChangeData}
                value={this.state.address}
              />
            </div>
          </div>
          <div className="row col-12">
            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="password"
                style={{ backgroundColor: "transparent" }}
                name="password"
                placeholder="Password"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.password}
              />
            </div>

            <div className="md-form active-purple-2 mb-3 col-sm">
              <input
                className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                type="text"
                style={{ backgroundColor: "transparent" }}
                name="phone"
                placeholder="phone"
                onChange={this.onChangeData}
                value={this.state.newCustomerDetail.phone}
              />
            </div>
          </div>
          <div className="md-form active-purple-2 mb-3 col-sm-6">
            <input
              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
              type="password"
              style={{ backgroundColor: "transparent" }}
              name="confirmPassword"
              placeholder="Retype Password"
              onChange={this.onChangeData}
              value={this.state.newCustomerDetail.confirmPassword}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              onClick={this.add}
              className="btn btn-secondary btnCreate  pl-5 pr-5 rounded-pill "
            >
              CREATE
            </button>
          </div>
        </div>
      );
    }
    return tabContent;
  };

  renderCustomerDetails = () => {
    let customerDetails = {};
    let shipmentAddress = null;
    let billingAddress = null;
    let address = null;

    if (this.props.customerDetails) {
      if (this.props.orderId == this.props.match.params.orderId) {
        customerDetails = this.props.customerDetails;
        if (customerDetails.addresses && customerDetails.addresses.length) {
          customerDetails.addresses.forEach(_address => {
            console.log(_address.type);
            if (_address.type == "billing") {
              billingAddress = _address;
            } else if (_address.type == "address") {
              address = _address;
            }
          });
        }
      }
    }

    if (
      this.props.orderAddress &&
      this.props.orderAddress.orderId == this.props.match.params.orderId
    ) {
      if (
        this.props.orderAddress.shipment &&
        this.props.orderAddress.shipment.address
      ) {
        shipmentAddress = this.props.orderAddress.shipment.address;
      }
    }
    return (
      <div className="card col-4 mr-4 ">
        <div className="card-body customer-info">
          <div className="row details">
            <div className="col">
              <label>First Name</label>
            </div>
            <div className="col value">{customerDetails.firstname}</div>
          </div>

          <div className="row details ">
            <div className="col">
              <label>Last Name</label>
            </div>
            <div className="col value">{customerDetails.lastname}</div>
          </div>
          <div className="row details">
            <div className="col">
              <label>Email</label>
            </div>
            <div className="col value">{customerDetails.email}</div>
          </div>
          <div className="row details">
            <div className="col">
              <label>Phone No</label>
            </div>
            <div className="col value">{customerDetails.phone}</div>
          </div>
          <div className="row details">
            <div className="col">
              <label>Address</label>
            </div>
            <div className="col value">
              {address ? (
                <p>
                  {address.address1}
                  <br />
                  {address.address2}
                  <br />
                  {address.city}
                  <br />
                  {address.country}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row details">
            <div className="col">
              <label>Billing</label>
            </div>
            <div className="col value">
              {billingAddress ? (
                <p>
                  {billingAddress.address1}
                  <br />
                  {billingAddress.address2}
                  <br />
                  {billingAddress.city}
                  <br />
                  {billingAddress.country}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row details">
            <div className="col">
              <label>Shipping</label>
            </div>
            <div className="col value">
              {shipmentAddress ? (
                <p>
                  {shipmentAddress.address1}
                  <br />
                  {shipmentAddress.address2}
                  <br />
                  {shipmentAddress.city}
                  <br />
                  {shipmentAddress.country}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <HostResolver hostToGet="inventory" hostResolved={this.onInitialLoad}>
        <div className="editCustomer">
          <Dashboard>
            <div className="mt-4 ml-4">
              <h4>EDIT ORDER</h4>
            </div>
            <div className="md-stepper-horizontal">
              <div className="md-step active">
                <div className="md-step-circle border border-danger bg-transparent text-danger">
                  <span>1</span>
                </div>
                <div className="md-step-title" style={{ color: "#F74A4A" }}>
                  Customer info
                </div>
                <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
              </div>
              <div className="md-step ">
                <div
                  className="md-step-circle border border-secondary bg-transparent"
                  style={{ color: "#4D4F5C" }}
                >
                  <span>2</span>
                </div>
                <div className="md-step-title" style={{ color: "#4D4F5C" }}>
                  Products
                </div>
                <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
              </div>
              <div className="md-step">
                <div
                  className="md-step-circle border border-secondary bg-transparent"
                  style={{ color: "#4D4F5C" }}
                >
                  <span>3</span>
                </div>
                <div className="md-step-title" style={{ color: "#4D4F5C" }}>
                  Finalize
                </div>
                <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
              </div>
            </div>
            <h5>Customer Information</h5>
            <div className="card-group row col-12 ">
              {this.renderCustomerDetails()}
              <div className="card col-8">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div
                        className="tab-edit-order"
                        onClick={() => {
                          this.updateTab(1);
                        }}
                      >
                        <h5
                          className={`card-title tabHead ${
                            this.state.tab.tabNo == 1 ? "" : "visible"
                          }`}
                        >
                          EXISTING Customer
                        </h5>
                        {this.state.tab.tabNo == 1 ? (
                          <hr className="underline" />
                        ) : null}
                      </div>
                    </div>
                    <div className="col">
                      <div
                        className="tab-edit-order"
                        onClick={() => {
                          this.updateTab(2);
                        }}
                      >
                        <h5
                          className={`card-title tabHead mr-5 ${
                            this.state.tab.tabNo == 2 ? "" : "visible"
                          }`}
                        >
                          NEW Customer
                        </h5>
                        {this.state.tab.tabNo == 2 ? (
                          <hr className="underline" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {this.renderTabContent()}
                </div>

                <div style={{ height: "20px" }}></div>
              </div>
            </div>
            <div className="text-center mt-4 float-right">
              <button
                type="button"
                class="btn btn-light stepbutton prevBtn"
                onClick={this.prevStatusHandle}
              >
                PREVIOUS STEP
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "#333333",
                  marginLeft: "6px",
                  marginRight: "23px"
                }}
                className="btn btn-secondary  pl-5 pr-5  rounded-pill"
                onClick={this.nextStepHandle}
              >
                NEXT STEP
              </button>
            </div>
            <div style={{ height: "52px" }}></div>
          </Dashboard>
        </div>
      </HostResolver>
    );
  }
}

function mapStateToProps(state) {
  let customerDetails = null;
  let reducerState = state.EditCustomerOrderReducer;
  let existingCustomers = [];
  let orderAddress = null;
  let orderId = null;

  if (reducerState.orderDetails) {
    customerDetails = reducerState.orderDetails.customer;
    orderId = reducerState.orderDetails.orderId;
  }

  if (reducerState.existingCustomers) {
    existingCustomers = reducerState.existingCustomers;
  }

  if (reducerState.orderAddress) {
    orderAddress = reducerState.orderAddress;
  }

  return {
    customerDetails,
    existingCustomers,
    orderAddress,
    orderId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCustomer,
      getCustomer,
      getOrderDetail,
      getOrderAddress
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCustomerOrder);
