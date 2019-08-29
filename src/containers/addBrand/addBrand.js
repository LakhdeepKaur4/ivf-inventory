import React, { Component } from "react";
import "./addBrand.css";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addBrand } from "../../actions/brandsAction";
import FileBase64 from "react-file-base64";
import Dashboard from "../../components/dashboard/dashboard";
import $ from 'jquery';
import HostResolver from '../../components/resolveHost/resolveHost';

class AddBrand extends Component {
  state = {
    brandName: "",
    description: "",
    status: "enabled",
    errorBrandName: "",
    errorDescription: "",
    fileName: [],
    logo: "",
    errorLogo:"",
    host:''
  };

  componentDidMount(){
    $("input[type=file]").attr("id","file-upload");
    $('#file-upload').change(function () {
      // var i = $(this).prev('label').clone();
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
      this.setState({ status: event.target.value });
    }
  };

  // Adding brand
  addBrand = event => {
    event.preventDefault();
    const { brandName, description, status, logo } = this.state;
    if (this.validateForm()) {
      let payload = {
        name: brandName,
        description: description,
        status: status,
        logo: logo
      };
      this.props.addBrand(payload,this.state.host);
      this.setState({
        brandName: "",
        description: "",
        status: "",
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

  setHost = host => {
    this.setState({host});
  }
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
    if (!brandName.match(/^[A-Za-z]+$/)) {
      formIsValid = false;
      // errorBrandName = "* Please enter alphabets only";
    }
    //description
    if (!description) {
      formIsValid = false;
      errorDescription = "* Please enter brand description.";
    }
    if (!description.match(/^[A-Za-z]+$/)) {
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
      <HostResolver hostToGet="inventory" hostResolved={host => {
        this.setHost(host);
      }}>
        <Dashboard>
        <div className="add_brand ">
          <div className="container">
            <div className=" text-dark p-4 mt-1">
              <p className="heading">add brand</p>
              <form>
                <div>
                  <span className="upload_logo">Upload your logo</span>
                  <span style={{marginLeft:'20px'}}>
                  <label htmlFor="file-upload" className="custom_file_upload">CHOOSE</label>
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
                          defaultChecked={true}
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
                    className="cancel_button"
                    type="submit"
                    onClick={this.handleCancel}
                  >
                    BACK
                  </button>
                </span>
                <span style={{marginLeft:'60px'}}>
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
    isNewBrandAdd: state.BrandsReducer.isNewBrandAdd
  };
};
export default connect(
  mapStateToProps,
  { addBrand }
)(AddBrand);