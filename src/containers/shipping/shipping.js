import React, {Component} from 'react';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar'
import '../../commonCss/style.css';

class Shipping extends Component{
    constructor(props){
        super(props);

        this.state={
            checked:''
        }
    }
    
    onCheck=(e)=>{
        var checked=e.target.checked
        this.setState({checked})
    }


    render(){
        return(
        <div>
         <Sidebar/>
          <div style={{marginLeft:'240px'}}>
           <Header/>
            <div style={{margin:'25px', padding:'25px'}}>
               <h3><b>SHIPPING</b></h3>
               <div className="listItem">Destination</div>
               <div className="listItem">
                    <div className="list"><input type="checkbox"></input>Some of billing Address</div>
                    <div className="list"><input type="checkbox"></input>New Single Address</div>
                    <div className="list"><input type="checkbox"></input>New Multiple Addresses <span>(This option allows selection of different shipping addresses or a product basis)</span></div>
               </div>
            </div>
        </div>
      </div>
        )
    }
}

export default Shipping;