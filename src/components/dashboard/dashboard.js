import React,{Component} from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';

class Dashboard extends Component {
    render() {
        return(
            <div>
                <div><Sidebar/></div>
                <div style={{marginLeft:"240px"}}><Header/></div>
                
                <div className="mt-5 mr-5" style={{marginLeft: "270px"}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Dashboard;