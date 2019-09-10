import React, { Component } from "react";
import { connect } from "react-redux";
import { getViewOrder,getSearchResult } from "../../actions/viewOrderAction";
import "./viewOrder.css";
import Pagination from "react-js-pagination";
import Dashboard from "../../components/dashboard/dashboard";
import HostResolver from "../../components/resolveHost/resolveHost";
import { timingSafeEqual } from "crypto";

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filterName: "customer",
      activePage: "1",
      limit: "5",
      totalItemsCount: "",
      host: "",
      dropdownClick: false,
      seachKeyword:[]
    };
  }


  // Handle Dropdown
  handleDropdown = () => {
    this.setState({ dropdownClick: !this.state.dropdownClick });
  };

  // Handle Page change
  handlePageChange = pageNumber => {};

  // Handle search input

  handleSearchInput = e => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };

  // Handle Search

  searchFilter = search => {
    return function(x) {
      return (
        x.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        x.status.toLowerCase().includes(search.toLowerCase()) ||
        !search
      );
    };
  };

  // Get host url
    setHost = async host => {
    await this.setState({ host: host });
    if(this.props.ViewOrderReducer.seachKeyword){
      this.props.getSearchResult(host,this.props.ViewOrderReducer.seachKeyword)
    }
    else
    this.props.getViewOrder(host);
  };

  // Handle Edit Order
  handleEditOrder = id => {
    this.props.history.push(`/editanorder/${id}`);
  };

  // Display orders list

  viewOrdersList = ({ viewOrder }) => {
    let orderStr = [];
    if (viewOrder) {
      return viewOrder
        .filter(this.searchFilter(this.state.search))
        .map(item => {
          item.cart.cartProducts.map(data => {
             return orderStr.push(data.productTitle);
          });
          orderStr = orderStr.join(", ");
          return (
            <tr key={item.orderId}>
              <td>{item.createdAt}</td>
              <td>{item.orderId}</td>
              <td>
                {item.status === "Failed" ? (
                  <span>
                    <i
                      className="fa fa-circle"
                      style={{ marginRight: "4px", color: "red" }}
                    ></i>
                  </span>
                ) : item.status === "Successful" ? (
                  <span>
                    <i
                      className="fa fa-circle"
                      style={{ marginRight: "4px", color: "green" }}
                    ></i>
                  </span>
                ) : (
                  <span>
                    <i
                      className="fa fa-circle"
                      style={{ marginRight: "4px", color: "yellow" }}
                    ></i>
                  </span>
                )}
                {item.status}
              </td>
              <td>{item.customer.name}</td>
              <td>{item.payment.amount}</td>
              <td>{orderStr}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    ...
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        this.handleEditOrder(item.orderId);
                      }}
                    >
                      Edit Order
                    </a>

                    <a className="dropdown-item">Process Order</a>
                  </div>
                </div>
              </td>
            </tr>
          );
        });
    }
  };

  render() {
    let viewOrderData = (
      <div className="table-responsive">
        <table className="table" style={{ fontSize: "13px" }}>
          <thead>
            <tr>
              <th scope="col">DATE</th>
              <th scope="col">ORDER ID</th>
              <th scope="col">STATUS</th>
              <th scope="col">CUSTOMER</th>
              <th scope="col">ST TOTAL</th>
              <th scope="col">ORDER</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.viewOrdersList(this.props.ViewOrderReducer)}</tbody>
        </table>
      </div>
    );
    return (
      <HostResolver
        hostToGet="inventory"
        hostResolved={host => {
          this.setHost(host);
        }}
      >
        <Dashboard>
          <div className="view-order-list">
            <div className="container">
              <div className="img_content_wprapper">
                <p className="heading">View Orders</p>
              </div>
              <div className="search_filter_wrapper d-flex">
                <div className="search">
                  <div className="form-group has-search">
                    <span
                      className="fa fa-search form-control-feedback"
                      style={{ color: "black" }}
                    ></span>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.search}
                      placeholder="Search"
                      onChange={this.handleSearchInput}
                    />
                  </div>
                </div>
                <div className=" my-auto ">
                  <div className="dropdown my-auto p-0">
                    <button
                      className="btn my-auto p-0"
                      type="button"
                      id="dropdownMenuButton1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={this.handleDropdown}
                    >
                      Limit
                      {this.state.dropdownClick ? (
                        <i className="fa fa-angle-up"></i>
                      ) : (
                        <i className="fa fa-angle-down"></i>
                      )}
                    </button>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <a className="dropdown-item">Limit10</a>
                      <a className="dropdown-item">Limit20</a>
                      <a className="dropdown-item">Limit30</a>
                    </div>
                  </div>
                </div>
                <div className="sw-action-bar__item sw-action-bar__item--right">
                  <Pagination
                    activePage={this.state.activePage}
                    firstPageText={<i className="fa fa-angle-left"></i>}
                    lastPageText={<i className="fa fa-angle-right"></i>}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.props.total}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClasss="page-link"
                  />
                </div>
              </div>
              <div className="orders_list">
                <div>{viewOrderData}</div>
              </div>
            </div>
          </div>
        </Dashboard>
      </HostResolver>
    );
  }
}

const mapStateToProps = state => {
  return {
    ViewOrderReducer: state.ViewOrderReducer,
    
  };
};

export default connect(
  mapStateToProps,
  { getViewOrder,getSearchResult }
)(ViewOrder);
