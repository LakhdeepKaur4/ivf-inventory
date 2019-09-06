import React, { Component } from "react";
import "./displayBrands.css";
import { connect } from "react-redux";
import * as BrandAction from "../../actions/brandsAction";
import Pagination from "react-js-pagination";
import Dashboard from "../../components/dashboard/dashboard";
import HostResolver from "../../components/resolveHost/resolveHost";

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: "",
      activePage: 1,
      limit: 10,
      totalItemsCount: "",
      brandsList: [],
      filterName: "name",
      displayAddBrandsForm: false,
      isDisable: false,
      multiSelect: [],
      isAllSelect: false,
      editId: "",
      host: "",
      dropdownClick: false,
      allIds: [],
      brandList: []
    };
  }

  // Handle Page change
  handlePageChange = pageNumber => {
    this.props.getActivePageBrandsDetails(pageNumber, this.state.host);
    this.setState({ activePage: pageNumber });
  };

  // Handle Enable
  handleEnable = id => {
    const { activePage, host } = this.state;
    this.props.enableBrand(id, activePage, host);
  };

  // Handle Disable
  handleDisable = id => {
    const { activePage, host } = this.state;
    this.props.disableBrand(id, activePage, host);
  };

  // Handle search input

  handleSearchInput = e => {
    e.preventDefault();
    this.setState({ searchTxt: e.target.value });
  };

  // Handle Search

  searchFilter = search => {
    return function(x) {
      return (
        x.name.toLowerCase().includes(search.toLowerCase()) ||
        x.description.toLowerCase().includes(search.toLowerCase()) ||
        !search
      );
    };
  };

  // Change status for multiple brands

  handleMultiple = value => {
    const { multiSelect, activePage, host } = this.state;
    this.props.changeStatus(value, multiSelect, activePage, host);
    this.setState({
      multiSelect: [],
      isAllSelect: false,
      dropdownClick: false
    });
  };

  // Handle Dropdown
  handleDropdown = () => {
    this.setState({ dropdownClick: !this.state.dropdownClick });
  };
  // Select all brands
  handleAllSelect = action => {
    if (this.state.searchTxt === "") {
      if (action === true) {
        let ids = [];
        let brands = this.props.BrandsReducer;
        brands.brandsList.map(item => {
          return ids.push(item._id);
        });
        this.setState({ multiSelect: ids, isAllSelect: true });
      } else {
        this.setState({ multiSelect: [], isAllSelect: false });
      }
    } else {
      if (action === true) {
        let ids = [];
        let brands = this.props.BrandsReducer;
        brands.brandsList
          .filter(this.searchFilter(this.state.searchTxt))
          .map(item => {
            return ids.push(item._id);
          });
        this.setState({ multiSelect: ids, isAllSelect: true });
      } else {
        this.setState({ multiSelect: [], isAllSelect: false });
      }
    }
  };

  // View products for a particular brand

  viewProducts = id => {
    this.props.history.push(`/productsView/${id}`);
  };

  // Get host url
  setHost = host => {
    this.props.getDefaultPageBrandsDetails(1, host);
    this.setState({ host });
  };

  // Get Ids for selected brands

  getId = (id, action) => {
    let ids = this.state.multiSelect;
    if (action === true) {
      ids.push(id);
    } else {
      ids.splice(ids.indexOf(id), 1);
    }
    this.setState({ multiSelect: ids });
  };

  // Navigate to add brands component
  displayForm = () => {
    this.props.history.push("/addBrand");
  };

  // Handle Edit brand
  handleEditBrand = id => {
    // this.props.getBrandDetails(id, this.state.host);
    this.props.history.push(`/editBrand/${id}`)
  };

  // Display brands list
  displayBrands = ({ brandsList }) => {
    if (brandsList) {
      return brandsList
        .filter(this.searchFilter(this.state.searchTxt))
        .map(item => {
          return (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  checked={
                    this.state.multiSelect.includes(item._id) ? true : false
                  }
                  onChange={e => {
                    this.getId(item._id, e.currentTarget.checked);
                  }}
                />
              </td>
              <td>
                <img
                  className="brand_logo"
                  // style={{ width: "30px", height: "30px" }}
                  alt={item.name}
                  src={`${this.state.host}/${item.logo_url}`}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.products_quantity}</td>
              <td style={{ textAlign: "justify" }}>{item.description}</td>
              <td>
                {item.status === true ? (
                  <p className="status" style={{ color: "#1ABC9C" }}>
                    Enabled
                  </p>
                ) : (
                  <p className="status" style={{ color: "#F46565" }}>
                    Disabled
                  </p>
                )}
              </td>
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
                      onClick={() => this.handleEditBrand(item._id)}
                    >
                      Edit
                    </a>
                    {item.status === false ? (
                      <a
                        className="dropdown-item"
                        onClick={() => this.handleEnable(item._id)}
                      >
                        Enable
                      </a>
                    ) : (
                      <a
                        className="dropdown-item"
                        onClick={() => this.handleDisable(item._id)}
                      >
                        Disable
                      </a>
                    )}
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        this.viewProducts(item._id);
                      }}
                    >
                      View Products
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          );
        });
    }
  };

  render() {
    let displayBrandsList = (
      <div className="table-responsive">
        <table className="table" style={{ fontSize: "13px" }}>
          <thead>
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  checked={this.state.isAllSelect}
                  onChange={e => {
                    this.handleAllSelect(e.currentTarget.checked);
                  }}
                />
              </th>
              <th scope="col">BRAND LOGO</th>
              <th scope="col">BRAND NAME</th>
              <th scope="col">PRODUCTS</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>{this.displayBrands(this.props.BrandsReducer)}</tbody>
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
          <div className="display_brands_list">
            <div className="container">
              <div className="img_content_wprapper">
                <p className="heading">Brands</p>
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
                      value={this.state.searchTxt}
                      placeholder="Search"
                      onChange={this.handleSearchInput}
                    />
                  </div>
                </div>
                <div className="brands_actions my-auto ">
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
                      Action
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
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          this.handleMultiple("enabled");
                        }}
                      >
                        Enable
                      </a>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          this.handleMultiple("disabled");
                        }}
                      >
                        Disable
                      </a>
                    </div>
                  </div>
                </div>
                <div className="add_brands" onClick={this.displayForm}>
                  + New
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
              <div className="display_brands">
                <div>{displayBrandsList}</div>
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
    BrandsReducer: state.BrandsReducer,
    isBrandDisable: state.BrandsReducer.isBrandDisable,
    isBrandEnable: state.BrandsReducer.isBrandEnable,
    brandDetail: state.BrandsReducer.brandDetail,
    total: state.BrandsReducer.total
  };
};

export default connect(
  mapStateToProps,
  { ...BrandAction }
)(Brands);
