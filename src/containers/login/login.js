import React,{Component} from 'react';
import './login.css';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props)
            this.state={
                email:'',
                password:'',
                dummyEmail:'',
                dummyPassword:'',
                message:false,
                errors:{}

            }

        

    }
    componentDidMount(){
        axios.get('  http://localhost:4000/users').then(resp => resp.data)
        .then(abc=>{
           
            this.setState({dummyEmail:abc.email});
            this.setState({dummyPassword:abc.password});
           
        })
        
        

    }

    change=(e)=>{
        e.preventDefault();
        this.setState({errors:''})
        this.setState({message:''})
        this.setState({[e.target.name]:e.target.value})
       
    }


    login=(e)=>{
        e.preventDefault();

        let errors={};
        if(this.state.email==="") errors.email="cant be empty";
        if(this.state.password==="") errors.password="cant be empty";

        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            if(this.state.dummyEmail === this.state.email && this.state.dummyPassword === this.state.password){
                this.setState({message:true})   
            }else{
                this.setState({message:''})
            }

        }
        
       
       
    }
    render(){
        return(
          <div>
            <div className='bg-page'></div>
              <div className='row '>
                  <div className=' gradient col-md-8 'style={{border:'1px solid grey'}}>
                      <img alt="" src="../../../public/images/circle.png" style={{width:'50px', height:'20px'}} />
                      <div className="label">ADMINISTRATOR</div>
                      <div className="sm-label">TheImaginationPlatform</div>
                  </div>

                  <div className='mainForm col-md-4' style={{height: '100vh'}}>
                      <div className='form'>
                     
                          <form onSubmit={this.login}>
                          <span style={{marginLeft:'5px',fontSize:'15px'}}>Sign In Below</span>
                        
                         <div className="entries">
                         
                         <input 
                         type="email" 
                         id="email"
                         placeholder="Enter email"
                         name='email'
                         onChange={this.change}
                         />
                         <div><span style={{color:'red'}}>{this.state.errors.email}</span></div>
                                                 
                        <input
                          type="password"
                           id="password"
                           placeholder="password"
                           name='password'
                           onChange={this.change}
                           
                           />
                            <div><span style={{color:'red'}}>{this.state.errors.password}</span></div>
                         </div>
                         <div className="checkbox">
                        <input 
                          type="checkbox"  
                          id="checkbox" />
                          <span style={{marginLeft:'5px'}}>Remember Me</span>
                         </div>
                         <button className="button btn btn-primary">
                            Login
                         </button>
                         <span>{this.state.message?'login successfully':''}</span>
                          </form>

                      </div>

                  </div>
                  
              </div>
              </div>
          

        )
    }
}

export default Login;