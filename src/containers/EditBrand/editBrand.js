import React, { Component } from "react";
import "./editBrand.css";
import { connect } from "react-redux";
import {
  getBrandDetails,
  updateBrandDetails
} from "../../actions/brandsAction";
import FileBase64 from "react-file-base64";
import Dashboard from "../../components/dashboard/dashboard";

class EditBrands extends Component {
  state = {
    brandName: this.props.brandDetail.name,
    description: this.props.brandDetail.description,
    status:'',
    fileName: [],
    picture: "",
    isReadOnly: true,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isBrandUpdate !== this.props.isBrandUpdate) {
      this.props.history.push("/brands");
    }
  }

  // Handle input change

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.checked) {
      this.setState({ status: event.target.value });
    };
  };

  // Enabling form to edit brand details

  editBrandDetails = () => {
    this.setState({ isReadOnly: false });
  };

  // Save Brand Details

  saveBrandDetails = event => {
    event.preventDefault();
    const { brandName, description, status, picture } = this.state;

    let payload = {
      name: brandName ? brandName : this.props.brandDetail.name,
      description: description
        ? description
        : this.props.brandDetail.description,
      status: status,
      logo: picture ? picture : ""
    };
    if (!picture) {
      delete payload.logo;
    }
    this.props.updateBrandDetails(payload, this.props.match.params.id);
    this.setState({
      brandName: "",
      description: "",
      status: "",
      picture: ""
    });
  };

  // Handle Cancle

  handleCancel = () => {
    this.props.history.push("/brands");
  };

  //upload file

  getFiles = files => {
    this.setState(
      { fileName: files[0].name, picture: files[0].base64 },
      () => {}
    );
  };

  render() {
    const { brandName, description} = this.state;
    return (
      <Dashboard>
        <div className="edit_brand ">
          {this.props.brandDetail ? (
            <div className="container">
              <div className="bg-light text-dark p-4 mt-1">
                <p className="heading">EDIT BRANDS</p>
                <form>
                  {this.state.isReadOnly ? (
                    <div>
                      <img
                        src={`http://192.168.1.113:3000/${this.props.brandDetail.logo_url}`}
                        alt="brand_logo"
                      />
                    </div>
                  ) : (
                    <div>
                      <FileBase64 multiple={true} onDone={this.getFiles} />
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                        name="brandName"
                        value={brandName}
                        onChange={this.handleInputChange}
                        readOnly={this.state.isReadOnly}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                        name="description"
                        value={description}
                        onChange={this.handleInputChange}
                        readOnly={this.state.isReadOnly}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="status" style={{ fontWeight: "bold" }}>
                        Status
                      </label>

                      <div className="radio">
                        <label>
                          <input
                            type="radio"
                            name="status"
                            value="Enabled"
                            onChange={this.handleInputChange}
                            readOnly
                          />
                          Enabled
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input
                            type="radio"
                            name="status"
                            value="Disabled"
                            onChange={this.handleInputChange}
                            readOnly
                          />
                          Disabled
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
                {this.state.isReadOnly ? (
                  <button
                    className="brand_button"
                    onClick={this.editBrandDetails}
                  >
                    EDIT BRAND
                  </button>
                ) : (
                  <React.Fragment>
                    <button
                      className="brand_button"
                      onClick={this.saveBrandDetails}
                    >
                      SAVE BRAND
                    </button>
                    <button
                      className="brand_button"
                      onClick={this.handleCancel}
                    >
                      CANCEL
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Dashboard>
    );
  }
}
const mapStateToProps = state => {
  return {
    brandDetail: state.BrandsReducer.brandDetail,
    isBrandUpdate: state.BrandsReducer.isBrandUpdate
  };
};
export default connect(
  mapStateToProps,
  { getBrandDetails, updateBrandDetails }
)(EditBrands);