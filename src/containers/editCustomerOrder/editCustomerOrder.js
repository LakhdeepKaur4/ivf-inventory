import React, { Component } from 'react'
import './editCustomerOrder.css';
import { addCustomer, getCustomer } from '../../actions/editCustomerOrderAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';
import $ from 'jquery';

class EditCustomerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            search: '',
            name: '',
            surname: '',
            email: '',
            address: '',
            billingAddress:'',
            phone: '',
            host: ''
        }
    }
    nextStepHandle = () => {
        this.props.history.push("/editproducts");
    }



    searchOnChange = (e) => {
        this.props.getCustomer(this.state.host, e.target.value);
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            return x.name.toLowerCase().includes(search.toLowerCase()) ||
                !search;
        }
    }


    onChangeData = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    add = (e) => {
        e.preventDefault();
        const { name, surname, email, address, billingAddress, phone } = this.state;
        this.props.addCustomer(this.state.host, name, surname, email, address, billingAddress, phone);
    }

    viewCustomer = ({ view }) => {
        if (view) {
            return view.customer ? view.customer.map((item) => <option key={item.customerId}>{item.name}</option>) : ''
        }
    }

    setHost = async host => {
        await this.setState({ host });
    }

    toggle = (e, id) => {
        if (id === 1) {
            $('.toggleCustomer1').removeClass('hide');
            $('.toggleCustomer2').addClass('hide');
        } else if (id === 2) {
            $('.toggleCustomer2').removeClass('hide');
            $('.toggleCustomer1').addClass('hide');
        }
    }

    render() {
        return (
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host)
            }}>
                <div className="editCustomer">
                    <Dashboard>
                        <div className="mt-4 ml-4">
                            <h6>EDIT AN ORDER</h6>
                        </div>
                        <div className="md-stepper-horizontal" >
                            <div className="md-step active">
                                <div className="md-step-circle border border-danger bg-transparent text-danger"><span>1</span></div>
                                <div className="md-step-title" style={{ color: "#F74A4A" }}>Customer info</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                            <div className="md-step ">
                                <div className="md-step-circle border border-secondary bg-transparent" style={{ color: "#4D4F5C" }}><span>2</span></div>
                                <div className="md-step-title" style={{ color: "#4D4F5C" }}>Products</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                            <div className="md-step">
                                <div className="md-step-circle border border-secondary bg-transparent" style={{ color: "#4D4F5C" }}><span>3</span></div>
                                <div className="md-step-title" style={{ color: "#4D4F5C" }}>Finalize</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                        </div>
                        <div className="card-group row col-12 ">
                            <div className="card col-3 mr-4">
                                <div className="card-body">

                                </div>
                            </div>
                            <div className="card col-9">
                                <div className="card-body row">
                                    <div className="row">
                                        <div className="col" onClick={e => { this.toggle(e, 1) }}>
                                            <h5 className="card-title " >EXISTING Customer</h5>
                                            <hr className="underline" />
                                        </div>
                                        <div className="col" onClick={e => { this.toggle(e, 2) }}>
                                            <h5 className="card-title mr-5" >NEW Customer</h5>
                                            <hr className="underline" />
                                        </div>
                                    </div>

                                    <div className="md-form active-purple-2 mb-3 row col-12 toggleCustomer1">
                                        <div className="col-1 mt-4" style={{ fontSize: "1.5rem" , marginLeft:'-0.8rem'}}><i className="fa fa-search"></i></div>
                                        <div className="col-8 mt-4">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" list="customer" name="search" onChange={this.searchOnChange} style={{ backgroundColor: 'transparent' }} placeholder="Search by name and email" />
                                            <datalist id="customer">
                                                <option />
                                                {this.viewCustomer(this.props.EditCustomerOrderReducer)}
                                            </datalist>
                                        </div>
                                    </div>

                                    <div className="toggleCustomer2 hide">
                                        <div className="row mt-5 col-12">
                                            <div className="md-form active-purple-2 mb-3 col-sm">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="name" placeholder="First name" onChange={this.onChangeData} />
                                            </div>
                                            <div className="md-form active-purple-2 mb-3 col-sm ">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="address" placeholder="Address" onChange={this.onChangeData} />
                                            </div>
                                        </div>
                                        <div className="row col-12">
                                            <div className="md-form active-purple-2 mb-3 col-sm">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="surname" placeholder="Last name" onChange={this.onChangeData} />
                                            </div>
                                            <div className="md-form active-purple-2 mb-3 col-sm">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="billingAddress" placeholder="Billing Address" onChange={this.onChangeData} />
                                            </div>

                                        </div>
                                        <div className="row col-12">
                                            <div className="md-form active-purple-2 mb-3 col-sm">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="email" style={{ backgroundColor: 'transparent' }} name="email" placeholder="Email" onChange={this.onChangeData} />
                                            </div>
                                            <div className="md-form active-purple-2 mb-3 col-sm">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="password" style={{ backgroundColor: 'transparent' }} name="password" placeholder="Password" onChange={this.onChangeData} />
                                            </div>

                                        </div>
                                        <div className="row col-12">
                                            <div className="md-form active-purple-2 mb-3 col-sm">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="phone" placeholder="phone" onChange={this.onChangeData} />
                                            </div>
                                            <div className="md-form active-purple-2 mb-3 col-sm">
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="password" style={{ backgroundColor: 'transparent' }} name="retypePassword" placeholder="Retype Password" onChange={this.onChangeData} />
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                    <button type="submit" onClick={this.add} className="btn btn-secondary btnCreate  pl-5 pr-5 rounded-pill ">CREATE</button>
                                </div>
                                    </div>
                                </div>

                            
                                <div style={{ height: '20px' }}></div>
                            </div>
                        </div>
                        <div className='text-center mt-4'>
                            <button type="button" style={{
                                backgroundColor: "#333333",
                                marginLeft: '607px'
                            }} className="btn btn-secondary  pl-5 pr-5  rounded-pill"
                                onClick={this.nextStepHandle}>NEXT STEP</button>
                        </div>
                        <div style={{ height: "52px" }}></div>
                    </Dashboard>
                </div>
            </HostResolver>
        )
    }
}

function mapStateToProps(state) {
    return {
        EditCustomerOrderReducer: state.EditCustomerOrderReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCustomer, getCustomer
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerOrder);