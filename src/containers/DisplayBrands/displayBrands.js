import React, { Component } from "react";
import "./displayBrands.css";
import { connect } from "react-redux";
import * as BrandAction from "../../actions/brandsAction";
import Pagination from "react-js-pagination";
import Dashboard from "../../components/dashboard/dashboard";

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: "",
      activePage: 1,
      limit: 5,
      totalItemsCount: 10,
      brandsList: [],
      filterName: "name",
      displayAddBrandsForm: false,
      isDisable: false,
      multiSelect: [],
      isAllSelect: false,
      editId:'',
    };
  }
  componentDidMount() {
    this.props.getBrands();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.brandDetail !== this.props.brandDetail) {
      this.props.history.push(`/editBrand/${this.state.editId}`);
    }
  }
  // Handle Page change
  handlePageChange = pageNumber => {
    this.props.getPageDetails(pageNumber);
  };

  // Handle Enable

  handleEnable = id => {
    this.props.enableBrand(id);
  };

  // Handle Disable

  handleDisable = id => {
    this.props.disableBrand(id);
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
    this.props.changeStatus(value, this.state.multiSelect);
    this.setState({ multiSelect: [], isAllSelect: false });
  };

  // Select all brands

  handleAllSelect = action => {
    if (action === true) {
      let ids = [];
      let brands = this.props.BrandsReducer;

      brands.brandsList.map(item => {
        ids.push(item._id);
      });
      this.setState({ multiSelect: ids, isAllSelect: true });
    } else {
      this.setState({ multiSelect: [] });
    }
  };

  // View products for a particular brand

  viewProducts = id => {
    this.props.history.push(`/productsView/${id}`);
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
    this.props.getBrandDetails(id)
    this.setState({editId:id});
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
                  onClick={e => {
                    this.getId(item._id, e.currentTarget.checked);
                  }}
                />
              </td>
              <td>
                <img
                  style={{ width: "30px", height: "30px" }}
                  alt={item.name}
                  src={`http://192.168.1.113:3000/${item.logo_url}`}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.products_quantity}</td>
              <td style={{ textAlign: "justify" }}>{item.description}</td>
              <td>
                {item.status === true ? (
                  <p style={{ color: "#1ABC9C" }}>Enabled</p>
                ) : (
                  <p style={{ color: "#F46565" }}>Disabled</p>
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
                  onClick={e => {
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
              <th scope="col">...</th>
            </tr>
          </thead>
          <tbody>{this.displayBrands(this.props.BrandsReducer)}</tbody>
        </table>
      </div>
    );
    return (
      <Dashboard>
        <div className="">
          <div className="container">
            <div className="img_content_wprapper">
              <h1>Brands</h1>
            </div>
            <div className="search_filter_wrapper">
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
              <div className="filter">Filter</div>
              <div className="brands_actions">
                <div className="dropdown">
                  <button
                    className="btn"
                    type="button"
                    id="dropdownMenuButton1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Action
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
                + Add
              </div>
              <div className="pagination">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.limit}
                  totalItemsCount={this.state.totalItemsCount}
                  onChange={this.handlePageChange}
                />
              </div>
            </div>
            <div className="display_brands">
              <div>{displayBrandsList}</div>
            </div>
          </div>
        </div>
      </Dashboard>
    );
  }
}

const mapStateToProps = state => {
  return {
    BrandsReducer: state.BrandsReducer,
    isBrandDisable: state.BrandsReducer.isBrandDisable,
    isBrandEnable: state.BrandsReducer.isBrandEnable,
    brandDetail: state.BrandsReducer.brandDetail
  };
};

export default connect(
  mapStateToProps,
  { ...BrandAction }
)(Brands);
