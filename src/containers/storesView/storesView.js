import React, { Component } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import "./storesView.css";
import { getStores } from "../../actions/storesAction";
import Dashboard from "../../components/dashboard/dashboard";
import HostResolver from "../../components/resolveHost/resolveHost";

class ProductsView extends Component {
  state = {
    activePage: 1,
    limit: 10,
    totalItemsCount: 100,
    ordering: 1,
    stores: []
  };

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.stores !== this.props.stores) {
      let stores = nextProps.stores.map(store => ({
        ...store
      }));
      this.setState({ stores });
    }
  }

  setHost = host => {
    this.setState({ host });
    this.props.getStores(host);
  };

  handlePageChange = () => {};

  handleStoreSetting = (id) => {
    this.props.history.push(`/storeSetting/${id}`);
  };
  renderPagination() {
    return (
      <Pagination
        activePage={this.state.activePage}
        firstPageText={<i className="fa fa-angle-left"></i>}
        lastPageText={<i className="fa fa-angle-right"></i>}
        itemsCountPerPage={this.state.limit}
        totalItemsCount={this.state.totalItemsCount}
        onChange={this.handlePageChange}
        itemClass="page-item"
        linkClasss="page-link"
      />
    );
  }

  renderHeader() {
    return (
      <header>
        <div className="sw-header">
          <h2 className="sw-title">View Stores</h2>
        </div>
        <div className="sw-action-bar">
          <div className="sw-action-bar__item">
            <span
              className="sw-action-bar__text dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Actions
            </span>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
          <div className="sw-action-bar__item">
            <span
              className="sw-action-bar__text dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink2"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter
            </span>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink2"
            >
              <a className="dropdown-item" href="#">
                Action1
              </a>
              <a className="dropdown-item" href="#">
                Another action1
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
          <div className="sw-action-bar__item">
            <span className="sw-action-bar__text" role="button">
              {this.state.ordering == 1 ? (
                <i className="fas fa-sort-amount-down" aria-hidden="true"></i>
              ) : (
                <i className="fas fa-sort-amount-up" aria-hidden="true"></i>
              )}
              Order
            </span>
          </div>
          <div className="sw-action-bar__item">
            <span className="sw-action-bar__text" role="button">
              <i className="fa fa-plus"></i>
              New
            </span>
          </div>
          <div className="sw-action-bar__item sw-action-bar__item--right">
            {this.renderPagination()}
          </div>
        </div>
      </header>
    );
  }

  renderTableData() {
    return this.state.stores.map(store => {
      console.log("=================",store)
      return (
        <tr key={store.InstanceID}>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            {store.name}
          </td>
          <td>{store.rootDomain +''+ store.selectedNode }</td>
          <td>{store.description}</td>
          <td>{store['Group.name']}</td>
          <td>Trinity</td>
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
                <a className="dropdown-item" onClick={()=>this.handleStoreSetting(store.id)}>
                  Store Setting
                </a>

                <a className="dropdown-item">View Store</a>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  }

  renderTable() {
    return (
      <div className="sw-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col">Store Name</th>
              <th scope="col">Store URL</th>
              <th scope="col">Store descriptions</th>
              <th scope="col">Group</th>
              <th scope="col">Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData(this.props.ProductsViewReducer)}</tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <HostResolver
        hostToGet="voxel"
        hostResolved={host => {
          this.setHost(host);
        }}
      >
        <Dashboard>
          <div className="sw-wrapper-page">
            {this.renderHeader()}
            {this.renderTable()}
          </div>
        </Dashboard>
      </HostResolver>
    );
  }
}

function mapStateToProps(state) {
  let { stores } = state.StoresReducer;
  return {
    stores
  };
}

export default connect(
  mapStateToProps,
  { getStores }
)(ProductsView);
