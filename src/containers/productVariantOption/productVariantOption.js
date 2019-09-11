import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProductDetails, createProductData, productVariant, updateVariant, updateProduct, getProductById } from '../../actions/createProductAction';
import Dashboard from '../../components/dashboard/dashboard';
import '../createProduct/createProduct.css';
import HostResolver from '../../components/resolveHost/resolveHost';
import UploadComponent from '../../components/uploadComponent/uploadComponent';
import $ from 'jquery';
import { onKeyPresshandlerNumber, OnKeyPressUserhandler } from "../../components/validationComponent/validationComponent"

class ProductVariantOption extends Component {
  constructor(props) {
    super(props);
    this.alreadyFetchedProductDetail = false;
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
      host: [],
      variantPictures: [],
      errors: {},
      folderStructure: 'createProduct'
    }
  }

  renderProduct = ({ productData }) => {
    if (productData && productData.item) {
      productData = productData.item;
      return <div className="text-muted"><div><h5>{productData.name}
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

  componentDidMount() {
    $("input[type=file]").attr("id", "file-upload");
    $("#file-upload").change(function () {
      var file = $("#file-upload")[0].files[0].name;
      $(this)
        .prev("label")
        .text(file);
    });

  }


  renderProduct = ({ productData }) => {
    if (productData) {
      productData = productData.item;
      return <div className="text-muted"><div><h5>{productData.name}
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
  componentDidMount() {
    $("input[type=file]").attr("id", "file-upload");
    $("#file-upload").change(function () {
      var file = $("#file-upload")[0].files[0].name;
      $(this)
        .prev("label")
        .text(file);
    });

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
                onClick={this.displayEditVariant.bind(this, productData.item._id, item._id)}
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
                  onClick={this.displayOptionForm.bind(this, productData.item._id, item._id)}
                  style={{ color: "#A3A6B4" }}
                ></i>
              </span>
            </div>
            <div className="variants-option mt-2">
              {item.options
                ? item.options.map(option1 => {
                  return (
                    <div key={option1.title}>
                      <div style={{ fontSize: '15px' }}>
                        {option1.title}
                        <span>
                          <i
                            className="fa fa-edit float-right"
                            aria-hidden="true"
                            onClick={this.displayEditOptionForm.bind(
                              this,
                              productData.item._id,
                              item._id,
                              option1._id
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


  displayEditProductForm = (itemid) => {
    this.props.history.push(`/productTree/editProduct/${itemid}`)
  }

  displayVariantForm = (itemid) => {
    this.props.history.push(`/productTree/${itemid}/createVariant`);
  };

  displayEditVariant = (productId, variantId) => {
    this.props.history.push(`/productTree/${productId}/editVariant/${variantId}`);
  };


  displayOptionForm = (productId, variantId) => {
    this.props.history.push(`/productTree/${productId}/variant/${variantId}/createOption`);
  };

  displayEditOptionForm = (productId, varId, optId) => {
    this.props.history.push(
      `/productTree/${productId}/variant//${varId}/editOption/${optId}`
    );
  };

  componentWillReceiveProps(nextProps) {

    let optionId = nextProps.match.params.optionId;
    let variantId = nextProps.match.params.variantId;
    let itemId = nextProps.match.params.itemid;
    this.props = nextProps;
    if (itemId && !this.alreadyFetchedProductDetail) {
      this.alreadyFetchedProductDetail = true;
      this.props.getProductById(this.state.host[1], itemId)
      return;
    }

    if (optionId && this.props.CreateProductReducer.productData && this.props.CreateProductReducer.productData.item
      && this.props.CreateProductReducer.productData.item.variants) {
      let variant = this.props.CreateProductReducer.productData.item.variants.find(variant => variant._id == variantId);
      if (!variant) {
        return;
      }
      let optionInd = variant.options.findIndex(option => option._id == optionId);
      let option = variant.options[optionInd];
      this.setState({
        variantPictures: option.variantPictures,
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


    let optionId = this.props.match.params.optionId;
    let variantId = this.props.match.params.variantId;
    let itemId = this.props.match.params.itemid;

    let index = this.props.CreateProductReducer.productData.item.variants.findIndex(variant => variant._id == variantId);
    let variants = this.props.CreateProductReducer.productData.item.variants;
    let variant = variants[index];

    if (isValid) {
      if (optionId) {
        let optionInd = variant.options.findIndex(option => option._id == optionId);
        variant.options[optionInd] = { ...this.state, _id: variant.options[optionInd]._id };
      }
      else {
        if (variant.options) {
          variant.options.push(this.state);
        }
        else {
          variant.options = [this.state];
        }
      }

      this.props.updateProduct(this.state.host[1], itemId,
        { ...this.props.CreateProductReducer.productData.item }).then(() => {
          this.props.history.push(`/productTree/editProduct/${itemId}`);
        })

    }
  }


  setHost = async (host) => {
    let arr = this.state.host;
    arr.push(host);
    await this.setState({ host: arr });
    this.props.createProductDetails(this.state.host[1]);
  }

  onFileUploaded = URL => {
    this.setState({ variantPictures: [...this.state.variantPictures, URL] });
  };

  render() {
    let { variantPictures } = this.state;
    let $imagePreview = null;

    if (variantPictures) {
      $imagePreview = variantPictures.map((item, index) => {
        return <tr>
          <td><span className="orderNo">{index + 1}</span></td>
          <td><img src={item.picture ? item.picture : `${this.state.host[0]}${item}`} style={{ width: "60px" }} value={this.state.picture} alt="productPic" /></td>
          <td> <i className="fa fa-close close-icon" onClick={() => {
            this.setState(prevState => {
              let variantPictures = [...prevState.variantPictures]
              variantPictures.splice(index, 1);
              return {
                variantPictures
              }
            })
          }} aria-hidden="true"></i></td>
        </tr>
      })
    }

    return (
      <HostResolver
        hostToGet="inventory"
        hostResolved={host => {
          this.setHost(host)
        }}>
        <HostResolver
          hostToGet="minio"
          hostResolved={host => {
            this.setHost(host);
          }}
        >
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
                      <UploadComponent
                        onFileUpload={this.onFileUploaded}
                        data={this.state.folderStructure}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="float-right" style={{ width: '618px' }}>
                <div className="float-right m-5">
                  <button className="button-back mr-3" onClick={this.displayVariantForm}><span className="text-btn-back">BACK</span></button>
                  <button type="submit" className="button-variant" onClick={this.formSubmit}><span className="text-btn">{this.props.match.params.optionId ? 'SAVE' : 'CREATE'} OPTION</span></button>
                </div>
              </div>
            </Dashboard>
          </div>
        </HostResolver>
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
  return bindActionCreators({
    createProductDetails, createProductData, productVariant, updateVariant, updateProduct,
    getProductById
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariantOption);

