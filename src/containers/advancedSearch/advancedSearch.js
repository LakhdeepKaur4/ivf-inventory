import React,{Component} from 'react';
import './advancedSearch.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';

class AdvancedSearch extends Component{
        constructor(){
            super();
            this.state={
                startDate: new Date(),
                host: ''
            };
        }

        handleChange=(date)=> {
            this.setState({
              startDate: date
            });
          }
          

        setHost = async host => {
            await this.setState({ host });
        }

        render(){
            return(
                <HostResolver hostToGet="inventory" hostResolved={host => {
                    this.setHost(host)
                }}>
                    <Dashboard>
                   <div className="container containerAdvancedSearch"> 
                   <h3 className='p-4' style={{color:"#555555"}}>ADVANCED SEARCH</h3> 
                    <span className="ml-4" style={{color:"salmon"}}>Search Key words (tags)</span>
                     <div className="row w-100">  
                            <div className="col-5">
                                
                                <div className="col-12" >
                                <div className="md-form active-purple-2 mb-3">  
                                 
                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" 
                                type="text" style={{backgroundColor:'transparent'}} placeholder="pants,jogging,nike,air,blue,XL"/>
                                </div>

                                <div className="md-form active-purple-2 mb-3">
                                <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 " style={{backgroundColor:'#F2F4F7'}} type="select">
                                    <option style={{backgroundColor:"red"}}>Order status</option>
                                </select>
                                <i className="fa fa-angle-down"></i></div>

                                <div className="md-form active-purple-2 mb-3">
                                <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" style={{backgroundColor:'#F2F4F7'}} type="select">
                                <option>Payment method</option>
                                </select>
                                <i className="fa fa-angle-down"></i></div>
                         

                                <div className="md-form active-purple-2 mb-3">
                                <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" style={{backgroundColor:'#F2F4F7'}} type="select">
                                <option>Channel</option>
                                </select>
                                <i className="fa fa-angle-down"></i></div>
                            

                                <div className="md-form active-purple-2 mb-3">
                                <select className="selectAdvancedSearch form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" style={{backgroundColor:'#F2F4F7'}} type="select">
                                <option>Fullfillment source</option>
                                </select>
                                <i className="fa fa-angle-down"></i></div>

                                <div className="md-form active-purple-2 mb-3">
                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} placeholder="Coupon Code" />
                                </div>

                                <div className="md-form active-purple-2 mb-3 ">
                                <select className=" selectAdvancedSearch fa fa-angle-down form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="select" style={{backgroundColor:'#F2F4F7'}} placeholder="Select"> 
                                <option>Shop</option>
                                </select>
                                <i className="fa fa-angle-down"></i></div>
                                </div>
                                
                            </div>
                            <div className="col-5" style={{color:"#43425D"}}>
                                    <div className="col-12">
                                    <div className="md-form active-purple-2 mb-3 row">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-12" type="text" style={{backgroundColor:'transparent'}} placeholder="Coupon Code"/>
                                    </div>

                                    <div className="md-form active-purple-2 mb-3 row">
                                        <div className="col-6">Order ID</div>
                                        <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-2"  type="text" style={{backgroundColor:'transparent'}} />
                                        <div className="col-2">to</div>
                                        <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-2"  type="text" style={{backgroundColor:'transparent'}} />
                                    </div>
                                    
                                    
                                    <div className="md-form active-purple-2 mb-3 row">
                                        <div className="col-6">Order Total</div>
                                        <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-2"  type="text" style={{backgroundColor:'transparent'}} />
                                        <div className="col-2">to</div>
                                        <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-2"  type="text" style={{backgroundColor:'transparent'}} />
                                    </div>


                                    <div className="md-form active-purple-2 mb-3 row">
                                        <div className="mt-auto mb-auto col-2 mr-4">Date</div>
                                        <DatePicker selected={this.state.startDate}
                                         onChange={this.handleChange} className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-6"/>
                                         <div className="col-1 mt-auto mb-auto" style={{marginLeft:"-100px"}}><i className="far fa-calendar-alt"></i></div>
                                        
                                    </div>

                                    <div className="md-form active-purple-2 mb-3" style={{color:"#43425D"}}>
                                    <div >
                                    <label><input className="mr-3" name="radio1" type="radio"/>Order Placed</label>
                                    </div>

                                    <div>
                                    <label><input className="mr-3" name="radio1" type="radio"/>Delivery Event Date</label>
                                    </div>

                                    <div >
                                    <label><input className="mr-3" name="radio1" type="radio"/>Order Delivery</label>
                                    </div>
                                    </div>


                                    <div className="md-form active-purple-2 mb-3 row">
                                    <div className="mt-auto mb-auto col-5" style={{marginRight:"-50px"}}>Event Date</div>
                                        <DatePicker selected={this.state.startDate}
                                         onChange={this.handleChange} className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-6"/>
                                         <div className="col-1 mt-auto mb-auto" style={{marginLeft:"-100px"}}><i className="far fa-calendar-alt"></i></div>
                                       
                                    </div>
                                    </div>   
                                    
                            </div>
                    </div>
                                    <div className='text-center mt-4'>
                                        <button type="button"  className="btn pl-5 pr-5 rounded-pill btnNextAdvanced">NEXT STEP</button>
                                    </div>
                                    <div style={{height:"52px"}}></div>
                </div>
                </Dashboard>
                </HostResolver>
            )
        }



}

export default AdvancedSearch;