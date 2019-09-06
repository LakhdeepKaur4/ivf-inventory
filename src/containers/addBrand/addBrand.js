import React, { Component } from "react";
import "./addBrand.css";
import { connect } from "react-redux";
import { addBrand } from "../../actions/brandsAction";
import Dashboard from "../../components/dashboard/dashboard";
import $ from "jquery";
import HostResolver from "../../components/resolveHost/resolveHost";
import UploadComponent from "../../components/uploadComponent/uploadComponent";
class AddBrand extends Component {
  state = {
    brandName: "",
    description: "",
    status: "",
    selected: "Enabled",
    errorBrandName: "",
    errorDescription: "",
    logo_url: "",
    errorLogo: "",
    folderStructure: "brands",
    host: ""
  };

  componentDidMount() {
    $("input[type=file]").attr("id", "file-upload");
    $("#file-upload").change(function() {
      var file = $("#file-upload")[0].files[0].name;
      $(this)
        .prev("label")
        .text(file);
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isNewBrandAdd !== this.props.isNewBrandAdd) {
      this.props.history.push("/brands");
    }
  }

  // Handle input change
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.checked) {
      this.setState({ status: event.target.value });
    }
  };

  // Adding brand
  addBrand = event => {
    console.log(this.state);
    event.preventDefault();
    const { brandName, description, status, selected, logo_url } = this.state;
    if (this.validateForm()) {
      let payload = {
        name: brandName,  
        description: description,
        status: status ? status : selected,
        logo_url: logo_url
      };
      this.props.addBrand(payload, this.state.host, this.props.page);
      this.setState({
        brandName: "",
        description: "",
        status: "",
        logo_url: ""
      });
    }
  };

  // Handle Cancle

  handleCancel = () => {
    this.props.history.push("/brands");
  };

  //upload file
  onFileUploaded = URL => {
    
    this.setState({ logo_url: URL });
  };

  setHost = host => {
    this.setState({ host });
  };
  //Validations

  validateForm = () => {
    let { brandName, description, logo_url } = this.state;
    let errorBrandName = "";
    let errorDescription = "";
    let errorLogo = "";
    let formIsValid = true;

    //brandname
    if (!brandName) {
      formIsValid = false;
      errorBrandName = "* Please enter brand name.";
    }

    //description
    if (!description) {
      formIsValid = false;
      errorDescription = "* Please enter brand description.";
    }

    //Logo
    if (!logo_url) {
      formIsValid = false;
      errorLogo = "* Please upload a logo";
    }
    this.setState({
      errorBrandName,
      errorDescription,
      errorLogo
    });
    return formIsValid;
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
          <div className="add_brand ">
            <div className="container">
              <div className=" text-dark p-4 mt-1">
                <p className="heading">add brand</p>
                <form>
                  <div>
                    <span className="upload_logo">Upload your logo</span>
                    <span style={{ marginLeft: "20px" }}>
                      <UploadComponent
                        onFileUpload={this.onFileUploaded}
                        data={this.state.folderStructure}
                      />
                    </span>
                    <span style={{ paddingLeft: "20%" }} className="error_text">
                      {this.state.errorLogo}
                    </span>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className="form-control border border-top-0 
                        border-right-0 border-left-0 border-dark rounded-0"
                        name="brandName"
                        placeholder="Brand Name"
                        value={this.state.brandName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="error_text">
                      {this.state.errorBrandName}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className="form-control border border-top-0 
                        border-right-0 border-left-0 border-dark rounded-0"
                        placeholder="Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="error_text">
                      {this.state.errorDescription}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="status" className="status">
                        Status
                      </label>

                      <div className="radio col-5 row">
                        <div className="col-1 text-right p-0">
                          <input
                            type="radio"
                            name="status"
                            value="enabled"
                            defaultChecked={true}
                            onChange={this.handleInputChange}
                            className="margin1 p-0"
                          />
                        </div>
                        <div className="col-11 text-left addLabel">
                          <div className="my-auto">Enabled</div>
                        </div>
                      </div>
                      <div className="radio col-5 row">
                        <div className="col-1 text-right p-0">
                          <input
                            type="radio"
                            name="status"
                            value="disabled"
                            onChange={this.handleInputChange}
                            className="margin1 p-0"
                          />
                        </div>
                        <div className="col-11 text-left addLabel">
                          <div className="my-auto">Disabled</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div>
                  <span>
                    <button
                      className="cancel_button"
                      type="submit"
                      onClick={this.handleCancel}
                    >
                      BACK
                    </button>
                  </span>
                  <span style={{ marginLeft: "60px" }}>
                    <button
                      className="brand_button"
                      type="submit"
                      onClick={this.addBrand}
                    >
                      SAVE BRAND
                    </button>
                  </span>
                </div>
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
    isNewBrandAdd: state.BrandsReducer.isNewBrandAdd,
    page: state.BrandsReducer.lastPage
  };
};
export default connect(
  mapStateToProps,
  { addBrand }
)(AddBrand);
