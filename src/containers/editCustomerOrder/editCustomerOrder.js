import React, { Component } from 'react'
import './editCustomerOrder.css';
import {getCity,addCustomer, getCustomer} from '../../actions/editCustomerOrderAction';
import {connect} from 'react-redux';
import  {bindActionCreators} from 'redux';
import Dashboard from '../../components/dashboard/dashboard';



class EditCustomerOrder extends Component {

    constructor(props){
        super(props);
        this.state={   
            search:'', 
            name:'',
            surname:'',
            email:'',
            address:'',
            city:[],
            region:'',
            postalCode:'',
            phone:'',
            rememberMe:false
        }
    }

    componentDidMount(){
     this.props.getCity();
     this.props.getCustomer();
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
     }

    searchFilter = (search) => {
        return function (x) { console.log(x)
            return x.name.toLowerCase().includes(search.toLowerCase())  ||
            !search;
        }
    }

    getCity=({city})=>{
        if(city){
            return city.map((item)=><option style={{color:"#4D4F5C"}} key={item.id}>{item}</option>
            )
        }

    }

    onChangeData=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })

    }

    add=(e)=>{
        e.preventDefault();
        const {name,surname,email,address,city,region,postalCode,phone,rememberMe}=this.state;
        this.props.addCustomer(name,surname,email,address,city,region,postalCode,phone,rememberMe);
    }

    viewCustomer=({view})=>{
        console.log(view);
        if(view){
           

            return view.filter(this.searchFilter(this.state.search)).map((item)=>{ 
             return(
              <tr>
            
              <td>{item.name ?item.name:''}</td>
              
              
            
              </tr>
             )
              
            })
        }
  }

    render(){
        return(
          
            <div>
                  <Dashboard>
                 <div className="mt-4 ml-4">
                    <h6>EDIT AN ORDER</h6>
                </div>

                <div className="md-stepper-horizontal" >
                    <div className="md-step active done">
                        <div className="md-step-circle" style={{backgroundColor:"#F74A4A"}} ><span>1</span></div>
                        <div className="md-step-title">Step 1</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step active done">
                        <div className="md-step-circle" style={{backgroundColor:"#F74A4A"}}><span>2</span></div>
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
                    <div className="md-step acitve done">
                        <div className="md-step-circle"><span>4</span></div>
                        <div className="md-step-title">Step 4</div>
                        <div className="md-step-bar-left"></div>    
                        <div className="md-step-bar-right"></div>
                    </div>
                </div>
                    

                        <div className="card-group">
                            <div className="card editCard1Margin" >

                                <div className="card-body" >
                                <h5 className="card-title" >EXISTING Customer</h5>
                                <hr className="underline"/>
                                <div className="md-form active-purple-2 mb-3 row">
                                <div className="col-1 m-auto" style={{fontSize:"1.5rem"}}><i className="fa fa-search"></i></div>
                                <div className="col-11">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} value={this.state.search}
                                        onChange={this.searchOnChange} /></div>
                                </div>
                                <div >
                                    {this.viewCustomer(this.props.EditCustomerOrderReducer)}    
                                    </div>

                                    <div style={{height:"54px"}}></div>  
                                                  
                                    <hr className="policy"/>
                                    <span className="">Team of use.Privacy policy</span></div>                         
                            </div>
                          
                            <div className="card editCard2Margin">
                            
                                <div className="card-body">
                                <h5 className="card-title" >NEW Customer</h5>
                                <hr className="underline"/>

                                <div className="row">
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} name="name"  placeholder="name" onChange={this.onChangeData}/>
                                </div>
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <input  className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} name="surname"  placeholder="surname" onChange={this.onChangeData} />
                                </div>
                                </div>

                                <div className="row">
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <input  className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="email" style={{backgroundColor:'transparent'}} name="email" placeholder="email" onChange={this.onChangeData}/>
                                </div>
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <input  className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} name="address" placeholder="address" onChange={this.onChangeData}/>
                                </div>
                                </div>
                                
                                <div className="row">
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <select className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" name="city" style={{backgroundColor:'transparent'}} type="select" onChange={this.onChangeData}>
                                <option></option>
                                {this.getCity(this.props.EditCustomerOrderReducer)}
                                </select>
                                <i className="fa fa-angle-down"></i>
                                </div>
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <input  className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} name="region" placeholder="region" onChange={this.onChangeData} />
                                </div>
                                </div>

                                <div className="row">
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <input  className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} name="postalCode" placeholder="postal code" onChange={this.onChangeData} />
                                </div>
                                <div className="md-form active-purple-2 mb-3 col-sm">
                                <input  className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{backgroundColor:'transparent'}} name="phone" placeholder="phone" onChange={this.onChangeData}/>
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
                                <button type="button"  style={{backgroundColor:"#333333", marginLeft: '607px'}} className="btn btn-secondary btnCreate pl-5 pr-5  rounded-pill ">NEXT STEP</button>
                                </div>
                        </Dashboard>         
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
        getCity,addCustomer,getCustomer
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCustomerOrder);