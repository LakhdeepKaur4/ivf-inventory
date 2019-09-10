import React, { Component } from 'react'
import './orderStatus.css';

class StatusBar extends Component {

    headingData = ['New', 'Approved', 'Paid', 'Picked', 'Completed'];
    currentStatus= 'New';
    

    renderStatusBar = () => {
        let colorChangeFlag = this.headingData.indexOf(this.currentStatus);
        return this.headingData.map((item, index) => {
            return (
               
                <React.Fragment>
                    <div className={`containerDiv ${colorChangeFlag >= index?'':'containerDiv-faded'}`}>
                        <label className="filedText">
                            {item}
                        </label>
                    </div>
                    {index == this.headingData.length - 1 ?
                        '' :
                        <div 
                        className={`line-cont-orderstatus ${colorChangeFlag > index?'':'line-cont-orderstatus-faded'}`}
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