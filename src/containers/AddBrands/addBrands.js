import React, { Component } from "react";
import "./addBrands.css";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addBrand } from "../../actions/brandsAction";
import FileBase64 from "react-file-base64";

class AddBrands extends Component {
  state = {
    brandName: "",
    description: "",
    selected: "",
    errorBrandName: "",
    errorDescription: "",
    fileName: [],
    picture: ""
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isNewBrandAdd !== this.props.isNewBrandAdd) {
      this.props.history.push("/brands");
    }
  }

  // Handle input change
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.checked) {
      this.setState({ selected: event.target.value }, () => {
      });
    }
  };

  // Adding brand
  addBrand = event => {
    event.preventDefault();
    const { brandName, description, selected, picture } = this.state;
    if (this.validateForm()) {
      let payload = {
        name: brandName,
        description: description,
        status: selected,
        logo: picture
      };
      this.props.addBrand(payload);
      this.setState({
        brandName: "",
        description: "",
        selected: "",
        picture: ""
      });
    }
  };

  //upload file

  getFiles = files => {
    this.setState(
      { fileName: files[0].name, picture: files[0].base64 },
      () => {}
    );
  };
  //Validations

  validateForm = () => {
    let { brandName, description } = this.state;
    let errorBrandName = "";
    let errorDescription = "";
    let formIsValid = true;

    //brandname
    if (!brandName) {
      formIsValid = false;
      errorBrandName = "* Please enter  brand name.";
    }
    if (!brandName.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
      formIsValid = false;
      // errorBrandName = "* Please enter alphabets only";
    }
    //description
    if (!description) {
      formIsValid = false;
      errorDescription = "* Please enter last name.";
    }
    if (!description.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
      formIsValid = false;
      // errorDescription = "* Please enter alphabets only";
    }

    this.setState({
      errorBrandName,
      errorDescription
    });
    return formIsValid;
  };

  render() {
    return (
      <div className="add_brand ">
        <div className="container">
          <div className="bg-light text-dark p-4 mt-1">
            <p className="heading">ADD BRANDS</p>
            <form>
              <div>
                <FileBase64 multiple={true} onDone={this.getFiles} />
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
                <div style={{ color: "red" }}>{this.state.errorBrandName}</div>
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
                <div style={{ color: "red" }}>
                  {this.state.errorDescription}
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
                        checked={this.state.selected === true}
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
                        checked={this.state.selected === false}
                        onChange={this.handleInputChange}
                      />
                      Disabled
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <button
              className="brand_button"
              type="submit"
              onClick={this.addBrand}
            >
              SAVE BRAND
            </button>
          </div>
        </div>
      </div>
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
