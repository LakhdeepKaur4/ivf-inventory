import React, { Component } from "react";
import Dashboard from "../../components/dashboard/dashboard";
import {
  createProductDetails,
  createProductData,
  updateProduct,
  productData,
  productVariant,
  getProductById

} from "../../actions/createProductAction";
import { getBrands } from "../../actions/brandsAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import _ from "underscore";
import "./createProduct.css";
import $ from 'jquery';
import UploadComponent from '../../components/uploadComponent/uploadComponent';
import HostResolver from "../../components/resolveHost/resolveHost";
import { OnKeyPressUserhandler, onKeyPresshandlerNumber } from "../../components/validationComponent/validationComponent"

class CreateProduct extends Component {
  alreadyFetchedProductDetail = false;
  constructor(props) {
    super(props);

    this.state = {
      brandId: "",
      fileName: "",
      picture: "",
      name: '',
      sku: '',
      optStock: '',
      price: '',
      range: '',
      subtitle: "",
      vendor: "",
      description: "",
      originCountry: "",
      template: "",
      hashtags: [],
      metafields: [],
      tagsInfo: [],
      host: [],
      productPictures: [],
      variants: [],
      errors: {}
    };
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
                    <div key={option1.title}>
                      <div style={{ fontSize: '15px' }}>
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

  // for add tag
  handleDelete = i => {
    const { hashtags } = this.state;
    this.setState({
      hashtags: hashtags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = tag => {
    this.setState(state => ({ hashtags: [...state.hashtags, tag] }));
  };

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.hashtags];
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    // re-render
    this.setState({ hashtags: newTags });
  };

  //for detail name
  handleDeleteDetail = i => {
    const { metafields } = this.state;
    this.setState({
      metafields: metafields.filter((tag, index) => index !== i)
    });
  };

  handleAdditionDetail = tag => {
    this.setState(state => ({ metafields: [...state.metafields, tag] }));
  };

  handleDragDetail = (tag, currPos, newPos) => {
    const tags = [...this.state.metafields];
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    // re-render
    this.setState({ metafields: newTags });
  };

  // for details info
  handleDeleteInfo = i => {
    const { tagsInfo } = this.state;
    this.setState({
      tagsInfo: tagsInfo.filter((tag, index) => index !== i)
    });
  };

  handleAdditionInfo = tag => {
    this.setState(state => ({ tagsInfo: [...state.tagsInfo, tag] }));
  };

  handleDragInfo = (tag, currPos, newPos) => {
    const tags = [...this.state.tagsInfo];
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    // re-render
    this.setState({ tagsInfo: newTags });
  };



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

  onPriceChange = (e) => {

    let obj = {}
    if (e.target.name == 'range') {
      obj.range = parseInt(e.target.value)
    }

    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value.trim(''), errors, price: obj });
    }
    else {
      this.setState({ [e.target.name]: e.target.value, price: obj });
    }

  }

  //for Brands
  onChangeBrand = e => {
    let selected = e.target.value;
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({ [e.target.name]: e.target.value.trim(''), errors, brandId: selected });
    }
    else {
      this.setState({ [e.target.name]: e.target.value.trim(''), brandId: selected });
    }
  };

  //for picture
  handleSubmit = e => {
    e.preventDefault();

  };

  // handleImageChange = e => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = e => {
  //     let obj = {};
  //     obj.fileName = file.name
  //     obj.picture = e.target.result;
  //     this.setState({
  //       fileName: file.name,
  //       picture: e.target.result,
  //       productPictures: [...this.state.productPictures, obj]
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };

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

  previousForm = () => {
    this.props.history.push("/productsView");
  };

  formSubmit = (e) => {

    e.preventDefault();

    let errors = {};
    if (!this.state.name) {
      errors.name = "can't be empty"
    }
    else if (this.state.brandId === '') {
      errors.brandId = "can't be empty";
    }

    else if (this.state.subtitle === '') {
      errors.subtitle = "can't be empty";
    }

    else if (this.state.sku === '') {
      errors.sku = "can't be empty";
    }

    else if (this.state.optStock === '') {
      errors.optStock = "can't be empty";
    }

    else if (this.state.range === '') {
      errors.range = "can't be empty";
    }


    else if (this.state.description === '') {
      errors.description = "can't be empty";
    }

    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0;

    const { brandId, name, fileName, picture, sku, optStock, price, subtitle, vendor, description, originCountry, template, hashtags, metafields, tagsInfo, productPictures, variants } = this.state

    let itemId = this.props.match.params.itemid;


    let payload = { brandId, fileName, picture, name, sku, optStock, price, subtitle, vendor, description, originCountry, template, hashtags, metafields, tagsInfo, productPictures, variants }

    if (isValid) {

      if (itemId) {

        this.props.updateProduct(this.state.host[1], itemId, { brandId, name, sku, optStock, price, subtitle, vendor, description, originCountry, template, hashtags, metafields, tagsInfo, productPictures, variants: this.props.CreateProductReducer.productData.item.variants })
          .then(() => {
            this.props.getProductById(this.state.host[1],itemId);
            this.alreadyFetchedProductDetail = false;
            this.props.history.push("/productsView");
          });
      }
      else {
        
        this.props.productData(this.state.host[1], payload).then((resp) => {

         this.props.getProductById(this.state.host[1], 
          this.props.CreateProductReducer.getProductInfo.item._id);
          this.alreadyFetchedProductDetail = false;
          this.props.history.push("/productTree");
        });

      }
    }

  };



  // brand dropdown
  brandName = ({ brandsList }) => {
    if (brandsList) {
      return brandsList.map(item => {
        return (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    let itemId = nextProps.match.params.itemid;
    if (itemId) {
      // let itemId = nextProps.CreateProductReducer.getProductInfo.itemId;
      if (itemId && !this.alreadyFetchedProductDetail) {
        this.alreadyFetchedProductDetail = true;
        this.props.getProductById(this.state.host[1], itemId);
        return;
      }
      let productData = nextProps.CreateProductReducer.productData;
      if (productData) {
        let product = productData.item;

        if (this.alreadyFetchedProductDetail && product) {
          console.log(product,"==========================")
          this.setState({
            brandId: product.brandId,
            name: product.name,
            sku: product.sku,
            optStock: product.optStock,
            range: product.price.range,
            price:product.price,
            subtitle: product.subtitle,
            vendor: product.vendor,
            description: product.description,
            originCountry: product.originCountry,
            template: product.template,
            hashtags: product.hashtags,
            metafields: product.metafields,
            tagsInfo: product.tagsInfo,
            productPictures: product.productPictures
          })
        }
      }

    }
    else {
      if (nextProps.CreateProductReducer.getProductInfo) {
        // let itemId = nextProps.CreateProductReducer.getProductInfo.itemId;
        if (itemId && !this.alreadyFetchedProductDetail) {
          this.alreadyFetchedProductDetail = true;
          this.props.getProductById(this.state.host, itemId);
          return;
        }
      }
      this.setState({
        brandId: "",
        fileName: "",
        picture: "",
        name: '',
        sku: '',
        optStock: '',
        range: '',
        subtitle: "",
        vendor: "",
        description: "",
        originCountry: "",
        template: "",
        hashtags: [],
        metafields: [],
        tagsInfo: [],
        productPictures: [],
        errors: {},
        folderStructure:'createProduct'
      });
    }

  }

  setHost = async host => {
    let arr = this.state.host;
    arr.push(host);
    await this.setState({ host: arr });
    this.props.getBrands(this.state.host[1]);
    this.props.createProductDetails(this.state.host[1]);
  };

  onFileUploaded = URL => {
    console.log(URL);
    this.setState({productPictures: [...this.state.productPictures, URL] });
  };

  render() {
    let { productPictures } = this.state;
    let $imagePreview = null;


    if (productPictures) {
      $imagePreview = productPictures.map((item, index) => {
        return <tr>
          <td><span className="orderNo">{index + 1}</span></td>

          <td><img src={item.picture ? item.picture : `${this.state.host[0]}${item}`} style={{ width: "60px" }} value={this.state.picture} alt="productPic" /></td>
          <td> <i className="fa fa-close close-icon" onClick={() => {
            this.setState(prevState => {
              let productPictures = [...prevState.productPictures]
              productPictures.splice(index, 1);
              return {
                productPictures
              }
            })
          }} aria-hidden="true"></i></td>
        </tr>


      })
    }

    const placeholder = "addtag";
    const placeholderDetail = "Detail name";
    const placeholderInfo = "Detail info";

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
        <div>
          <Dashboard>
            <div className="mainDiv text-muted">
              <h3>
                <b>CREATE PRODUCT</b>
              </h3>
              <div className="subTitle">
                <h5>
                  <b></b>
                </h5>
              </div>
              <div className="container mt-4">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="card mainCard border border-0">
                      <div className="variants  text-muted">
                        {this.renderProduct(this.props.CreateProductReducer) ? this.renderProduct(this.props.CreateProductReducer) : <div><h5>Title</h5></div>}
                        {this.renderVariants(this.props.CreateProductReducer)}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <label>
                      <h5>Details</h5>
                    </label>
                    <div className="text-muted">
                      <form onSubmit={this.formSubmit}>
                        <div className="h5 small text-danger">Title</div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="text"
                              className="form-control  border border-top-0 border-right-0 border-left-0 border-dark rounded-0 "
                              id="name"
                              name="name"
                              value={this.state.name}
                              placeholder="Title"
                              onChange={this.onChange}
                              maxLength={50}
                            />
                            <span style={{ color: 'red' }}>{this.state.errors.name}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 row mx-auto">
                            <div className="col-12 mx-0 p-0">
                              <select
                                className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                                id="brandId"
                                name="brandId"
                                value={this.state.brandId}
                                onChange={this.onChangeBrand}
                                style={{ backgroundColor: "#F2F4F7" }}
                                type="select"
                              >
                                <option >
                                  Select Brands
                                </option>
                                {this.brandName(this.props.BrandsReducer)}
                              </select>
                            </div>
                            <div
                              className="col-1 float-right my-auto"
                              style={{ marginLeft: "-40px" }}
                            >
                              <i className="fa fa-angle-down"></i>
                            </div>
                            <span style={{ color: 'red' }}>{this.state.errors.brandId}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="text"
                              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                              id="inputAddress"
                              name="subtitle"
                              placeholder="Subtitle"
                              onChange={this.onChange}
                              value={this.state.subtitle}
                              maxLength={50}
                            />
                            <span style={{ color: 'red' }}>{this.state.errors.subtitle}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="text"
                              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                              id="sku"
                              name="sku"
                              placeholder="SKU"
                              onChange={this.onChange}
                              value={this.state.sku}
                              maxLength={50}
                            />
                            <span style={{ color: 'red' }}>{this.state.errors.sku}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="text"
                              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                              id="inputAddress"
                              name="optStock"
                              placeholder="Stock"
                              onKeyPress={onKeyPresshandlerNumber}
                              onChange={this.onChange}
                              value={this.state.optStock}
                              maxLength={8}
                            />
                            <span style={{ color: 'red' }}>{this.state.errors.optStock}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="text"
                              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                              id="range"
                              name="range"
                              placeholder="Price"
                              onKeyPress={onKeyPresshandlerNumber}
                              onChange={this.onPriceChange}
                              value={this.state.range}
                              maxLength={20}
                            />
                            <span style={{ color: 'red' }}>{this.state.errors.range}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="text"
                              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                              id="inputVendor"
                              name="vendor"
                              placeholder="Vendor"
                              onChange={this.onChange}
                              value={this.state.vendor}
                              onKeyPress={OnKeyPressUserhandler}
                              maxLength={50}
                            />
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="textarea"
                              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                              id="description"
                              name="description"
                              placeholder="Description"
                              onChange={this.onChange}
                              value={this.state.description}
                              maxLength={200}
                            />
                            <span style={{ color: 'red' }}>{this.state.errors.description}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 row mx-auto">
                            <div className="col-12 mx-0 p-0">
                              <select
                                className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                                name="originCountry"
                                onChange={this.onChange}
                                value={this.state.originCountry}
                                placeholder="Origin country"
                                style={{ backgroundColor: "#F2F4F7" }}
                                type="select"
                              >
                                <option>Origin country</option>
                                <option>U.K</option>
                                <option>RUSSIA</option>
                              </select>
                            </div>
                            <div
                              className="col-1 float-right my-auto"
                              style={{ marginLeft: "-40px" }}
                            >
                              <i className="fa fa-angle-down"></i>
                            </div>
                            <span style={{ color: 'red' }}>{this.state.errors.originCountry}</span>
                          </div>
                        </div>
                        <div className="form-row col-12">
                          <div className="form-group col-12 createProduct">
                            <input
                              type="text"
                              className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                              id="inputTemplate"
                              name="template"
                              placeholder="Template"
                              onChange={this.onChange}
                              value={this.state.template}
                              maxLength={150}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <label>
                      <h5>Media Galary</h5>
                    </label>
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
                    {/* <div className="card-footer image-card">
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
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="row justify-content-end m-2 ">
                <div className="col-4 text-muted">
                  <h5>Tags</h5>
                  <div>
                    <ReactTags
                      tags={this.state.hashtags}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      placeholder={placeholder}
                      className="text-muted d-flex flex-column"
                    />
                    {/* <span onClick={this.handleAddition}  ><i className="fa fa-plus" aria-hidden="true"></i></span> */}
                  </div>
                </div>
                <div className="col-4 text-muted">
                  <h5>Metadata</h5>
                  <div className="form-row col-12">
                    <div className="form-group col-6">
                      <ReactTags
                        tags={this.state.metafields}
                        handleDelete={this.handleDeleteDetail}
                        handleAddition={this.handleAdditionDetail}
                        handleDrag={this.handleDragDetail}
                        placeholder={placeholderDetail}
                        className="text-muted"
                      />
                    </div>
                    <div className="form-group col-6">
                      <ReactTags
                        tags={this.state.tagsInfo}
                        handleDelete={this.handleDeleteInfo}
                        handleAddition={this.handleAdditionInfo}
                        handleDrag={this.handleDragInfo}
                        placeholder={placeholderInfo}
                        className="text-muted"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card float-right"></div>
            </div>

            <div className="float-right" style={{ width: "618px" }}>
              <div className="float-right m-5">
                <button
                  className="button-back mr-3"
                  onClick={this.previousForm}
                >
                  <span className="text-btn-back">BACK</span>
                </button>
                <button
                  type="submit"
                  className="button-variant"
                  onClick={this.formSubmit}
                >
                  <span className="text-btn">{this.props.match.params.itemid ? 'SAVE' : 'CREATE'} PRODUCT</span>
                </button>
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
    CreateProductReducer: state.CreateProductReducer,
    BrandsReducer: state.BrandsReducer,
    isProductCreated: state.CreateProductReducer.isProductCreated
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(
    {
      createProductDetails,
      createProductData,
      updateProduct,
      getBrands,
      productData,
      productVariant,
      getProductById
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProduct);
