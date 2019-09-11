import React, { Component } from 'react'
import './orderStatus.css';

class StatusBar extends Component {
    renderStatusBar = () => {
        return this.props.headingData.map((item, index) => {
            return (
               
                <React.Fragment>
                    <div className={`containerDiv ${this.props.currentStatusIndex >= index?'':'containerDiv-faded'}`}>
                        <label className="filedText">
                            {item}
                        </label>
                    </div>
                    {index == this.props.headingData.length - 1 ?
                        '' :
                        <div 
                        className={`line-cont-orderstatus ${this.props.currentStatusIndex > index?'':'line-cont-orderstatus-faded'}`}
                       >
                            <div className='line-order'>
                            </div>
                        </div>
                    }
                </React.Fragment>
            )
        }
        )
    }

    render() {
        return (

            <div className="container-orderStatus">
                {this.renderStatusBar()}
            </div>

        )
    }
}

export default StatusBar;