import React, { Component } from 'react'
import './editCustomerOrder.css';
import { addCustomer, getCustomer } from '../../actions/editCustomerOrderAction';
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
            name: '',
            surname: '',
            email: '',
            address: '',
            city: '',
            region: '',
            postalCode: '',
            phone: '',
            rememberMe: false,
            host: ''
        }
    }
    nextStepHandle = () => {
        this.props.history.push("/editproducts");
    }



    searchOnChange = (e) => {
        this.props.getCustomer(this.state.host,e.target.value);
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
        const { name, surname, email, address, city, region, postalCode, phone } = this.state;
        this.props.addCustomer(this.state.host,name, surname, email, address, city, region, postalCode, phone);
        console.log(name, surname, email, address, city, region, postalCode, phone);
    }

    viewCustomer = ({ view }) => {
        if (view) {
            console.log(view)
            return view.customer ? view.customer.map((item) => <option key={item.customerId}>{item.name}</option>) : ''
        }
    }

    setHost = async host => {
        await this.setState({ host });
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
                        <div className="card-group">
                            <div className="card editCard1Margin">
                                <div className="card-body" >
                                    <h5 className="card-title" >EXISTING Customer</h5>
                                    <hr className="underline" />
                                    <div className="md-form active-purple-2 mb-3 row">
                                        <div className="col-1 m-auto" style={{ fontSize: "1.5rem" }}><i className="fa fa-search"></i></div>
                                        <div className="col-11">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" list="customer" name="search" onChange={this.searchOnChange} style={{ backgroundColor: 'transparent' }} placeholder="Search by name and email" />
                                            <datalist id="customer">
                                                <option />
                                                {this.viewCustomer(this.props.EditCustomerOrderReducer)}
                                            </datalist>
                                        </div>
                                    </div>
                                    <div style={{ height: "54px" }}></div>
                                    <hr className="policy" />
                                    <span className="">Team of use.Privacy policy</span></div>
                            </div>
                            <div className="card editCard2Margin">
                                <div className="card-body">
                                    <h5 className="card-title" >NEW Customer</h5>
                                    <hr className="underline" />
                                    <div className="row">
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="name" placeholder="name" onChange={this.onChangeData} />
                                        </div>
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="surname" placeholder="surname" onChange={this.onChangeData} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="email" style={{ backgroundColor: 'transparent' }} name="email" placeholder="email" onChange={this.onChangeData} />
                                        </div>
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="address" placeholder="address" onChange={this.onChangeData} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="city" placeholder="city" onChange={this.onChangeData} />
                                        </div>
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="region" placeholder="region" onChange={this.onChangeData} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="postalCode" placeholder="postal code" onChange={this.onChangeData} />
                                        </div>
                                        <div className="md-form active-purple-2 mb-3 col-sm">
                                            <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} name="phone" placeholder="phone" onChange={this.onChangeData} />
                                        </div>
                                    </div>
                                    <div className="form-check check" style={{ marginTop: '39.19px' }}>
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{ borderRadius: '2px' }} name="rememberMe" onChange={this.onChangeData} />
                                        <label className='check-box' >Remember me</label>
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" onClick={this.add} className="btn btn-secondary btnCreate pl-5 pr-5 rounded-pill ">CREATE</button>
                                    </div>
                                    <hr />
                                    <span>Team of use.Privacy policy</span>
                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-4'>
                            <button type="button" style={{
                                backgroundColor: "#333333",
                                marginLeft: '607px'
                            }} className="btn btn-secondary btnCreate pl-5 pr-5  rounded-pill"
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