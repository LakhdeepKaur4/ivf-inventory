import React, { Component } from "react";
import "./editBrand.css";
import { connect } from "react-redux";
import {
  getBrandDetails,
  updateBrandDetails
} from "../../actions/brandsAction";
import FileBase64 from "react-file-base64";
import Dashboard from "../../components/dashboard/dashboard";
import $ from 'jquery';
import HostResolver from '../../components/resolveHost/resolveHost';

class EditBrands extends Component {
  state = {
    brandName: this.props.brandDetail.name,
    description: this.props.brandDetail.description,
    status:this.props.brandDetail.status,
    logoUrl:`http://192.168.1.113:3000/${this.props.brandDetail.logo_url}`,
    fileName: [],
    picture: "",
    host:""
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


   // Get host url

   setHost = host => {
    this.setState({host});
  }
  // Update Brand Details

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
    this.props.updateBrandDetails(payload,this.props.match.params.id,this.state.host);
    this.setState({
      brandName: "",
      description: "",
      status: "",
      picture: ""
    });
  };

  // Handle Cancle button

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
      <HostResolver hostToGet="inventory" hostResolved={host => {
        this.setHost(host);
      }}>
      <Dashboard>
        <div className="edit_brand ">
          {this.props.brandDetail ? (
            <div className="container">
              <div className="bg-light text-dark p-4 mt-1">
                <p className="heading">EDIT BRANDS</p>
                <form>
                  <div>
                    <div className="brand_logo">
                      <img
                        src={this.state.logoUrl}
                        alt="brand_logo"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                    <div className="upload_logo">
                    <label for="file-upload" className="custom-file-upload">CHOOSE</label>
                    <FileBase64 id="file-upload" multiple={true} onDone={this.getFiles} />
                    </div>
                    </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                        name="brandName"
                        value={brandName}
                        onChange={this.handleInputChange}
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
                            defaultChecked={this.state.status===true?true:false}
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
                            defaultChecked={!this.state.status===true?true:false}
                          />
                          Disabled
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
                  <React.Fragment>
                    <button
                      className="brand_button"
                      onClick={this.saveBrandDetails}
                    >
                      UPDATE BRAND
                    </button>
                    <button
                      className="brand_button"
                      onClick={this.handleCancel}
                      style={{marginLeft:'100px'}}
                    >
                      CANCEL
                    </button>
                  </React.Fragment>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Dashboard>
      </HostResolver>
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