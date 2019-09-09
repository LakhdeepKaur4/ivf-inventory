import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProductDetails, createProductData, productVariant, updateVariant, updateProduct } from '../../actions/createProductAction';
import Dashboard from '../../components/dashboard/dashboard';
import '../createProduct/createProduct.css';
import HostResolver from '../../components/resolveHost/resolveHost';
import { onKeyPresshandlerNumber, OnKeyPressUserhandler } from "../../components/validationComponent/validationComponent"

class ProductVariantOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '',
      picture: '',
      title: '',
      optionTitle: '',
      inventoryQuantity: '',
      color: '',
      price: '',
      originCountry: '',
      width: '',
      length: '',
      height: '',
      weight: '',
      host: '',
      pictures: [],
      errors: {}
    }
  }

  renderProduct = ({ productData }) => {
    productData = productData.item;
    if (productData) {

      return <div><div><h5>{productData.name}
        <span onClick={this.displayEditProductForm.bind(this, productData._id)}>
          <i
            className="fa fa-edit"
            aria-hidden="true"
            style={{ float: "right" }}
          ></i>
        </span>
      </h5></div>
        <div><b>Variants</b><span onClick={this.displayVariantForm.bind(this, productData._id)}>
          <i
            className="fa fa-plus"
            aria-hidden="true"
            style={{ float: "right" }}
          ></i>
        </span></div>
      </div>
    }
  }



  //for variants
  renderVariants({ productData }) {
    let variantsHtml = null;
    if (productData) {
      variantsHtml = productData.item.variants.map(item => {
        return (
          <div style={{ marginTop: '10px', marginLeft: '12px' }}>
            {item.title}
            <span>
              <i
                className="fa fa-edit float-right"
                aria-hidden="true"
                onClick={this.displayEditVariant.bind(this, item.title)}
                style={{ color: "#A3A6B4" }}
              ></i>
            </span>
            <div className="h5 small">
              {/* <span style={{ color: "#1ABC9C" }}>Visible</span>{" "} */}
              <span>XL SIZE</span>
            </div>
            <div>
              <b>Options</b>
                                    <span>
                <i
                  className="fa fa-plus float-right"
                  aria-hidden="true"
                  onClick={this.displayOptionForm.bind(this, item.title)}
                  style={{ color: "#A3A6B4" }}
                ></i>
              </span>
            </div>
            <div className="variants-option mt-2">
              {item.options
                ? item.options.map(option1 => {
                  return (
                    <div>
                      <div>
                        {option1.title}
                        <span>
                          <i
                            className="fa fa-edit float-right"
                            aria-hidden="true"
                            onClick={this.displayEditOptionForm.bind(
                              this,
                              item.title,
                              option1.title
                            )}
                            style={{ color: "#A3A6B4" }}
                          ></i>
                        </span>
                      </div>
                      <div className="h5 small">
                        {/* <span className="text-danger">Visible</span>{" "} */}
                        <span>color {option1.color}</span>
                      </div>
                    </div>
                  );
                })
                : ""}
            </div>
          </div>
        );

      })
    }
    let wrapper = (
      <div >
        {variantsHtml}
      </div>
    );
    return wrapper;
  }

  
  onChange = (e) => {
    if (this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value.trim(''), errors });
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }




  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = e => {
      let obj = {};
      obj.fileName = file.name
      obj.picture = e.target.result;
      this.setState({
        fileName: file.name,
        picture: e.target.result,
        pictures: [...this.state.pictures, obj]
      });
    };
    reader.readAsDataURL(file);
  };

  displayEditProductForm = (itemid) => {
    this.props.history.push(`/productTree/editProduct/${itemid}`)
  }

  displayVariantForm = (itemid) => {
    this.props.history.push(`/productTree/${itemid}/createVariant`);
  };

  displayEditVariant = (title) => {
    this.props.history.push(`/productTree/editVariant/${title}`);
  };


  displayOptionForm = (variantTitle) => {
    this.props.history.push(`/productTree/variant/${variantTitle}/createOption`);
  };

  displayEditOptionForm = (varTitle, optTitle) => {
    this.props.history.push(
      `/productTree/variant/${varTitle}/editOption/${optTitle}`
    );
  };

  componentWillReceiveProps() {

    let optionId = this.props.match.params.id;
    let variantTitle = this.props.match.params.title;

    if (optionId) {
      let variant = this.props.CreateProductReducer.productData.item.variants.find(variant => variant.title == variantTitle);
      let optionInd = variant.options.findIndex(option => option.title == optionId);

      let option = variant.options[optionInd];

      // this.props.updateVariant(variants);
      this.setState({
        pictures: option.pictures,
        title: option.title,
        optionTitle: option.optionTitle,
        inventoryQuantity: option.inventoryQuantity,
        originCountry: option.originCountry,
        color: option.color,
        price: option.price,
        width: option.width,
        length: option.length,
        height: option.height,
        weight: option.weight,
      })
    }

  }

  formSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!this.state.title) {
      errors.title = "can't be empty"
    }
    else if (this.state.optionTitle === '') {
      errors.optionTitle = "can't be empty";
    }


    else if (this.state.inventoryQuantity === '') {
      errors.inventoryQuantity = "can't be empty";
    }

    else if (this.state.color === '') {
      errors.color = "can't be empty";
    }

    else if (this.state.price === '') {
      errors.price = "can't be empty";
    }

    else if (this.state.originCountry === '') {
      errors.originCountry = "can't be empty";
    }

   

    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;


    let optionId = this.props.match.params.id;
    let title = this.props.match.params.title;

    let index = this.props.CreateProductReducer.productData.item.variants.findIndex(variant => variant.title == title);
    let variants = this.props.CreateProductReducer.productData.item.variants;
    let variant = variants[index];

    if(isValid){
      if (optionId) {
        let optionInd = variant.options.findIndex(option => option.title == optionId);
        variant.options[optionInd] = this.state;
      }
      else {
        if (variant.options) {
          variant.options.push(this.state);
        }
        else {
          variant.options = [this.state];
        }
      }
  
      this.props.updateProduct(this.state.host, this.props.CreateProductReducer.getProductInfo.itemId,
        { ...this.props.CreateProductReducer.productData.item });
      this.props.history.push("/productTree");
    }
  }


  setHost = async (host) => {
    await this.setState({ host: host });
    this.props.createProductDetails(this.state.host);
  }

  render() {
    let { pictures } = this.state;
    let $imagePreview = null;

    if (pictures) {
      $imagePreview = pictures.map((item, index) => {
        return <tr>
          <td><span className="orderNo">{index + 1}</span></td>
          <td><img src={item.picture} style={{ width: "60px" }} alt="productPic" value={this.state.picture} /></td>
          <td> <i className="fa fa-close close-icon" onClick = {()=>{
            this.setState(prevState=>{
              let pictures = [...prevState.pictures]
              pictures.splice(index,1);
              return{
                pictures
              }
            })
          }} aria-hidden="true"></i></td>
        </tr>
      })
    }

    return (
      <HostResolver hostToGet="inventory" hostResolved={host => {
        this.setHost(host)
      }}>
        <div>
          <Dashboard>
            <div className="mainDiv text-muted">
              <h3><b>CREATE PRODUCT</b></h3>
              <div className="subTitle">
                <h5><b></b></h5></div>
              <div className="container mt-4">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="card mainCard border border-0">
                      <div className="variants text-muted">
                        {this.renderProduct(this.props.CreateProductReducer) ? this.renderProduct(this.props.CreateProductReducer) : <div><h5>Title</h5></div>}
                        {this.renderVariants(this.props.CreateProductReducer)}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label><h5>Details</h5></label>
                    <div className=" text-dark">
                      <form onSubmit={this.formSubmit}>
                        <div className="h5 small text-danger">Title</div>
                        <div className="form-row col-12 ">
                          <div className="form-group col-12 createProduct">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" name="title" value={this.state.title} onChange={this.onChange} id="title" placeholder="Option 1" maxLength={50} />
                            <span style={{ color: 'red' }}>{this.state.errors.title}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="optionTitle" name="optionTitle" value={this.state.optionTitle} onChange={this.onChange} placeholder="Option Title" maxLength={50} />
                            <span style={{ color: 'red' }}>{this.state.errors.optionTitle}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inventoryQuantity" name="inventoryQuantity" value={this.state.inventoryQuantity} onChange={this.onChange} placeholder="Inventory Stock" onKeyPress={onKeyPresshandlerNumber} maxLength={10} />
                            <span style={{ color: 'red' }}>{this.state.errors.inventoryQuantity}</span>
                          </div>
                        </div>

                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="color" name="color" value={this.state.color} onChange={this.onChange} placeholder="Color" onKeyPress={OnKeyPressUserhandler} maxLength={50} />
                            <span style={{ color: 'red' }}>{this.state.errors.color}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="price" name="price" value={this.state.price} onChange={this.onChange} placeholder="Price" onKeyPress={onKeyPresshandlerNumber} maxLength={10} />
                            <span style={{ color: 'red' }}>{this.state.errors.price}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 row mx-auto">
                            <div className="col-12 mx-0 p-0">
                              <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" name="originCountry" value={this.state.originCountry} onChange={this.onChange} placeholder="Origin country" style={{ backgroundColor: '#F2F4F7' }} type="select">
                                <option>Origin country</option>
                                <option>U.K</option>
                                <option>RUSSIA</option>
                              </select>
                            </div>
                            <div className="col-1 float-right my-auto" style={{ marginLeft: "-40px" }}><i className="fa fa-angle-down"></i></div>
                          </div>
                        </div>
                        <div className="form-row col-12 createProduct">
                          <div className="form-group col-6">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="width" name="width" value={this.state.width} onChange={this.onChange} placeholder="Width" onKeyPress={onKeyPresshandlerNumber} maxLength={20} />
                          </div>
                          <div className="form-group col-6">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="length" name="length" value={this.state.length} onChange={this.onChange} placeholder="Length" onKeyPress={onKeyPresshandlerNumber} maxLength={20} />
                          </div>
                        </div>
                        <div className="form-row col-12 createProduct">
                          <div className="form-group col-6">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="height" name="height" value={this.state.height} onChange={this.onChange} placeholder="Height" onKeyPress={onKeyPresshandlerNumber} maxLength={20} />
                          </div>
                          <div className="form-group col-6">
                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="weight" name="weight" value={this.state.weight} onChange={this.onChange} placeholder="Weight" onKeyPress={onKeyPresshandlerNumber} maxLength={20} />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label><h5>Media Galary</h5></label>
                    <div className="col-12 p-0">
                      <div className="card table text-muted">
                        <table>
                          <thead>
                            <tr>
                              <th>ORDER</th>
                              <th>TITLE</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {$imagePreview}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer image-card">
                      <label htmlFor="file" className="ml-3">
                        <div>
                          <i className="fa fa-picture-o" aria-hidden="true"></i>
                          <span className="ml-1">
                            drag image or click to upload
                                                </span>
                        </div>
                      </label>
                      <div className="previewComponent">
                        <form onSubmit={e => this.handleSubmit(e)}>
                          <input
                            className="fileInput hidden"
                            type="file"
                            id="file"
                            onChange={e => this.handleImageChange(e)}
                          />
                          <button
                            className="submitButton hidden"
                            type="submit"
                            onClick={e => this.handleSubmit(e)}
                          >
                            Upload Image
                                                </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-right" style={{ width: '618px' }}>
              <div className="float-right m-5">
                <button className="button-back mr-3" onClick={this.displayVariantForm}><span className="text-btn-back">BACK</span></button>
                <button type="submit" className="button-variant" onClick={this.formSubmit}><span className="text-btn">{this.props.match.params.id ? 'SAVE' : 'CREATE'} OPTION</span></button>
              </div>
            </div>
          </Dashboard>
        </div>
      </HostResolver>
    );
  }
}

function mapStateToProps(state) {
  return {
    CreateProductReducer: state.CreateProductReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createProductDetails, createProductData, productVariant, updateVariant, updateProduct }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariantOption);

