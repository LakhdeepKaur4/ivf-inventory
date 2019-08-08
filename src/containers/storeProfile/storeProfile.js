import React from 'react';
import {connect} from 'react-redux';
import  {bindActionCreators} from 'redux';
import {getCountry,getCurrency} from '../../actions/storeProfile';
// import axios from 'axios';
import './storeProfile.css';
import $ from 'jquery';

class storeProfile extends React.Component{

        constructor(props){
            super(props);
            this.state={

            }

            
        }

        componentDidMount(){
            this.props.getCountry();
            this.props.getCurrency();

        }

    add=(e)=>{
        e.preventDefault();
        console.log(e.currentTarget);
        $(e.currentTarget).toggleClass('buttonActiveStoreProfile buttonOffStoreProfile')
    //    this.setState({toggle:!this.state.toggle})
       
    }
    getCountry=({getCountry})=>{
        if(getCountry){
            console.log('ewhdhd',getCountry)
            return getCountry.map((item)=><option key={item.id}>{item}</option>)
        }

    }

    getCurrency=({getCurrency})=>{
        if(getCurrency){
            
            return getCurrency.map((item)=><option key={item.id}>{item}</option>)
        }
        
    }
    getTableCurrency=({getCurrency})=>{
        if(getCurrency){    
            console.log('sdedhdvgdevdedevdnedgvedgevdhg',getCurrency);
            return getCurrency.map((item)=>{
                return(
            <tr key={item.id}>
                <td><input type="checkbox"/></td>
                <td>{item}</td>
            </tr>
                )}
            )
        }

    }

    render(){
        return(
            <div>
                <div className="headingsStoreProfile ">
                    <h4>Store Profile</h4>
                    <h5 style={{paddingTop:'15px'}}>Contact Info</h5>
                </div>
                <div className="parentStoreStoreProfile row">
                    
                    <div className="child1StoreProfile col-6">
                        <span style={{color:'red',fontSize:'15px'}}>Store Info</span>
                        <input type="text" placeholder="Enter Info" className=" inputStoreProfile form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"/>
                        <input type="text" placeholder="Address" className=" inputStoreProfile form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"/>
                        <select className=" selectStoreProfile form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0">
                            <option>SELECT</option>
                            {this.getCountry(this.props.StoreProfileReducer)}
                        </select>
                    </div>  
                    <div className="child2StoreProfile col-5 ">
                       
                           <span style={{padding:'5px'}}>Address is </span>
                          
                           <input type="checkbox" style={{marginLeft:'20px'}}/><span className="spanStoreProfile">home</span>
                           <input type="checkbox" style={{marginLeft:'20px'}}/><span className="spanStoreProfile">Office</span>
                           <input type="checkbox" style={{marginLeft:'20px'}}/><span className="spanStoreProfile">Rent</span>
                        
                        <input type="email" placeholder="email" className="inputStoreProfile form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"/>
                        <input type="number" placeholder="phone" className="inputStoreProfile form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"/>
                    </div>
                   
                </div>
                <div className="h3StoreProfile"><h3>Currencies</h3></div>
                <div>
                   <div style={{marginLeft:'15px'}}>
                    Actions<span><i className="fa fa-angle-down" aria-hidden="true"></i></span>
                    <span style={{marginLeft:'20px'}}><i className="fa fa-plus" aria-hidden="true"></i></span>Add
                    </div> 
                   <div className='card cardStoreProfile'>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox"/></th>
                                    <th>Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getTableCurrency(this.props.StoreProfileReducer)}
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div style={{marginLeft:'15px'}}><h5>Add Currency</h5></div>
                    <div className='col-6'>
                    <select className=" selectStoreProfile dropStoreProfile form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0">
                        <option>SELECT</option>
                        {this.getCurrency(this.props.StoreProfileReducer)}
                        </select> 
                    </div>
                    <div className="buttonGroupStoreProfile">
                    <button  onClick={this.add} className="buttonActiveStoreProfile" >save</button> 
                    <button  onClick={this.add} className="buttonOffStoreProfile" >Detail</button> 
                    </div>

                </div>
                
             
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        EditCustomerOrderReducer:state.EditCustomerOrderReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCountry,
        getCurrency
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(storeProfile);