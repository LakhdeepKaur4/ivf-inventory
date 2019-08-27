import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProductDetails, productVariant, updateVariant,productOption } from '../../actions/createProductAction';
import Dashboard from '../../components/dashboard/dashboard';
import '../createProduct/createProduct.css';
import HostResolver from '../../components/resolveHost/resolveHost';

class ProductVariantOption extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileName: '',
            picture: '',
            title: '',
            optionTitle: '',
            inventoryStock: '',
            price: '',
            originCountry: '',
            width: '',
            length: '',
            height: '',
            weight: '',
            host:''
        }
    }

    
    //for variants
    renderVariants({ productVariant }) {
        let variantsHtml = null;
        if (productVariant) {
            variantsHtml= productVariant.map((item=>{
                     return(
                    <div>{item.title}<span><i className="fa fa-edit float-right" aria-hidden="true" onClick={this.displayEditVariant.bind(this,item.title)} style={{ color: '#A3A6B4' }}></i></span>
                    <div className="h5 small"><span style={{ color: '#1ABC9C' }}>Visible</span> <span>- XL SIZE</span></div>
                    <div className="variants-option">
                        <div>
                            <div>Option 1<span><i className="fa fa-edit float-right" aria-hidden="true" onClick={this.displayEditOptionForm} style={{ color: '#A3A6B4' }}></i></span></div>
                            <div className="h5 small"><span className="text-danger">Hidden</span> <span>- color</span></div>
                        </div>
                    </div>
                </div>
                     )
            }))  
        }
        let wrapper = (<div className="variants">
            <h5>Variants<span onClick={this.displayVariantForm}><i className="fa fa-plus" aria-hidden="true" style={{ float: 'right' }}></i></span></h5>
            {variantsHtml}
        </div>);
        return wrapper;

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
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

    displayEditVariant = (title) => {
        this.props.history.push(`/createProduct/editVariant/${title}`);
    };

    displayVariantForm = () => {
        this.props.history.push("/createProduct/createVariant");
    };

    displayOptionForm = () => {
        this.props.history.push("/createProduct/variant/:title/createOption");
    };

    // displayEditOptionForm = () => {
    //     this.props.history.push(`/createProduct/variant/:title/editOption/title`);
    // };


    formSubmit = () => {
        let optionId = this.props.match.params.id;
        let title = this.props.match.params.title;

        let index = this.props.CreateProductReducer.productVariant.findIndex(variant=>variant.title == title);  
        let variants = [...this.props.CreateProductReducer.productVariant];
        let variant = variants[index];
        if(optionId){
            // variant.options[]
            // options[index] = this.state;
            
        }
        else{
            if(variant.options){
                variant.options.push(this.state);
            }
            else{
                variant.options = [this.state];
            }
        }
        this.props.updateVariant(variants);
        this.props.history.push("/createProduct");

    }


    getProductData = ({ postOption }) => {
        if (postOption) {
            let jsxData = (
                <tr>
                    <td><span className="orderNo">1</span></td>
                    <td><img src={postOption.picture} className="img-fluid" alt="image" /></td>
                    <td>{postOption.title}</td>
                    <td>{postOption.price}</td>
                    <td>{postOption.inventoryStock}</td>
                    {(postOption.visible === "Visible") ? <td style={{ color: 'green' }}> {postOption.visible} </td> : <td style={{ color: 'red' }}> {postOption.visible}</td>}
                    <td><i className="fa fa-edit" aria-hidden="true" onClick={this.displayEditOptionForm}></i></td>
                </tr>
            )
            return jsxData;
        }
    }

    setHost = async (host) => {
        await this.setState({ host: host });
        this.props.createProductDetails(this.state.host);
    }

    render() {
        let { picture } = this.state;
        let $imagePreview = null;
        if (picture) {
            $imagePreview = (<img src={picture} style={{ width: "60px" }} />);
        } else {
            $imagePreview = (<div className="previewText "><label className="ml-3 ">MEDIA</label></div>);
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
                            <h5><b>T-shirt Sportwear Nike / Variant 1 / Option 1</b></h5></div>
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-sm-4">
                                    <label className="ml-3">Actions<span ><i className="fas fa-chevron-circle-down" aria-hidden="true" style={{ marginLeft: "14px" }}></i></span></label>
                                    <div className="card mainCard border border-0">
                                        <div>{this.renderVariants(this.props.CreateProductReducer)}</div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <label><h5>Details</h5></label>
                                    <div className=" text-dark">
                                        <form onSubmit={this.formSubmit}>
                                            <div className="h5 small text-danger">Title</div>
                                            <div className="form-row col-12 ">
                                                <div className="form-group col-12 createProduct">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" name="title" onChange={this.onChange} id="title" placeholder="Option 1" />
                                                </div>
                                            </div>
                                            <div className="form-row col-12">
                                                <div className="form-group col-12 createProduct">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="optionTitle" name="optionTitle" onChange={this.onChange} placeholder="Option Title" />
                                                </div>
                                            </div>
                                            <div className="form-row col-12">
                                                <div className="form-group col-12 createProduct">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inventoryStock" name="inventoryStock" onChange={this.onChange} placeholder="Inventory Stock" />
                                                </div>
                                            </div>
                                            <div className="form-row col-12">
                                                <div className="form-group col-12 createProduct">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="price" name="price" onChange={this.onChange} placeholder="Price" />
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
                                            <div className="form-row col-12 createProduct">
                                                <div className="form-group col-6">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="width" name="width" onChange={this.onChange} placeholder="Width" />
                                                </div>
                                                <div className="form-group col-6">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="length" name="length" onChange={this.onChange} placeholder="Length" />
                                                </div>
                                            </div>
                                            <div className="form-row col-12 createProduct">
                                                <div className="form-group col-6">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="height" name="height" onChange={this.onChange} placeholder="Height" />
                                                </div>
                                                <div className="form-group col-6">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="weight" name="weight" onChange={this.onChange} placeholder="Weight" />
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
                    </div>
                    <div className="row justify-content-center text-muted">
                        <div className="col-4 ml-5"><h5>Options</h5></div>
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
                                        <th onClick={this.displayOptionForm}><i className="fa fa-plus" aria-hidden="true"></i></th>
                                    </tr>
                                </thead>
                                <tbody style={{ backgroundColor: "rgb(242,244,247)", opacity: "50%" }}>
                                    {this.getProductData(this.props.CreateProductReducer)}
                                </tbody>
                            </table>
                        </div>
                        <div className="float-right m-5">
                            <button className="button-back mr-3" onClick={this.displayVariantForm}><span className="text-btn-back">BACK</span></button>
                            <button type="submit" className="button-variant" onClick={this.formSubmit}><span className="text-btn">CREATE OPTION</span></button>
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
    return bindActionCreators({ createProductDetails, productVariant, productOption,updateVariant }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariantOption);

