import React from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { themes } from '../../actions/themes';
import './themes.css';
import axios from 'axios';
import $ from 'jquery';

class Themes extends React.Component{

    constructor(props){
        super(props);
        
        this.state={
            dummyHeading:'',
            dummyData:'',
            dropDown:'',
            toggle:false
        }


    }


    componentDidMount(){
        axios.get('http://localhost:4001/themes').then(res=> res.data)
        .then(data=>
            this.setState({dummyHeading:data.heading,dummyData:data.dummyData}),
            );
       this.props.themes();
    }

    print({themeOrder}){
        if(themeOrder){
            return themeOrder.dropDown.map(item=>
                <option key={item}>{item}</option>
                )
        }
        

    }

    add=(e)=>{
        e.preventDefault();
        $(e.currentTarget).toggleClass('buttonActiveThemes buttonOffThemes')      
    }

    render(){
        return(
            <div>
                <div className="tagsThemes">
                <h4>Themes</h4>
                <h5>Current theme</h5>
                </div>
                <div className="parentThemes">
                <div className="child1Themes">
                
                
                </div>
                <div className="child2Themes">
                    <div className="topChild2Themes">
                    <div><h4>{this.state.dummyHeading}</h4></div>
                    <div>{this.state.dummyData}</div>
                    <div className="buttonTopThemes">
                    <button  onClick={this.add} className="buttonActiveThemes" >save</button> 
                    <button  onClick={this.add} className="buttonOffThemes" >Detail</button> 
                    <select className="dropDownThemes">
                    <option>More</option>
                    { this.print(this.props.ThemeReducer)}
                    </select>
                    </div>
                   
                    </div>
                    <div className="bottomChild2Themes">

                    <div><h4>{this.state.dummyHeading}</h4></div>
                    <div>{this.state.dummyData}</div>
                    <div className="buttonBottomThemes">
                    <button  onClick={this.add} className="buttonActiveThemes" >save</button> 
                    <button  onClick={this.add} className="buttonOffThemes" >Detail</button> 
                    <select className="dropDownThemes">
                    <option >More</option>
                    
                    { this.print(this.props.ThemeReducer)}
                    </select>
                    </div>
                    
                    </div>
                    
                
                </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
   
   
    return{
        ThemeReducer : state.ThemeReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({themes}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Themes);