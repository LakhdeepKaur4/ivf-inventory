import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {createProductDetails, postProduct} from '../../actions/createProductAction';
import Dashboard from '../../components/dashboard/dashboard';
import '../createProduct/createProduct.css';

class ProductVariantOption extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fileName: '',
            picture: '',
            option1:'',
            optionTitle:'',
            originCountry:'',
            width:'',
            length:'',
            height:'',
            weight:''
        }
    }

    componentDidMount=()=>{
        this.props.createProductDetails();
    }

    onChange=(e)=>{
       
        this.setState({[e.target.name]: e.target.value});
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


    displayVariantForm = () => {
        this.props.history.push("/productVariant");
      };
      
    displayOptionForm = () => {
        this.props.history.push("/productVariant");
    };
    
    formSubmit = () => {
        console.log(this.state, "submit=================")
        this.props.postProduct(this.state);
    }


    getProductData=({getProduct})=>{
        if(getProduct){
   
           return getProduct.map(item=>{
                return(
                                  <tr key={item.orderId}>
                                       <td><span className="orderNo">{item.orderNo}</span></td>
                                       <td>image</td>
                                       <td>{item.title}</td>
                                       <td>{item.price}</td>
                                       <td>{item.qty}</td>
                                       {(item.visible==="Visible") ? <td style={{color:'green'}}> {item.visible} </td> : <td style ={{color:'red'}}> {item.visible}</td> }
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

        return (
            <div>
                <Dashboard>
                    <div className="mainDiv text-muted">
                        <h3><b>CREATE PRODUCT / VARIANT 1</b></h3>
                        <div className="subTitle">
                            <h5><b>T-shirt Sportwear Nike / Variant 1 / Option 1</b></h5></div>

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
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputSportWear" placeholder="Option 1" />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress" placeholder="Option Title" />
                                                </div>
                                            </div>
                                            <div className="form-row">

                                                <div className="form-group  mb-3" style={{ width: '225px' }}>
                                                    <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 " placeholder="Origin country" style={{ backgroundColor: '#F2F4F7' }} type="select">
                                                        <option>Origin country</option>
                                                        <option>U.K</option>
                                                        <option>RUSSIA</option>
                                                    </select>
                                                    <i className="fa fa-angle-down"></i></div>
                                                <div className="form-row col-12">
                                                    <div className="form-group col-6">
                                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputTemplate" placeholder="Width" style={{ marginLeft: '-4px' }} />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputTemplate" placeholder="Length" />
                                                    </div>
                                                </div>
                                                <div className="form-row col-12">
                                                    <div className="form-group col-6">
                                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputTemplate" placeholder="Height" style={{ marginLeft: '-4px' }} />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputTemplate" placeholder="Weight" />
                                                    </div>
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
                                                    <td><i className="fa fa-close main-close" aria-hidden="true" ></i></td>
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
                                            <div className="previewComponent">

                                                <input className="fileInput hidden"
                                                    type="file"
                                                    id="file"
                                                    onChange={(e) => this.handleImageChange(e)} ></input>

                                                <label htmlFor="file">
                                                    <div><i className="fa fa-picture-o" aria-hidden="true"></i><span className="ml-1">drag image or click to upload</span></div>
                                                </label>
                                            </div>

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
                            <button className="button-back mr-3" onClick={this.displayOptionForm}><span className="text-btn-back">BACK</span></button>
                            <button type="submit" className="button-variant" onClick={this.formSubmit}><span className="text-btn">CREATE OPTION</span></button>
                        </div>
                    </div>

                </Dashboard>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state)
  return{
     CreateProductReducer: state.CreateProductReducer      
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({createProductDetails,postProduct}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductVariantOption);

