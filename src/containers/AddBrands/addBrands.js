import React, { Component } from "react";
import "./addBrands.css";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addBrand } from "../../actions/brandsAction";
import FileBase64 from "react-file-base64";
import Dashboard from "../../components/dashboard/dashboard";
import $ from 'jquery';

class AddBrands extends Component {
  state = {
    brandName: "",
    description: "",
    selected: "",
    errorBrandName: "",
    errorDescription: "",
    fileName: [],
    logo: "",
    errorLogo:"",
  };

  componentDidMount(){
    $("input[type=file]").attr("id","file-upload");
    $('#file-upload').change(function () {
      var i = $(this).prev('label').clone();
      var file = $('#file-upload')[0].files[0].name;
            $(this).prev('label').text(file);
    })
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
      this.setState({ selected: event.target.value });
    }
  };

  // Adding brand
  addBrand = event => {
    event.preventDefault();
    const { brandName, description, selected, logo } = this.state;
    if (this.validateForm()) {
      let payload = {
        name: brandName,
        description: description,
        status: selected,
        logo: logo
      };
      this.props.addBrand(payload);
      this.setState({
        brandName: "",
        description: "",
        selected: "",
        logo: ""
      });
    }
  };

  // Handle Cancle

  handleCancel = () => {
    this.props.history.push("/brands");
  };
  //upload file

  getFiles = files => {
    this.setState(
      { fileName: files[0].name, logo: files[0].base64 },
      () => {}
    );
  };
  //Validations

  validateForm = () => {
    let { brandName, description,fileName } = this.state;
    let errorBrandName = "";
    let errorDescription = "";
    let errorLogo="";
    let formIsValid = true;

    //brandname
    if (!brandName) {
      formIsValid = false;
      errorBrandName = "* Please enter brand name.";
    }
    if (!brandName.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
      formIsValid = false;
      // errorBrandName = "* Please enter alphabets only";
    }
    //description
    if (!description) {
      formIsValid = false;
      errorDescription = "* Please enter brand description.";
    }
    if (!description.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
      formIsValid = false;
      // errorDescription = "* Please enter alphabets only";
    }

    // Logo
    if(!fileName.length){
      formIsValid=false;
      errorLogo="* Please upload a logo"

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
      <Dashboard>
        <div className="add_brand ">
          <div className="container">
            <div className="bg-light text-dark p-4 mt-1">
              <p className="heading">add brand</p>
              <form>
                <div>
                  <span className="upload_logo">Upload your logo</span>
                  <span style={{marginLeft:'20px'}}>
                  <label for="file-upload" className="custom-file-upload">CHOOSE</label>
                    <FileBase64 id="file-upload" multiple={true} onDone={this.getFiles} />
                    </span>
                    <span style={{ paddingLeft:'20%' }} className="error_text">
                    {this.state.errorLogo}
                  </span>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
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
                      className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
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

                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="Enabled"
                          checked={true}
                          onChange={this.handleInputChange}
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
                        />
                        Disabled
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div >
                <span>
                  <button
                    className="brand_button"
                    type="submit"
                    onClick={this.addBrand}
                  >
                    SAVE BRAND
                  </button>
                </span>
                <span style={{marginLeft:'100px'}}>
                  <button
                    className="brand_button"
                    type="submit"
                    onClick={this.handleCancel}
                  >
                    CANCEL
                  </button>
                </span>
              </div>
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
    isNewBrandAdd: state.BrandsReducer.isNewBrandAdd
  };
};
export default connect(
  mapStateToProps,
  { addBrand }
)(AddBrands);