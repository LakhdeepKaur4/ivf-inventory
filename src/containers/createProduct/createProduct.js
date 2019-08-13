import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import './createProduct.css';

class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: ''
        }
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
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        // $imagePreview = (<img src={imagePreviewUrl} style={{width:"60px"}}/>);
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{ width: "60px" }} />);
        } else {
            $imagePreview = (<div className="previewText "><label className="ml-3 ">image</label></div>);
        }

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
                                            <h5>Variants<span><i className="fa fa-plus" aria-hidden="true" style={{ float: 'right' }}></i></span></h5>
                                            <div>Variant1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span>
                                                <div className="h5 small"><span style={{ color: '#1ABC9C' }}>Visible</span> <span>- XL SIZE</span></div>
                                                <div>Option 1<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span></div>
                                                <div className="h5 small"><span className="text-danger">Hidden</span> <span>- L SIZE</span></div>
                                                <div>Option 2<span><i className="fa fa-edit float-right" aria-hidden="true" style={{ color: '#A3A6B4' }}></i></span></div>
                                                <div className="h5 small"><span style={{ color: '#1ABC9C' }}>Visible</span> <span>- L SIZE</span></div>
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
                                        <form>
                                            <div className="h5 small text-danger">Title</div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputSportWear" placeholder="T-shirt Sportwear Nike" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress" placeholder="Subtitle" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputVendor" placeholder="Vendor" />
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputDescription" placeholder="Description" />
                                                </div>
                                                <div className="form-group  mb-3" style={{ width: '225px' }}>
                                                    <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 " placeholder="Origin country" style={{ backgroundColor: '#F2F4F7' }} type="select">
                                                        <option>Origin country</option>
                                                        <option>INDIA</option>
                                                        <option>RUSSIA</option>
                                                    </select>
                                                    <i className="fa fa-angle-down"></i></div>

                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputTemplate" placeholder="Template" />
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
                                                    <td><i class="fa fa-close main-close" aria-hidden="true" ></i></td>
                                                </tr>
                                                <tr>
                                                    <td><span className="orderNo">12</span></td>
                                                    <td>{$imagePreview}</td>
                                                    <td><i class="fa fa-close main-close" aria-hidden="true" ></i></td>
                                                </tr>
                                                <tr>
                                                    <td><span className="orderNo">13</span></td>
                                                    <td>{$imagePreview}</td>
                                                    <td><i class="fa fa-close main-close" aria-hidden="true" ></i></td>
                                                </tr>

                                            </tbody>
                                        </table>

                                        <div class="card-footer text-center border border-0 " style={{ backgroundColor: "rgba(0,0,0,0)", marginTop: "-15px", padding: "0px" }}>
                                            <div className="previewComponent">

                                                <input className="fileInput hidden"
                                                    type="file"
                                                    id="file"
                                                    onChange={(e) => this.handleImageChange(e)} ></input>

                                                <label for="file">
                                                    <div><i class="fa fa-picture-o" aria-hidden="true"></i><span className="ml-1">drag image or click to upload</span></div>
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
                                <button type="button" className="btn btn-light text-muted" style={{ border: '1px solid' }}>Add Tags<i className="fa fa-plus ml-3"></i></button>
                            </div>
                            <div className="col-4 text-muted">
                                <h5>Metadata</h5>
                                <div className="mb-3 text-muted"><button type="button" className="btn btn-secondary" style={{ border: '1px solid' }}>iorem ipsum</button><button type="button" className="btn btn-secondary" style={{ border: '1px solid' }}>dolor sit amet</button><i className="fa fa-close ml-3"></i></div>
                                <div ><button type="button" className="btn btn-light text-muted" style={{ border: '1px solid' }}>Detail name</button><button type="button" className="btn btn-light text-muted" style={{ border: '1px solid' }}>Detail info</button><i className="fa fa-plus ml-3"></i></div>
                            </div>
                        </div>
                        <div className="card float-right">
                        </div>
                    </div>
                    <div class="row justify-content-center text-muted">
                        <div class="col-4 ml-5"><h5>Variants</h5></div>
                    </div>
                    <div className="float-right" style={{ width: '618px' }}>
                        <div class="card table  text-muted" >
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
                                    <td><span className="orderNo">11</span></td>
                                    <td>image</td>
                                    <td>Green T-shirt with badass cartoon design</td>
                                    <td>$ 29.99</td>
                                    <td>24</td>
                                    <td>Visible</td>
                                    <td><i className="fa fa-edit" aria-hidden="true"></i></td>
                                </tbody>
                            </table>
                        </div>
                        <div className="float-right">
                            <button className="button-back mr-3"><span className="text-btn-back">BACK</span></button>
                            <button className="button-variant"><span className="text-btn">CREATE PRODUCT</span></button>
                        </div>
                    </div>
                </Dashboard>
            </div>
        );
    }
}

export default CreateProduct;

