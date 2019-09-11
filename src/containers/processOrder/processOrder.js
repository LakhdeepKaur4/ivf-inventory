import React, { Component } from 'react'
import '../../commonCss/style.css';
import './processOrder.css';
import Dashboard from '../../components/dashboard/dashboard';
import StatusBar from '../../components/orderStatus/orderStatus';
import { connect } from 'react-redux';

class ProcessOrder extends Component {

    textVariants = {
        'New':{
            btn:'APPROVE'
        },
        'Approved':{
            btn: 'CAPTURE PAYMENT'
        }
    };

    state = {
        headingData: ['New', 'Approved', 'Paid', 'Picked', 'Completed'],
        currentStatus: 'New',
        currentStatusIndex: 0
    }

    moveToNextStatus = () => {
        if (this.state.currentStatusIndex + 1 < this.state.headingData.length) {
            this.setState((prevState) => ({
                currentStatus: prevState.headingData[prevState.currentStatusIndex + 1],
                currentStatusIndex: prevState.currentStatusIndex + 1
            }));
        }
    }

    renderStatusButton = () => {
        if(this.state.currentStatusIndex == (this.state.headingData.length - 1)){
            return null;
        }

        return (
            <div className="childProcessOrder">
                <button className="bottomButtom" type="button"
                    onClick={this.moveToNextStatus} >
                    <label className="bottomBtnText">
                        {this.textVariants[this.state.currentStatus].btn}
                    </label>
                </button>
            </div>

        )
    }

    render() {
        return (
            <div>
                <Dashboard>

                    <div className="mainHeading">
                        PROCESS ORDER
                    </div>

                    <div style={{ marginTop: '25px', marginLeft: '30px' }}>
                        <StatusBar
                            currentStatusIndex={this.state.currentStatusIndex}
                            headingData={this.state.headingData}
                            currentStatus={this.state.currentStatus} />
                    </div>
                    <div className="headingContentHeading">
                        Summary
                    </div>
                    <div className="parentProcessOrder">
                        <div className="row">
                            <div className="col-5 underSummarySection">
                                <div className="row">
                                    <div className="summaryContentHeading col-6">
                                        <label>DATE</label>
                                    </div>
                                    <div className="summaryContentData col-6">
                                        <label>23.07.2019</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="summaryContentHeading col-6">
                                        <label>ORDER ID</label>
                                    </div>
                                    <div className="summaryContentData col-6">
                                        <label>#CFZ8493ar</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="summaryContentHeading col-6">
                                        <label>CUSTOMER</label>
                                    </div>
                                    <div className="summaryContentData col-6">
                                        <label>Gerald of Rivia</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="summaryContentHeading col-6">
                                        <label>STATUS</label>
                                    </div>
                                    <div className="summaryContentData col-6">
                                        <label style={{ color: '#FFCA83' }}>Processing</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="summaryContentHeading col-6">
                                        <label>ST. TOTAL</label>
                                    </div>
                                    <div className="summaryContentData col-6">
                                        <label>$ 6,883</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="summaryContentHeading col-6">
                                        <label>SHIPPING</label>
                                    </div>
                                    <div className="summaryContentData col-6">
                                        <label style={{ color: '#FFCA83' }}>PACKED</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="summaryContentHeading col-6">
                                        <label>ORDER</label>
                                    </div>
                                    <div className="summaryContentData col-6">
                                        <label>T-shirt XL Black Red Olive, Sports wear pants, jacket XXL winter edition Black, sweatshirt XL dark red, fitness gloves</label>
                                    </div>
                                </div>

                            </div>

                            <div className="col-6 invoiceSection">
                                <div>
                                    <i className="fa fa-file-archive-o shippingFastTruck" aria-hidden="true"></i>
                                    <label className="invoiceHeadingSec">Invoice</label>
                                </div>
                                <hr />
                                <div>
                                    <i className="fas fa-shipping-fast shippingFastTruck"></i>
                                    <label className="shippingTextData">Shipping</label>
                                </div>

                                <div className="addressSection row">
                                    <label className="col-7">
                                        <address>
                                            Gerald of Rivia
                                            Strada Domneasca, Nr. 64 , 800117
                                            Galati
                                            Romania
                                            Tel : +40 7653 33 44 55
                                    </address>
                                    </label>
                                </div>

                                <div className="courierTrackingContent">
                                    Carrier Tracking
                                <div className="row">
                                        <div className="col-6">
                                            <input placeholder="Tracking" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" list="products" name="search col-6" style={{ backgroundColor: 'transparent' }} />
                                        </div>
                                        <div className="col-5">
                                            <button type="submit" className="saveButtonData">
                                                <label style={{ background: 'transparent' }}>SAVE</label>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="notifyMessage">
                                    Notify the customer that their items will be shipping soon.
                                </div>
                            </div>

                        </div>

                        {this.renderStatusButton()}
                    </div>
                    <div className="backToOrdersButton">
                        <label className="backToOrdersButtonText">back to orders</label>
                    </div>
                </Dashboard>
            </div>
        )
    }
}



export default ProcessOrder;
