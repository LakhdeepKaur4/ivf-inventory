import React, {Component} from 'react';
import '../../commonCss/style.css'


class Header extends Component{

    render(){
        return(

            <div className="card-header" id="headerList" style={{backgroundColor:'white', height:'70px'}}>
            <label style={{marginTop:'10px'}}><i className="fa fa-home" aria-hidden="true"  ></i>Home</label>
            <span style={{position: 'absolute', left: '51%'}}>
            <span >Store Name</span>,
            <span>Location</span>
            <span><i className="fa fa-angle-down" aria-hidden="true" ></i></span>
            </span>
           <span style={{float:'right'}}>
            <span style={{marginRight: '12px'}}>
            <span style={{ marginRight: '25px'}}><i className="fa fa-bell" aria-hidden="true"></i></span>
            <span>FullName</span>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
            </span>
            
            <span><i className="fa fa-user-circle" aria-hidden="true"></i></span>
           </span>
            
           
           </div> 
            
            
        )
    }

}

export default Header;

