import React, { Component } from "react";
import "./editBrand.css";
import { connect } from "react-redux";
import {
  getBrandDetails,
  updateBrandDetails
} from "../../actions/brandsAction";
import Dashboard from "../../components/dashboard/dashboard";
import $ from "jquery";
import HostResolver from "../../components/resolveHost/resolveHost";
import UploadComponent from "../../components/uploadComponent/uploadComponent";

class EditBrands extends Component {
  state = {
    brandName: "",
    description: "",
    status: "",
    logo_url: "",
    fileName: [],
    picture: "",
    host: [],
    status_value:"",
    folderStructure: "brands",
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
  
  componentWillReceiveProps(nextProps){
    if(this.props.brandDetail!==nextProps.brandDetail){
      this.setState({
        brandName:nextProps.brandDetail.name,
        description:nextProps.brandDetail.description,
        status:nextProps.brandDetail.status?'Enabled':'Disabled',
        logo_url: nextProps.brandDetail.logo_url
      })
    }
  }
  
  // Handle input change

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Get host url

  setHost = async host => {
    let arr = this.state.host;
    arr.push(host);
    await this.setState({host:arr});
    this.props.getBrandDetails(this.props.match.params.id, this.state.host[1])
  };
  // Update Brand Details

  saveBrandDetails = event => {
    event.preventDefault();
    const { brandName, description, status, picture ,logo_url} = this.state;
    let payload = {
      name: brandName ? brandName : this.props.brandDetail.name,
      description: description
        ? description
        : this.props.brandDetail.description,
      status: status,
      logo_url: logo_url ? logo_url : ""
    };
    if (!picture) {
      delete payload.logo;
    }
    this.props.updateBrandDetails(
      payload,
      this.props.match.params.id,
      this.state.host[1],
      res=>{
        if(res){
          this.props.history.push("/brands")
        }
      }
      
    );
    this.setState({
      brandName: "",
      description: "",
      status: "",
      picture: ""
    });
  };

  // Handle Cancle button

  handleCancel = () => {
    localStorage.removeItem('brandDetails');
    this.props.history.push("/brands");
  };

  onFileUploaded = URL => {
    
    this.setState({ logo_url: URL });
  };

  render() {
    const { brandName, description,logo_url } = this.state;
    return (
      <HostResolver
        hostToGet="inventory"
        hostResolved={host => {
          this.setHost(host);
        }}
      >
        <HostResolver
        hostToGet="minio"
        hostResolved={host => {
          this.setHost(host);
        }}
      >
        <Dashboard>
          <div className="edit_brand ">
            {this.props.brandDetail ? (
              <div className="container">
                <div className="text-dark p-4 mt-1">
                  <p className="heading">EDIT BRANDS</p>
                  <form>
                    <div>
                      <div className="brand_logo">
                        <img
                          src={`${this.state.host[0]}${logo_url}`}
                          alt="brand_logo"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </div>
                      <div className="upload_logo">
                      <UploadComponent
                        onFileUpload={this.onFileUploaded}
                        data={this.state.folderStructure}
                      />
                      </div>
                    </div>
                    <div className="form-row ">
                      <div className="form-group col-md-6 mt-20">
                        <input
                          type="text"
                          className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                          name="brandName"
                          value={brandName}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-row mt-20">
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
                        <label htmlFor="status" className="status">
                          Status
                        </label>
                        <div className="radio col-5 row">
                          <div className="col-1 text-right p-0">
                            <input
                              type="radio"
                              name="status"
                              value="Enabled"
                              checked={
                                this.state.status==='Enabled'
                              }
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
                              value="Disabled"
                              onChange={this.handleInputChange}
                              checked={
                                this.state.status==='Disabled'
                              }
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
                  <React.Fragment>
                    <button
                      className="brand_button"
                      onClick={this.saveBrandDetails}
                    >
                      UPDATE BRAND
                    </button>
                    <button
                      className="back_button"
                      onClick={this.handleCancel}
                      style={{ marginLeft: "100px" }}
                    >
                      BACK
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
      </HostResolver>
    );
  }
}
const mapStateToProps = state => {
  return {
    brandDetail: state.BrandsReducer.brandDetail,
    isBrandUpdate: state.BrandsReducer.isBrandUpdate,
  };
};
export default connect(
  mapStateToProps,
  { getBrandDetails, updateBrandDetails }
)(EditBrands);
