import React, { Component } from 'react'
import '../../commonCss/style.css';
import Dropzone from 'react-dropzone-uploader';
import $ from 'jquery';
import { postProduct } from '../../actions/addProductAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            shareholders: [{ name: "" }],
            
            home: '',
            title:'',
            permalink:'',
            subtitle:'',
            vendor:'',
            price:'',
            inventorytosale:'',
            inventorystock:'',
            description:'',
            country:'',
            template:'',
            sitemap:'',
            image:'',
            facebook:'',
            twitter:'',
            pinterest:'',
            google:'',
            tag:'',
            detailname:'',
            detailinfo:''
        };
    }
    // specify upload params and url for your files
    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    addTag = (e) => {
        e.preventDefault();
        let count = $("#tag div").length;
        console.log(count);
        if (count % 2 === 0 && count !== 0) {
            $('#tag').append('<div class="col-6 row ml-3 mr-2 mt-2"><input class="form-control col-11" style="width:100%;" type="text" placeholder="Tag"/><button type="button" class="btn col-1"><i class="fa fa-window-close" aria-hidden="true" style="margin : auto;"></i></button></div>');
        } else {
            $('#tag').append('<div class="col-6 row mt-2"><input class="form-control col-11" style="width:100%;" type="text" placeholder="Tag"/><button type="button" class="btn col-1"><i class="fa fa-window-close" aria-hidden="true" style="margin : auto;"></i></button></div>');
        }
    }

    addMetadata = (e) => {
        e.preventDefault();
        $('#metadata').append(`<div class="form-group col-md-5" id="meta">
            <input type="text" class="form-control" placeholder="Detail Name" id="detailName"/>
        </div>
        <div class="form-group col-md-5">
            <input type="text" class="form-control" placeholder="Detail Information" id="detailInformation"/>
        </div>
        <button type="button" class="btn btn-basic col-1"><i class="fa fa-window-close" aria-hidden="true" style="margin : auto;"></i></button>`);
    }

    handleFormSubmit =(e) => {
        e.preventDefault();
        // fs.writeFile('../../../test.json','hello',err => {
        //     if(err){
        //         console.log(err);
        //     }
        // });
        const { home, title, permalink, subtitle, vendor, price, inventorytosale, inventorystock, description, country, template, sitemap, image, facebook, twitter, pinterest, google,tag,detailname, detailinfo}= this.state
        console.log(home, title, permalink, subtitle, vendor, price, inventorytosale, inventorystock, description, country, template, sitemap, image, facebook, twitter, pinterest, google,tag,detailname, detailinfo);
        // this.props.product
        // console.log(this.state)
        this.props.postProduct(home, title, permalink, subtitle, vendor, price, inventorytosale, inventorystock, description, country, template, sitemap, image, facebook, twitter, pinterest, google,tag,detailname, detailinfo)

    }

    onChangeData=(e)=>{
        console.log(e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })

    }

    render() {
        return (
            <div>
                <div className="card bg-light mb-12" style={{ maxWidth: '100%' }}>
                    <div className="card-header">Add Product</div>
                    <div className="card-body">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputHome">Home</label>
                                    <input type="text" className="form-control" id="inputHome" name="home" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputTitle">Title</label>
                                    <input type="text" className="form-control" id="inputTitle" name="title" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPermalink">Permalink</label>
                                    <input type="text" className="form-control" id="inputPermalink" name="permalink" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputSubtitle">Subtitle</label>
                                    <input type="text" className="form-control" id="inputSubtitle" name="subtitle" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputVendor">Vendor</label>
                                    <input type="text" className="form-control" id="inputVendor" name="vendor" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPrice">Price</label>
                                    <input type="text" className="form-control" id="inputPrice" name="price" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputInventorySale">Inventory available to sell</label>
                                    <input type="number" className="form-control" id="inputInventorySale" name="inventorytosale" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputInventoryStock">Inventory in stock</label>4
                                    <input type="number" className="form-control" id="inputInventoryStock" name="inventorystock" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="descriptionTextarea">Description</label>
                                    <textarea className="form-control" rows="6" id="descriptionTextarea" name="description" onChange={this.onChangeData}></textarea>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputForCountry">Country</label>
                                    <select className="form-control" id="countDropDown" name="country" onChange={this.onChangeData}>
                                        <option>India</option>
                                        <option>Romania</option>
                                        <option>Russia</option>
                                        <option>Bucharest</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputTemplate">Template</label>
                                    <input type="text" className="form-control" id="inputTemplate" name="template" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch1" name="sitemap" onChange={this.onChangeData}/>
                                    <label className="custom-control-label" htmlFor="customSwitch1">Include in site map</label>
                                </div>
                                <div className="col-md-12">
                                    <Dropzone
                                        getUploadParams={this.UNSAFE_componentWillMountgetUploadParams}
                                        onChangeStatus={this.handleChangeStatus}
                                        onSubmit={this.handleSubmit}
                                        accept="image/*"
                                        rows="6"
                                        name="image"
                                       
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <hr />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="social">Social</label>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="facebook">
                                        Facebook Message
                                    </label>
                                    <input type="text" className="form-control" id="facebookInput" name="facebook" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="twitter">
                                        Twitter Message
                                    </label>
                                    <input type="text" className="form-control" id="twitterInput" name="twitter" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="pinterest">
                                        Pinterest Message
                                    </label>
                                    <input type="text" className="form-control" id="pinterestInput" name="pinterest" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="google">
                                        Google+ Message
                                    </label>
                                    <input type="text" className="form-control" id="googleInput" name="google" onChange={this.onChangeData}/>
                                </div>
                                <div className="form-group col-md-12">
                                    <hr />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="tags">Tags</label>
                                </div>
                                <div className="form-group col-md-6">
                                    <button type="btn btn-primary" className="  btn btn-secondary" id="b1" style={{ float: 'right' }} onClick={this.addTag}>
                                        <i className="fa fa-plus" aria-hidden="true"></i> Add
                            </button>
                                </div>
                                <div className="col row form-group row" id="tag">
                                    <input className="form-control col-6 mr-1 mt-2" type="text" placeholder="Tag" id="inp1" name="tag" />
                                </div>
                                <div className="form-group col-md-12">
                                    <hr />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="metadata">Metadata</label>
                                </div>
                                <div className="col-md-12 row" id="metadata">
                                    <div className="form-group col-md-5" id="meta">
                                        <input type="text" className="form-control" placeholder="Detail Name" id="detailName" name="detailname" onChange={this.onChangeData}/>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <input type="text" className="form-control" placeholder="Detail Information" id="detailInformation" name="detailinfo" onChange={this.onChangeData}/>
                                    </div>
                                    <div className="form-group col-md-1">
                                        <button type="button" className="btn btn-secondary" style={{ borderRadius: '20px' }} onClick={this.addMetadata}>
                                            <i className="fa fa-plus" aria-hidden="true"></i> </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }} onSubmit={this.submitAdd}>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state,"hjasdgjhsghjs")
    return {
        AddProductReducer: state.AddProductReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postProduct}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(AddProduct));
