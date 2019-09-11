import React, { Component } from 'react'
import './editCustomerOrder.css';
import { addCustomer, getCustomer, getOrderDetail } from '../../actions/editCustomerOrderAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';

class EditCustomerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            search: '',
            host: '',
            orderId: '',
            newCustomerDetail: {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                billingAddress: '',
                password: '',
                confirmPassword: '',
                phone: ''
            },
            tab: {
                tabNo: 1
            }
        }
    }

    onInitialLoad = (host) => {
        this.setState({
            host
        }, () => {
            let orderId = this.props.match.params.orderId;
            this.getOrderDetailsData(orderId);
        })

    }

    componentWillReceiveProps(nextProps) {
        let orderId = nextProps.match.params.orderId;
        if (this.state.orderId != orderId) {
            this.getOrderDetailsData(orderId);
        }
    }

    getOrderDetailsData(orderId) {
        this.setState({
            orderId
        });
        this.props.getOrderDetail(this.state.host, orderId);
    }

    nextStepHandle = () => {
        this.props.history.push("/editproducts");
    }
    prevStatusHandle = () => {
        this.props.history.push('/vieworders');
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
        const { firstName, lastName, email, address, billingAddress, phone, password } = this.state;
        let payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            billingAddress: billingAddress,
            phone: phone,
            password: password
        }
        this.props.addCustomer(this.state.host, payload);
    }

    updateTab = (tabNo) => {
        this.setState(prevState => ({
            tab: {
                ...prevState.tab,
                tabNo
            }
        }));
    }

    existingCustomer = ({ view }) => {
        if (view) {
            return view.customer.map(item => {
                return (

                    item ? <tr>
                        <td>{`${item.firstname} ${item.lastname}`}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.address}</td>
                        <td><button className='buttonupdate'><font color="#1ABC9C">Update</font></button></td>
                    </tr> : ''


                )
            })
        }

    }

    renderTabContent = () => {
        let tabContent = null;
        if (this.state.tab.tabNo == 1) {
            tabContent = (
                <div className="md-form active-purple-2 mb-3 row col-12 toggleCustomer1">
                    <div className="col-1 mt-4" style={{ fontSize: "1.5rem", marginLeft: '-0.8rem' }}><i className="fa fa-search"></i></div>
                    <div className="col-8 mt-4">
                        <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" list="customer" name="search" onChange={this.searchOnChange} style={{ backgroundColor: 'transparent' }} placeholder="Search by name and email" value={this.state.search} />

                        <table className='table table-borderless'>
                            <tbody>

                                {/* {this.existingCustomer(this.props.EditCustomerOrderReducer)} */}

                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else {
            tabContent = (
                <div className="toggleCustomer2">
                    <div className="row mt-3 col-12">
                        <div className="md-form active-purple-2 mb-3 col-sm">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="firstName" placeholder="First name" onChange={this.onChangeData} value={this.state.firstName} />
                        </div>
                        <div className="md-form active-purple-2 mb-3 col-sm ">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="address" placeholder="Address" onChange={this.onChangeData} value={this.state.address} />
                        </div>
                    </div>
                    <div className="row col-12">
                        <div className="md-form active-purple-2 mb-3 col-sm">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="lastName" placeholder="Last name" value={this.state.lastName} onChange={this.onChangeData} />
                        </div>
                        <div className="md-form active-purple-2 mb-3 col-sm">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="billingAddress" placeholder="Billing Address" onChange={this.onChangeData} value={this.state.billingAddress} />
                        </div>

                    </div>
                    <div className="row col-12">
                        <div className="md-form active-purple-2 mb-3 col-sm">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="email" style={{ backgroundColor: 'transparent' }} name="email" placeholder="Email" onChange={this.onChangeData} value={this.state.email} />
                        </div>
                        <div className="md-form active-purple-2 mb-3 col-sm">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="password" style={{ backgroundColor: 'transparent' }} name="password" placeholder="Password" onChange={this.onChangeData} value={this.state.password} />
                        </div>

                    </div>
                    <div className="row col-12">
                        <div className="md-form active-purple-2 mb-3 col-sm">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="phone" placeholder="phone" onChange={this.onChangeData} value={this.state.phone} />
                        </div>
                        <div className="md-form active-purple-2 mb-3 col-sm">
                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="password" style={{ backgroundColor: 'transparent' }} name="confirmPassword" placeholder="Retype Password" onChange={this.onChangeData} value={this.state.confirmPassword} />
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="submit" onClick={this.add} className="btn btn-secondary btnCreate  pl-5 pr-5 rounded-pill ">CREATE</button>
                    </div>
                </div>
            );
        }
        return tabContent;
    }

    renderCustomerDetails = () => {
        let customerDetails = {};
        if (this.props.customerDetails) {
            customerDetails = this.props.customerDetails;
        }
        return (
            <div className="card col-4 mr-4 ">
                <div className="card-body">
                    <div className="row details">
                        <div className="col">
                            First Name
                    </div>
                        <div className="col">
                            {customerDetails.firstname}
                        </div>
                    </div>

                    <div className="row details ">
                        <div className="col">
                            Last Name
                    </div>
                        <div className="col">
                            {customerDetails.lastname}
                        </div>
                    </div>
                    <div className="row details">
                        <div className="col">
                            Email
                    </div>
                        <div className="col">
                            {customerDetails.email}
                        </div>
                    </div>
                    <div className="row details">
                        <div className="col">
                            Phone No
                    </div>
                        <div className="col">
                            {customerDetails.phone}
                        </div>
                    </div>
                    <div className="row details">
                        <div className="col">
                            Address
                    </div>
                        <div className="col">
                            {(customerDetails.addresses && customerDetails.addresses[0]) ?
                                <p>
                                    {customerDetails.addresses[0].address1}
                                     <br />
                                    {customerDetails.addresses[0].address2}
                            </p>:''
                    }
                        </div>
                    </div>
                    <div className="row details">
                        <div className="col">
                            Billing
                    </div>
                        <div className="col">
                            {customerDetails.billing}
                        </div>
                    </div>
                    <div className="row details">
                        <div className="col">
                            Shipping
                    </div>
                        <div className="col">
                            {customerDetails.shipping}
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    render() {
        return (
            <HostResolver hostToGet="inventory" hostResolved={this.onInitialLoad}>
                <div className="editCustomer">
                    <Dashboard>
                        <div className="mt-4 ml-4">
                            <h4>EDIT ORDER</h4>
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
                        <h5>Customer Information</h5>
                        <div className="card-group row col-12 ">
                            {this.renderCustomerDetails()}
                            <div className="card col-8">
                                <div className="card-body row">
                                    <div className="row">
                                        <div className="col" >
                                            <div
                                                className="tab-edit-order"
                                                onClick={() => {
                                                    this.updateTab(1)
                                                }}>
                                                <h5 className={`card-title tabHead ${this.state.tab.tabNo == 1 ? "" : "visible"}`} >EXISTING Customer</h5>
                                                {this.state.tab.tabNo == 1 ? <hr className="underline" /> : null}

                                            </div>

                                        </div>
                                        <div className="col" >
                                            <div
                                                className="tab-edit-order"
                                                onClick={() => {
                                                    this.updateTab(2)
                                                }}>
                                                <h5 className={`card-title tabHead mr-5 ${this.state.tab.tabNo == 2 ? "" : "visible"}`} >NEW Customer</h5>
                                                {this.state.tab.tabNo == 2 ? <hr className="underline" /> : null}
                                            </div>

                                        </div>
                                    </div>
                                    {this.renderTabContent()}
                                </div>


                                <div style={{ height: '20px' }}></div>
                            </div>
                        </div>
                        <div className='text-center mt-4 float-right'>
                            <button type="button" class="btn btn-light stepbutton prevBtn"
                                onClick={this.prevStatusHandle}>PREVIOUS STEP</button>
                            <button type="button" style={{
                                backgroundColor: "#333333",
                                marginLeft: '6px',
                                marginRight: '23px'

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
    let customerDetails = null;
    let reducerState = state.EditCustomerOrderReducer;
    if (reducerState.orderDetails) {
        customerDetails = reducerState.orderDetails.customer;
    }
    return {
        customerDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCustomer, getCustomer, getOrderDetail
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerOrder);