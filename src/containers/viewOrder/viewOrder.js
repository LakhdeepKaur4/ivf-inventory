import React, { Component } from "react";
import { connect } from "react-redux";
import { getSearchResult } from "../../actions/viewOrderAction";
import "./viewOrder.css";
import Pagination from "react-js-pagination";
import Dashboard from "../../components/dashboard/dashboard";
import HostResolver from "../../components/resolveHost/resolveHost";
// import { timingSafeEqual } from "crypto";

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
        // x.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
        x.status.toLowerCase().includes(search.toLowerCase()) ||
        !search
      );
    };
  };

  // Get host url
    setHost = async host => {
    await this.setState({ host: host });
      this.props.getSearchResult(host,this.props.ViewOrderReducer.seachKeyword)
  };

  // Handle Edit Order
  handleEditOrder = id => {
    this.props.history.push(`/editanorder/${id}`);
  };


  // Handle Process order
  handleProcessOrder=id=>{
    this.props.history.push(`/processOrder/${id}`)
  }
  // handle back button

  handleBackButton=()=>{
    this.props.history.push("/advancedSearch")
  }
  // Display orders list
  viewOrdersList = ({ viewOrder }) => {
    const orderStr = [];
    if (viewOrder) {
      return viewOrder
        .filter(this.searchFilter(this.state.search))
        .map(item => {
          item.cart.cartProducts.map(data => {
              orderStr.push(data.productTitle);
          });
          let productStr = orderStr.join(", ");
          let color=item.status==='NEW'?'#F46565':(item.status==='COMPLETED'?'#1ABC9C':'#F79F2B')
          return (
            <tr key={item.orderId}>
              <td>{item.createdAt.split('T')[0]}</td>
              <td>{item.orderId}</td>
              <td style={{color:color}}>
              
              {item.status}
              </td>
              <td>{item.customer.firstname}</td>
              <td>{item.amount}</td>
              <td>{productStr}</td>
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

                    <a className="dropdown-item" onClick={()=>{this.handleProcessOrder(item.orderId)}}>Process Order</a>
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
        <table className="table viewOrderTable">
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
                <div className="row">
                  <div className="col-12">
                  <p className="view-orders-heading">View Orders</p>
                  </div>
                </div>
                <div className="row iconsRow">
                  <div className="col-1 ">
                    <i className="fa fa-sort-amount-down" aria-hidden="true"></i></div>
                  <div className="col-1">
                    <i className="fa fa-sort-amount-up" aria-hidden="true"></i></div>
                  <div className="col-2">
                  <select type="select">
                    <option>Limit</option>
                    <option>Limit 10</option>
                    <option>Limit 20</option>
                    <option>Limit 30</option>
                  </select>
                  {/* <i className="fa fa-angle-down"/> */}
                  </div>
                  <div className="col-2">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearchInput}/>
                    </div>
                  <div className="col-2">
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
                </div>
              <div className="orders_list">
                <div>{viewOrderData}</div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn pl-5 pr-5 rounded-pill btnNextAdvanced"
                onClick={this.handleBackButton}
              >
                back
              </button>
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
  {getSearchResult }
)(ViewOrder);
