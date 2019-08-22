import React, { Component } from 'react'
import '../../commonCss/style.css';
import './editOrder.css';
import { getEditOrder } from '../../actions/editAnOrderAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';

class EditOrder extends Component {

    constructor(props){
        super(props);
        this.state={
            search: '',
            filterName:"customer",
            activePage: '1',
            limit:'5',
            totalItemsCount:''
        }
    }

    componentDidMount() {
        this.props.getEditOrder();
    }

    prevStepHandle = () => {
        this.props.history.push('/editproducts');
    }

    viewEditOrder = ({ editOrder }) => {
        if (editOrder) {
            return editOrder.map(item => {
                return (
                    <tr key={item.id}>
                        <td>{item.image}</td>
                        <td>{item.unallocatedPrdt}</td>
                        <td>{item.qty}</td>
                        <td>{item.items}</td>
                    </tr>
                )
            })
        }
    }

    render() {
        let viewOrderData = <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>PRODUCTS</th>
                        <th>UNLOCATED PRODUCTS</th>
                        <th>QTY</th>
                        <th>ITEMS</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {this.viewEditOrder(this.props.EditOrderReducer)}
                </tbody>
            </table>
        </div>

        return (
            <div className="editOrderMainDiv">
                <Dashboard>
                <div className="mt-4 ml-4">
                    <div className="finalizeHeading">FINALIZE</div>
                </div>

                <div className="md-stepper-horizontal orange">
                    <div className="md-step active done">
                        <div className="md-step-circle"><span>1</span></div>
                        <div className="md-step-title titleText">Customer info</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step active done">
                        <div className="md-step-circle"><span>2</span></div>
                        <div className="md-step-title titleText">Products</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step">
                        <div className="md-step-circle"><span>3</span></div>
                        <div className="md-step-title titleText">Finalize</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                </div>


                <div className="row m-auto">
                    <div className="col-7">
                        <div className="billingDiv p-4 mt-1">
                            <h5>Billing to</h5>
                            <form >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="">Name</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputEmail4" placeholder="name" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="">City</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputPassword4" placeholder="city" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="">Company</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress" placeholder="company" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress2">State</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress2" placeholder="state" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">Phone</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputCity" placeholder="phone" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Country</label>
                                        <select id="inputState" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0">
                                            <option selected>Choose...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputZip">Address</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputZip" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputZip">Zipcode</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputZip" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="billingDiv p-4 mt-4 mb-1">
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">Name</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputEmail4" placeholder="Email" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">City</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputPassword4" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress">Company</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress" placeholder="1234 Main St" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress2">State</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputCity">Phone</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Country</label>
                                        <select id="inputState" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0">
                                            <option selected>Choose...</option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputState">Address</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputCity" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputZip">Postcode</label>
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="inputZip" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-5 mt-1">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card orderChanged">
                                    <div className="card-body">
                                        <h5 className="card-title">Order changed by</h5>
                                        <img src="../" alt="Smiley face" height="42" width="42" />
                                        <p className="paypaInc">PAYPAL INC</p>
                                        <p className="googleDesc" style={{ display: "inline-block" }}>Gmail invoice?</p> <input type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col-sm-12">
                                <div className="card billingDiv">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-7 commonTextStyle">
                                                <label>SUBTOTAL</label>
                                            </div>
                                            <div className="col-md-4 commonTextStyle">
                                                <p>584.75</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-7 commonTextStyle">
                                                <label>SHIPPING</label>
                                            </div>
                                            <div className="col-md-4 commonTextStyle">
                                                <p>584.75</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-7 commonTextStyle">
                                                <label>GRAND TOTAL</label>
                                            </div>
                                            <div className="col-md-4">
                                                <p>584.75</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-7 commonTextStyle">
                                                <label>DISCOUNT</label>
                                            </div>
                                            <div className="col-md-4">
                                                <p>584.75</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label>APPLY COUPON</label>
                                            <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" />
                                        </div>
                                        <button className="m-3 applyButton">APPLY COUPON CODE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttonGroup">
                    <button className="prevBtn" onClick={this.prevStepHandle}>Previous Step</button>
                    <button className="nxtBtn">Finalize</button>
                </div>

                <Pagination activePage={this.state.activePage}
                             itemsCountPerPage={this.state.limit}
                             totalItemsCount={this.state.totalItemsCount}
                             onChange={this.handlePageChange}
                             itemClass='page-item'
                             linkClasss='page-link'/>
                <div className="bg-light text-dark col-7 m-3">
                    <div className="row">
                        {viewOrderData}
                    </div>
                </div>
                </Dashboard>
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        EditOrderReducer: state.EditOrderReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getEditOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
