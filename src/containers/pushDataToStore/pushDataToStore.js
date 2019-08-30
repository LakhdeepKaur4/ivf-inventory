import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProducts, getStores } from '../../actions/pushDataToStore';
import './pushDataToStore.css';
import $ from 'jquery';
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';
import axios from 'axios';

class PushDataToStore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            productId: [],
            storeId: [],
            host:[]
        }
    }
    setHost = async host => {
        let arr = this.state.host;
        arr.push(host);
        await this.setState({host:arr});
        window.onpopstate = () => {
            this.flag = true;
        }
        var urlAr = location.href.split('/');
        var storeId = urlAr[urlAr.length - 1];
        var productId = urlAr[urlAr.length - 2];;
        this.setState({ productId: productId.split(",") });
        this.setState({ storeId: storeId.split(",") });
        localStorage.setItem('product', productId.split(","));
        localStorage.setItem('store', storeId.split(","));
        console.log(this.state.productId);
        var shub = this.state.productId.join();
        console.log(shub);
        this.props.getProducts(this.state.host[1],this.state.productId);
        this.props.getStores(this.state.host[0]);

    }
    componentWillUnmount() {
        ;
        if (!this.flag) {
            localStorage.clear();
        }
    }
    getProducts = ({ getFilterProducts }) => {
        console.log(getFilterProducts);
        if (getFilterProducts) {
            return getFilterProducts.item.map((item) => {
                if (this.state.productId.includes(item._id)) {
                    return (
                        <tr key={item._id}>
                            <td>
                                <div className="prductWithStore">
                                    {console.log(`${this.state.host[1]}/`+item.productPicture[0])}
                                    <img src={`${this.state.host[1]}`+item.productPicture[0]} className="img-fluid" alt="Sheep" />
                                    <span className="text-left">{item.name}</span>
                                </div>
                            </td>

                        </tr>
                    )
                }

            })
        }
    }
    getStores = ({ getStores }) => {
        if (getStores) {
            return getStores.map((item) => {
                if (this.state.storeId.includes(item.id))
                    return (
                        <tr key={item.id}>
                            <td>
                                <div className="prductWithStore">
                                    <img src={item.brandImage} className="img-fluid" alt="Sheep" />
                                    <span>{item.storeName}</span>

                                </div>
                            </td>

                        </tr>
                    )
            })
        }
    }
    navigateBack = () => {
        this.flag = true;
        this.props.history.push(`/dataToStore/${this.state.productId}/${this.state.storeId}`)
        // $('.buttonActivePushDataToStore').toggleClass('buttonActivePushDataToStore buttonOffPushDataToStore');
        // $(e.currentTarget).toggleClass('buttonActivePushDataToStore buttonOffPushDataToStore');

    }
    navigateAhead = () => {
        // this.props.history.push('/')
        console.log(this.state.productId,this.state.storeId)
        axios.post(`${this.state.host[1]}/api/map/stores/products`,{products:this.state.productId,stores:this.state.storeId})
        .then((res)=>console.log(res));
        //  this.props.history.push('/')
    }
    render() {
        return (
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host);
            }}>
                <HostResolver hostToGet="mockup" hostResolved={host => {
                this.setHost(host);
            }}>
            <div>
                <Dashboard>
                    <div className="pushDataToStoreHeading"><h4>Push Data to Stores</h4></div>
                    <div className="md-stepper-horizontal orange editorder">
                        <div className="md-step active done ">
                            <div className="md-step-circle"><span>1</span></div>
                            <div className="md-step-title text-danger">Select Products</div>
                            <div className="md-step-bar-left"></div>
                            <div className="md-step-bar-right"></div>
                        </div>
                        <div className="md-step active done ">
                            <div className="md-step-circle"><span>2</span></div>
                            <div className="md-step-title text-danger">Save to Store</div>
                            <div className="md-step-bar-left"></div>

                            <div className="md-step-bar-right"></div>
                        </div>
                        <div className="md-step inActive3 pushprd">
                            <div className="md-step-circle"><span className="text-danger">3</span></div>
                            <div className="md-step-title text-danger">Proceed</div>
                            <div className="md-step-bar-left"></div>
                            <div className="md-step-bar-right"></div>
                        </div>
                    </div>
                    <div></div>
                    <div>

                    </div>
                    <div className="col-12 row contentPushDataToStore">
                        <div className="ml-3 col-12 row"><h5>You'r about to send this information to the store</h5>     </div>
                        <div className="col-12 row pushDataToStoreTable">
                            <div className='card   col-4'>
                                <div className="table-responsive tablePushDataToStore">
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th>Product</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getProducts(this.props.PushDataToStore)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-4 middlePushDataToStore"><div><span><i class="fas fa-arrow-right"></i></span></div></div>
                            <div className='card   col-4'>
                                <div className="table-responsive tablePushDataToStore">
                                    <table className="table ">
                                        <thead>
                                            <tr>
                                                <th>Stores</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.getStores(this.props.PushDataToStore)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 pushDataToStore mt-5">
                            <div><button onClick={this.navigateAhead} className="button-main button3PushDataToStore" style={{ marginLeft: '15px' }}>Proceed</button></div>
                            <div><button onClick={this.navigateBack} className="button-main button3PushDataToStore">Back</button></div>
                        </div>
                    </div>
                </Dashboard>
            </div>
            </HostResolver>
            // </HostResolver>
        )
    }
}

function mapStateToProps(state) {
    return {
        PushDataToStore: state.PushDataToStore
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getProducts,
            getStores
        }
        , dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PushDataToStore);