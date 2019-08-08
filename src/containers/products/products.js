import React, { Component } from 'react'

import './products.css';
import Dashboard from '../../components/dashboard/dashboard';

class Products extends Component {

    render() {
        return (
            <div>
                <Dashboard>
                <div className="mt-4 ml-4">
                    <h4>FINALIZE</h4>
                </div>

                <div className="md-stepper-horizontal orange">
                    <div className="md-step active done">
                        <div className="md-step-circle"><span>1</span></div>
                        <div className="md-step-title">Step 1</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step done">
                        <div className="md-step-circle"><span>2</span></div>
                        <div className="md-step-title">Step 2</div>
                        <div className="md-step-bar-left"></div>
                      
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step done">
                        <div className="md-step-circle"><span>3</span></div>
                        <div className="md-step-title">Step 3</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                </div>

                <div class="card-group">
                    <div class="card">

                        <div class="card-body">
                            <h5 class="card-title">ADD Products</h5>
                            <hr className="prLine"/>
                            <div className="md-form active-purple-2 mb-3">
                                {/* <i class="fas fa-search"></i> */}
                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" name="search" placeholder="Search.."></input>
                                {/* <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} /> */}
                            </div>
                            <hr />
                            <span style={{ marginTop: '44px' }}>Team of use.Privacy policy</span>
                        </div>
                    </div>

                    <div class="card">

                        <div class="card-body">
                            <h5 class="card-title" >NEW Customer</h5>
                            <hr className="underline" />
                            <div className="md-form active-purple-2 mb-3">
                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} placeholder="email" />
                            </div>
                            <div className="md-form active-purple-2 mb-3">
                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} placeholder="password" />
                            </div>
                            <div className="md-form active-purple-2 mb-3">
                                <select className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" style={{ backgroundColor: 'transparent' }} type="select">
                                </select>
                            </div>
                            <div className="form-check check" style={{ marginTop: '39.19px' }}>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" style={{ borderRadius: '2px' }} />
                                <label className='check-box' >Remember me</label>
                            </div>
                            <div className='text-center'>
                                <button type="submit" className="btn btn-secondary btnCreate pl-5 pr-5 rounded-pill ">CREATE</button>
                            </div>
                            <hr />
                            <span>Team of use.Privacy policy</span>
                        </div>
                    </div>
                </div>
                </Dashboard>
            </div>
        )
    }

}

export default Products;