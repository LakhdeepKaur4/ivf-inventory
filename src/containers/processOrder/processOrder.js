import React, { Component } from "react";
import "../../commonCss/style.css";
import "./processOrder.css";
import Dashboard from "../../components/dashboard/dashboard";
import StatusBar from "../../components/orderStatus/orderStatus";
import { getProcessOrderStatus } from "../../actions/processOrderAction";
import { connect } from 'react-redux';
import HostResolver from "../../components/resolveHost/resolveHost";
import axios from "axios";
import { toasterMessage } from "../../utils";
import { bindActionCreators } from "redux";

class ProcessOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headingData: ["New", "Approved", "Paid", "Picked", "Completed"],
      currentStatus: "New",
      currentStatusIndex: 0,
      host: "",
      _id: props.match.params.id,
    };
  }

  textVariants = {
    New: {
      btn: "APPROVE"
    },
    Approved: {
      btn: "CAPTURE PAYMENT"
    },
    Paid: {
      btn: "PACK ITEMS"
    },
    Picked: {
      btn: "SHIP ITEMS"
    }
  };

  setHost = host => {
    this.setState({ host });
    if (this.state._id) {
      this.props.getProcessOrderStatus(host, this.state._id)
        .then(res => {
          let arr = [];
          arr.push(res.data);
          this.setState({
            orderSpecificData: arr
          });
        })
        .catch(err => {
          toasterMessage("err", err.message);
        });
    }
  };

  orderDetails = ({ orderDataStatus }) => {
    const orderStr = []
    if (orderDataStatus) {

      return orderDataStatus.map(item => {
        item.cart.cartProducts.map(data => {
          orderStr.push(data.productTitle);
        });
        let productStr = orderStr.join(", ");

        return (
          <div
            className="col-5 underSummarySection"
            key={item.orderId}
          >
            <div className="row">
              <div className="summaryContentHeading col-6">
                <label>DATE</label>
              </div>
              <div className="summaryContentData col-6">
                <label>{item.createdAt.split("T")[0]}</label>
              </div>
            </div>
            <div className="row">
              <div className="summaryContentHeading col-6">
                <label>ORDER ID</label>
              </div>
              <div className="summaryContentData col-6">
                <label>{item.orderId}</label>
              </div>
            </div>
            <div className="row">
              <div className="summaryContentHeading col-6">
                <label>CUSTOMER</label>
              </div>
              <div className="summaryContentData col-6">
                <label>{`${item.customer.firstname} ${item.customer.lastname}`}</label>
              </div>
            </div>
            <div className="row">
              <div className="summaryContentHeading col-6">
                <label>STATUS</label>
              </div>
              <div className="summaryContentData col-6">
                <label style={{ color: "#1ABC9C" }}>
                  {item.status}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="summaryContentHeading col-6">
                <label>ST. TOTAL</label>
              </div>
              <div className="summaryContentData col-6">
                <label>{item.amount}</label>
              </div>
            </div>
            <div className="row">
              <div className="summaryContentHeading col-6">
                <label>ORDER</label>
              </div>
              <div className="summaryContentData col-6">
                <label>{productStr}s</label>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  handleBackButton = () => {
    this.props.history.push('/vieworders');
  }

  moveToNextStatus = () => {
    if (this.state.currentStatusIndex + 1 < this.state.headingData.length) {
      this.setState(prevState => ({
        currentStatus: prevState.headingData[prevState.currentStatusIndex + 1],
        currentStatusIndex: prevState.currentStatusIndex + 1
      }));
    }
  };

  renderStatusButton = () => {
    if (this.currentStatusIndex == this.state.headingData.length - 1) {
      return null;
    }

    return (
      <div className="childProcessOrder">
        <button
          className="bottomButtom"
          type="button"
          onClick={this.moveToNextStatus}
        >
          <label className="bottomBtnText">
            {this.textVariants[this.state.currentStatus].btn}
          </label>
        </button>
      </div>
    );
  };

  render() {
    const orderStr = [];
    return (
      <HostResolver
        hostToGet="inventory"
        hostResolved={host => {
          this.setHost(host);
        }}
      >
        <div>
          <Dashboard>
            <div className="mainHeading">PROCESS ORDER</div>

            <div style={{ marginTop: "25px", marginLeft: "30px" }}>
              <StatusBar
                currentStatusIndex={this.state.currentStatusIndex}
                headingData={this.state.headingData}
                currentStatus={this.state.currentStatus}
              />
            </div>
            <div className="headingContentHeading">Summary</div>
            <div className="parentProcessOrder">
              <div className="row">
                {this.orderDetails((this.props.processOrderReducer))}
                <div className="col-6 invoiceSection">
                  <div>
                    <i
                      className="fa fa-file-archive-o shippingFastTruck"
                      aria-hidden="true"
                    ></i>
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
                        Gerald of Rivia Strada Domneasca, Nr. 64 , 800117 Galati
                        Romania Tel : +40 7653 33 44 55
                      </address>
                    </label>
                  </div>

                  <div className="courierTrackingContent">
                    Carrier Tracking
                    <div className="row">
                      <div className="col-6">
                        <input
                          placeholder="Tracking"
                          className="form-control border border-top-0 
                          border-right-0 border-left-0 border-dark rounded-0"
                          list="products"
                          name="search col-6"
                          style={{ backgroundColor: "transparent" }}
                        />
                      </div>
                      <div className="col-5">
                        <button type="submit" className="saveButtonData">
                          <label
                            className="saveBtnText"
                            style={{ background: "transparent" }}
                          >
                            SAVE
                          </label>
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
              <button className="backToOrdersButtonText" onClick={this.handleBackButton}>back to orders</button>
            </div>
          </Dashboard>
        </div>
      </HostResolver>
    );
  }
}

function mapStateToProps(state) {
  return {
    processOrderReducer:state.processOrderReducer
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProcessOrderStatus
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessOrder);
