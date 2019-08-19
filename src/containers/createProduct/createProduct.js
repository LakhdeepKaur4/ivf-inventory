import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import { createProductDetails,postProduct } from '../../actions/createProductAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import './createProduct.css';



class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fileName: '',
            picture: '',
            name: '',
            subTitle: '',
            vendor: '',
            description: '',
            originCountry: '',
            template: '',
            tags: [
                { id: "shirt", text: "shirt" }
            ],
            tagsDetail: [
                { id: "lorem ipsum", text: "lorem ipsum" }
            ],
            tagsInfo: [
                { id: "dolor sit amet", text: "dolor sit amet" }
            ],



        }
    }



    handleDelete = (i) => {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleDeleteDetail = (i) => {
        const { tagsDetail } = this.state;
        this.setState({
            tagsDetail: tagsDetail.filter((tag, index) => index !== i),
        });
    }

    handleDeleteInfo = (i) => {
        const { tagsInfo } = this.state;
        this.setState({
            tagsInfo: tagsInfo.filter((tag, index) => index !== i),
        });
    }

    handleAddition = (tag) => {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleAdditionDetail = (tag) => {
        this.setState(state => ({ tagsDetail: [...state.tagsDetail, tag] }));
    }
    handleAdditionInfo = (tag) => {
        this.setState(state => ({ tagsInfo: [...state.tagsInfo, tag] }));
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    handleDragDetail = (tag, currPos, newPos) => {
        const tags = [...this.state.tagsDetail];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tagsDetail: newTags });
    }

    handleDragInfo = (tag, currPos, newPos) => {
        const tags = [...this.state.tagsInfo];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tagsInfo: newTags });
    }



    componentDidMount = () => {
        this.props.createProductDetails();
    }

    onChange = (e) => {
      
        this.setState({ [e.target.name]: e.target.value });
    }

 

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
        
        console.log(this.state, "submit=================")
        this.props.postProduct(this.state);
    }

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


    render() {


        let { picture } = this.state;
        let $imagePreview = null;

        if (picture) {
            $imagePreview = (<img src={picture} style={{ width: "60px" }} />);
        } else {
            $imagePreview = (<div className="previewText "><label className="ml-3 ">image</label></div>);
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
                                <div className="col-sm">
                                    <label className="ml-3">Actions<span ><i className="fas fa-chevron-circle-down" aria-hidden="true" style={{ marginLeft: "14px" }}></i></span></label>
                                    <div className="card mainCard border border-0">
                                        <div className="variants">
                                            <h5>Variants<span onClick={this.displayVariantForm}><i className="fa fa-plus" aria-hidden="true" style={{ float: 'right' }}></i></span></h5>
                                            <div>Variant 1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span>
                                                <div className="h5 small"><span style={{ color: '#1ABC9C' }}>Visible</span> <span>- XL SIZE</span></div>
                                                <div>Option 1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span></div>
                                                <div className="h5 small"><span className="text-danger">Hidden</span> <span>- color green</span></div>
                                                <div>Option 2<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span></div>
                                                <div className="h5 small"><span style={{ color: '#1ABC9C' }}>Visible</span> <span>- color red</span></div>
                                            </div>
                                            <div>Variant1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span>
                                                <div className="h5 small"><span className="text-danger">Hidden</span> <span>- L SIZE</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <label><h5>Details</h5></label>
                                    <div className=" text-dark">
                                        <form onSubmit={this.formSubmit}>
                                            <div className="h5 small text-danger">Title</div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputSportWear" name="name" placeholder="T-shirt Sportwear Nike" onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress" name="subTitle" placeholder="Subtitle" onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputVendor" name="vendor" placeholder="Vendor" onChange={this.onChange} />
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputDescription" name="description" placeholder="Description" onChange={this.onChange} />
                                                </div>
                                                <div className="form-group  mb-3" style={{ width: '225px' }}>
                                                    <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 " placeholder="Origin country" name="originCountry" onChange={this.onChange} style={{ backgroundColor: '#F2F4F7' }} type="select">
                                                        <option>Origin country</option>
                                                        <option>U.K</option>
                                                        <option>RUSSIA</option>
                                                    </select>
                                                    <i className="fa fa-angle-down"></i></div>

                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputTemplate" name="template" placeholder="Template" onChange={this.onChange} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <label><h5>Media Galary</h5></label>


                                    <div className="card table table-responsive border-0 text-muted" style={{ boxSizing: "0" }}>
                                        <table >
                                            <thead style={{ display: 'block' }}>
                                                <tr>
                                                    <th>ORDER</th>
                                                    <th>MEDIA</th>
                                                    <th></th>

                                                </tr>
                                            </thead>

                                            <tbody className="tbody-table" >

                                                <tr>
                                                    <td><span className="orderNo">11</span></td>
                                                    <td>{$imagePreview}</td>
                                                    <td><i className="fa fa-close main-close" aria-hidden="true"></i></td>
                                                </tr>
                                                <tr>
                                                    <td><span className="orderNo">12</span></td>
                                                    <td>{$imagePreview}</td>
                                                    <td><i className="fa fa-close main-close" aria-hidden="true" ></i></td>
                                                </tr>
                                                <tr>
                                                    <td><span className="orderNo">13</span></td>
                                                    <td>{$imagePreview}</td>
                                                    <td><i className="fa fa-close main-close" aria-hidden="true" ></i></td>
                                                </tr>

                                            </tbody>
                                        </table>

                                        <div className="card-footer text-center border border-0 " style={{ backgroundColor: "rgba(0,0,0,0)", marginTop: "-15px", padding: "0px" }}>
                                            <div className="previewComponent mt-4">
                                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                                    <input className="fileInput hidden"
                                                        type="file"
                                                        id="file"
                                                        onChange={(e) => this.handleImageChange(e)} />
                                                    <button className="submitButton hidden"
                                                        type="submit"
                                                        onClick={(e) => this.handleSubmit(e)}>Upload Image</button>
                                                </form>
                                                <label htmlFor="file">
                                                    <div><i className="fa fa-picture-o" aria-hidden="true"></i><span className="ml-1">drag image or click to upload</span></div>
                                                </label>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="row justify-content-end m-2 ">
                            <div className="col-4 text-muted">
                                <h5>Tags</h5>
                                <div>
                                    <ReactTags tags={this.state.tags}
                                        handleDelete={this.handleDelete}
                                        handleAddition={this.handleAddition}
                                        handleDrag={this.handleDrag}
                                        placeholder={placeholder}
                                        inputFieldPosition="inline"
                                        className="text-muted"
                                    />
                                </div>
                            </div>
                            <div className="col-4 text-muted">
                                <h5>Metadata</h5>
                                <div>
                                    <ReactTags tags={this.state.tagsDetail}
                                        handleDelete={this.handleDeleteDetail}
                                        handleAddition={this.handleAdditionDetail}
                                        handleDrag={this.handleDragDetail}
                                        placeholder={placeholderDetail}
                                        className="text-muted"
                                    />
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
    console.log(state)
    return {
        CreateProductReducer: state.CreateProductReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createProductDetails,postProduct }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);

