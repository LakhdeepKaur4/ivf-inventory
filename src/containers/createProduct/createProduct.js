import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import { createProductDetails,productData } from '../../actions/createProductAction';
import {getBrands} from '../../actions/brandsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import _ from 'underscore';
import './createProduct.css';




class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            brandId:'',
            fileName: '',
            picture: '',
            name:'',
            title: '',
            subTitle: '',
            vendor: '',
            description: '',
            originCountry: '',
            template: '',
            hashtags: [],
            tagsDetail: [],
            tagsInfo: [],



        }
    }

    componentDidMount() {
        
        this.props.getBrands();
        this.props.createProductDetails();
      }
    
      // for add tag
    handleDelete = (i) => {
        const { hashtags } = this.state;
        this.setState({
            hashtags: hashtags.filter((tag, index) => index !== i),
        });
    }

  
    handleAddition = (tag) => {
        this.setState(state => ({ hashtags: [...state.hashtags, tag] }));
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.hashtags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ hashtags: newTags });
    }

    
    //for detail name
    handleDeleteDetail = (i) => {
        const { tagsDetail } = this.state;
        this.setState({
            tagsDetail: tagsDetail.filter((tag, index) => index !== i),
        });
    }

    handleAdditionDetail = (tag) => {
        this.setState(state => ({ tagsDetail: [...state.tagsDetail, tag] }));
    }


    handleDragDetail = (tag, currPos, newPos) => {
        const tags = [...this.state.tagsDetail];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tagsDetail: newTags });
    }

    
    // for details info
    handleDeleteInfo = (i) => {
        const { tagsInfo } = this.state;
        this.setState({
            tagsInfo: tagsInfo.filter((tag, index) => index !== i),
        });
    }

    handleAdditionInfo = (tag) => {
        this.setState(state => ({ tagsInfo: [...state.tagsInfo, tag] }));
    }

    

    

   
    handleDragInfo = (tag, currPos, newPos) => {
        const tags = [...this.state.tagsInfo];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tagsInfo: newTags });
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    
    //for Brands 
    onChangeBrand = (e) => {
        let selected= e.target.value
    
        this.setState({
            brandId: selected
        })
        

    }

 
    //for picture
    handleSubmit = (e) => {
        e.preventDefault();

        console.log('handle uploading-', this.state.fileName);
    }

    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                fileName: file.name,
                picture: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    displayVariantForm = () => {
        this.props.history.push("/productVariant");
    };

    previousForm = () => {
        this.props.history.push("/productsView");
    };

    formSubmit = () => {
        this.props.productData(this.state);
        this.props.history.push("/productVariant");
        
    }

    //for get product

    getProductData = ({ getProduct }) => {
        if (getProduct) {

            return getProduct.map(item => {
                return (
                    <tr key={item.orderId}>
                        <td><span className="orderNo">{item.orderNo}</span></td>
                        <td>image</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.qty}</td>
                        {(item.visible === "Visible") ? <td style={{ color: 'green' }}> {item.visible} </td> : <td style={{ color: 'red' }}> {item.visible}</td>}
                        <td><i className="fa fa-edit" aria-hidden="true"></i></td>
                    </tr>
                )
            })
        }
    }

    
    // brand dropdown
    brandName=({brandsList})=>{
        if(brandsList){
           return(
            brandsList.map((item) =>{
                   return(
                       <option key={item._id} value={item._id}>
                        {item.name}
                       </option>
                   )
               }
               )
           )

        }
       
    }
    


    render() {


        let { picture } = this.state;
        let $imagePreview = null;

        if (picture) {
            $imagePreview = (<img src={picture} style={{ width: "60px" }} />);
        } else {
            $imagePreview = (<div className="previewText "><label className="ml-3 ">MEDIA</label></div>);
        }


        const placeholder = "addtag"
        const placeholderDetail = "Detail name"
        const placeholderInfo = "Detail info"

        return (
            <div>
                <Dashboard>
                    <div className="mainDiv text-muted">
                        <h3><b>CREATE PRODUCT</b></h3>
                        <div className="subTitle">
                            <h5><b>T-shirt Sportwear Nike</b></h5></div>

                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-sm-4">
                                    <label className="ml-3">Actions<span ><i className="fas fa-chevron-circle-down" aria-hidden="true" style={{ marginLeft: "14px" }}></i></span></label>
                                    <div className="card mainCard border border-0">
                                        <div className="variants">
                                            <h5>Variants<span onClick={this.displayVariantForm}><i className="fa fa-plus" aria-hidden="true" style={{ float: 'right' }}></i></span></h5>
                                            <div>Variant 1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span>
                                                <div className="h5 small"><span style={{ color: '#1ABC9C' }}>Visible</span> <span>- XL SIZE</span></div>
                                                <div className="variants-option">
                                                    <div>Option 1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span></div>
                                                    <div className="h5 small"><span className="text-danger">Hidden</span> <span>- color green</span></div>
                                                    <div>Option 2<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span></div>
                                                    <div className="h5 small"><span style={{ color: '#1ABC9C' }}>Visible</span> <span>- color red</span></div>
                                                </div>
                                            </div>
                                            <div>Variant1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span>
                                                <div className="h5 small"><span className="text-danger">Hidden</span> <span>- L SIZE</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <label><h5>Details</h5></label>
                                    <div className="text-muted">
                                        <form  onSubmit={this.formSubmit}>
                                            <div className="h5 small text-danger">Title</div>

                                            <div className="form-row col-12">
                                                <div className="form-group col-12">
                                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputSportWear" name="name" placeholder="T-shirt Sportwear Nike" onChange={this.onChange} />
                                                </div>
                                            </div>

                                            <div className="form-row col-12">
                                                <div className="form-group col-12 row mx-auto">
                                                    <div className="col-12 mx-0 p-0">
                                                        <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" placeholder="brand" name="_id"  onChange={this.onChangeBrand} placeholder="Origin country" style={{ backgroundColor: '#F2F4F7' }} type="select">
                                                        <option selected="true" disabled="disabled">Select Brands</option>
                                                        {this.brandName(this.props.BrandsReducer)}
                                                    </select>
                                                    </div>
                                                    <div className="col-1 float-right my-auto" style={{ marginLeft: "-40px" }}><i className="fa fa-angle-down"></i></div>
                                                </div>
                                            </div>

                                            <div className="form-row col-12">
                                                <div className="form-group col-12">
                                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress" name="subTitle" placeholder="Subtitle" onChange={this.onChange} />
                                                </div>
                                            </div>

                                            <div className="form-row col-12">
                                                <div className="form-group col-12">
                                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputVendor" name="vendor" placeholder="Vendor" onChange={this.onChange} />
                                                </div>
                                            </div>

                                            <div className="form-row col-12">
                                                <div className="form-group col-12">
                                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputDescription" name="description" placeholder="Description" onChange={this.onChange} />
                                                </div>
                                            </div>


                                            <div className="form-row col-12">
                                                <div className="form-group col-12 row mx-auto">
                                                    <div className="col-12 mx-0 p-0">
                                                        <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" name="originCountry" onChange={this.onChange} placeholder="Origin country" style={{ backgroundColor: '#F2F4F7' }} type="select">
                                                            <option>Origin country</option>
                                                            <option>U.K</option>
                                                            <option>RUSSIA</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-1 float-right my-auto" style={{ marginLeft: "-40px" }}><i className="fa fa-angle-down"></i></div>
                                                </div>
                                            </div>

                                            <div className="form-row col-12">
                                                <div className="form-group col-12">
                                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputTemplate" name="template" placeholder="Template" onChange={this.onChange} />
                                                </div>
                                            </div>
                                           
                                   
                                        </form>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <label><h5>Media Galary</h5></label>
                                    <div className="col-12 p-0">
                                        <table class="table table-light text-muted">
                                            <thead>
                                                <tr className="row mx-auto">
                                                    <th class="col-3 mx-auto">ORDER</th>
                                                    <th class="col-9">MEDIA</th>
                                                </tr>
                                            </thead>
                                            <div className="table-responsive" style={{ height: "100px" }}>
                                                <table className="table table-light">
                                                    <tbody>
                                                    
                                                        <tr className="row mx-auto">
                                                            <td class="col-3"><span className="orderNo">11</span></td>
                                                            <td class="col-9 row px-0">
                                                                <div className="col-6">{$imagePreview}</div>
                                                                <div className="col-3 mt-1"><i className="fa fa-close float-right close-icon" aria-hidden="true"></i></div>
                                                            </td>
                                                        </tr>
                                                        <tr className="row mx-auto">
                                                            <td class="col-3"><span className="orderNo">12</span></td>
                                                            <td class="col-9 row px-0">
                                                                <div className="col-6">{$imagePreview}</div>
                                                                <div className="col-3 mt-1"><i className="fa fa-close float-right close-icon" aria-hidden="true"></i></div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </table>
                                        </div>
                                        <div className="card-footer image-card">
                                            <label htmlFor="file" className="ml-3">
                                                <div><i className="fa fa-picture-o" aria-hidden="true"></i><span className="ml-1">drag image or click to upload</span></div>
                                            </label>
                                            <div className="previewComponent">
                                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                                    <input className="fileInput hidden"
                                                        type="file"
                                                        id="file"
                                                        onChange={(e) => this.handleImageChange(e)} />
                                                    <button className="submitButton hidden"
                                                        type="submit"
                                                        onClick={(e) => this.handleSubmit(e)}>Upload Image</button>
                                                </form>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>


                        <div className="row justify-content-end m-2 ">
                            <div className="col-4 text-muted">
                                <h5>Tags</h5>
                                <div>
                                    <ReactTags tags={this.state.hashtags}
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
                                    <ReactTags tags={this.state.tagsDetail}
                                        handleDelete={this.handleDeleteDetail}
                                        handleAddition={this.handleAdditionDetail}
                                        handleDrag={this.handleDragDetail}
                                        placeholder={placeholderDetail}
                                        className="text-muted"
                                    
                                    />
                                    </div>
                                    <div className="form-group col-6">
                                    <ReactTags tags={this.state.tagsInfo}
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
                        <div className="card float-right">
                        </div>
                    </div>
                    <div className="row justify-content-center text-muted">
                        <div className="col-4 ml-5"><h5>Variants</h5></div>
                    </div>
                    <div className="float-right" style={{ width: '618px' }}>
                        <div className="card table  text-muted" >
                            <table>
                                <thead>
                                    <tr>
                                        <th>ORDER</th>
                                        <th></th>
                                        <th>TITLE</th>
                                        <th>PRICE</th>
                                        <th>QTY</th>
                                        <th>VISIBLE</th>
                                        <th><i className="fa fa-plus" aria-hidden="true"></i></th>
                                    </tr>
                                </thead>
                                <tbody style={{ backgroundColor: "rgb(242,244,247)", opacity: "50%" }}>
                                    {this.getProductData(this.props.CreateProductReducer)}

                                </tbody>
                            </table>
                        </div>
                        <div className="float-right m-5">
                            <button className="button-back mr-3" onClick={this.previousForm}><span className="text-btn-back">BACK</span></button>
                            <button type="submit" className="button-variant" onClick={this.formSubmit}><span className="text-btn" >CREATE PRODUCT</span></button>
                        </div>
                    </div>
                </Dashboard>
            </div>
        );
    }
}

function mapStateToProps(state) {
   
    return {
        CreateProductReducer: state.CreateProductReducer,
        BrandsReducer: state.BrandsReducer
    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createProductDetails,getBrands,productData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);

