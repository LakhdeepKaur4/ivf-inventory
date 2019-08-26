import React, { Component } from 'react'

import './products.css';
import Dashboard from '../../components/dashboard/dashboard';
import { getProductsItem } from '../../actions/productItemAction';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import FileStructure from '../../components/fileStructure/fileStructure';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search:'',
        }
    }

    componentDidMount(){
        this.props.getProductsItem();
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    productsItem=({productItem}) =>{

        if(productItem) {
           return productItem.map((item)=> {
               return (
                <tr key={item.id}>
                    <td><img src={item.products} className="img-fluid" alt="Sheep" /></td>
                    <td>{item.name}</td>
                    <td>{item.shipped}</td>
                    <td>{item.quantity}</td>
                    <td>{item.itemPrice} </td>
                    <td>{item.total} </td>
                </tr>
                )
           })
        }
    }

    viewProducts=({productItem})=>{
        if(productItem){
            return productItem.map((item)=><option key={item.id}>{item.name}</option>)
        }
    }

    prevStatusHandle = () => {
        this.props.history.push('/editanorder');
    }

    nextStepHandle = () => {
        this.props.history.push('/finalizeorder');
    }


    render() {
        let productsItem = <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>PRODUCTS</th>
                        <th>NAME</th>
                        <th>SHIPPED</th>
                        <th>QTY.</th>
                        <th>ITEM PRICE</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {this.productsItem(this.props.ProductItemReducer)}
                </tbody>
            </table>
        </div>
        return (
            <div>
                <Dashboard>
                <div className="mt-4 ml-4">
                    <h4>Products</h4>
                </div>

                <div className="md-stepper-horizontal orange">
                    <div className="md-step active done">
                        <div className="md-step-circle"><span>1</span></div>
                        <div className="md-step-title">Customer info</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step">
                        <div className="md-step-circle"><span>2</span></div>
                        <div className="md-step-title">Products</div>
                        <div className="md-step-bar-left"></div>
                      
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step">
                        <div className="md-step-circle"><span>3</span></div>
                        <div className="md-step-title">Finalize</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                </div>

                <div class="card-group m-5">
                    <div class="card">
                        <div class="card-body mainProductDiv">
                            <label>ADD Products</label>
                            <hr className="prLink"/>
                            <div className="md-form active-purple-2 mb-3">
                                <div>
                                   <span style={{ paddingTop: '1px' }}><span className="form-group has-search">
                                        <span className="fa fa-search form-control-feedback"></span>
                                            <input list="products" type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" placeholder="Search" />
                                            <datalist id="products">
                                                
                                                {this.viewProducts(this.props.ProductItemReducer)}
                                            </datalist>
                                            </span>
                                        </span>
                                </div>
                            </div>
                                <div class="subDivBottom">
                                    <p>Team of use.Privacy policy</p>
                                </div> 
                        </div>
                    </div>

                    <div class="card">  
                        <div class="card-body mainProductDiv">
                            <h5>BROWSE Categories </h5>
                            <hr className="prLine" />
                            <FileStructure />
                            <div class="subDivBottom">
                                    <p>Team of use.Privacy policy</p>
                            </div> 
                        </div>
                    </div>
                </div>

                <div className="row float-right" style={{ marginRight:"50px" }}>
                    <button type="button" class="btn btn-light stepbutton prevBtn" onClick={this.prevStatusHandle}>PREVIOUS STEP</button>
                    <button type="button" class="btn btn-dark stepbutton nxtBtn" onClick={this.nextStepHandle}>NEXT STEP</button>
                </div>

                <div class="clearfix"></div>

                <div className="bg-light text-dark col m-3">
                    <div className="row">
                        {productsItem}
                    </div>
                </div> 

                </Dashboard>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        ProductItemReducer: state.ProductItemReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( {getProductsItem}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);