import React, { Component } from "react";
import "./displayBrands.css";
import { connect } from "react-redux";
import * as BrandAction from "../../actions/brandsAction";
import StoreImg from "../../../public/images/store.png";
import Pagination from "react-js-pagination";

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
      isDisable: false
    };
  }
  componentDidMount() {
    this.props.getBrands();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isBrandEnable !== this.props.isBrandEnable ||
      prevProps.isBrandDisable !== this.props.isBrandDisable
    ) {
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
    console.log(" inside handleSearchInput", e.target);
    e.preventDefault();
    this.setState({ searchTxt: e.target.value });
  };

  // Handle Search
  searchFilter = search => {
    return function(x) {
      return (
        x.name.toLowerCase().includes(search.toLowerCase()) ||
        x.products_quantity.toLowerCase().includes(search.toLowerCase()) ||
        !search
      );
    };
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
                <input type="checkbox" />
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
                    <a className="dropdown-item">View Product</a>
                  </div>
                </div>
              </td>
            </tr>
          );
        });
    }
  };

  displayForm = () => {
    this.props.history.push("/addBrand");
  };

  handleEditBrand = id => {
    this.props.history.push(`/editBrand/${id}`);
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
                  defaultChecked={this.state.chkbox}
                  onChange={this.handleChangeChk}
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
      <div className="">
        <div className="container">
          <div className="img_content_wprapper">
            <h1>Brands</h1>
            <p style={{ fontSize: "16px" }}>MegaStore</p>
            <div className="row">
              <div className="col-4 m-auto">
                <img
                  src={StoreImg}
                  alt="pic"
                  style={{ width: "80px", height: "80px" }}
                  className="ml-5"
                />
              </div>
              <div className="col-8">
                <p className="store_description">
                International entertainment retailing chain, founded in early 1976 by (Sir) Richard Branson as a record shop on London’s Oxford Street. In 1979 the company opened their first Megastore at the end of Oxford Street and Tottenham Court Road.[1] The company expanded to hundreds of stores worldwide in the 1990s, but has lost a large number of stores in recent years, largely with the sale and eventual closing of the UK, US, Irish, Canadian, Australian, Italian, Spanish, French, Greek and Japanese stores. By 2015, current operations are exclusively in the Middle East and in North Africa, consisting of approximately 40 stores.[2]
                </p>
              </div>
            </div>
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
                  onChange={this.handleSearchInput}
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="filter">Filter</div>
            <div className="brands_actions">Action</div>
            <div className="add_brands" onClick={this.displayForm}>+ Add
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
    );
  }
}

const mapStateToProps = state => {
  return {
    BrandsReducer: state.BrandsReducer,
    isBrandDisable: state.BrandsReducer.isBrandDisable,
    isBrandEnable: state.BrandsReducer.isBrandEnable
  };
};

export default connect(
  mapStateToProps,
  { ...BrandAction }
)(Brands);
