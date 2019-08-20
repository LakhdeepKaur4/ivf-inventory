import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProducts, getStores } from '../../actions/pushDataToStore';
import './pushDataToStore.css';
import $ from 'jquery';
import Dashboard from '../../components/dashboard/dashboard';

class PushDataToStore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            productId: [],
            storeId: []
        }
    }

    componentDidMount() {
        window.onpopstate = ()=>{
            this.flag = true;
        }
        var urlAr = location.href.split('/');
        var storeId = urlAr[urlAr.length - 1];
        var productId = urlAr[urlAr.length - 2];;
        this.setState({ productId: productId.split(",") });
        this.setState({ storeId: storeId.split(",") });
        localStorage.setItem('product',productId.split(","));
        localStorage.setItem('store',storeId.split(","));
        this.props.getProducts();
        this.props.getStores();

    }
    componentWillUnmount(){;
        if (!this.flag) {
            localStorage.clear();   
        }
    }
    getProducts = ({ getFilterProducts }, { getStores }) => {
        if (getFilterProducts) {
            return getFilterProducts.map((item) => {
                if (this.state.productId.includes(item.id)) {
                    if (getStores) {
                        return getStores.map((store) => {

                            if (this.state.storeId.includes(store.id)) {
                                return (
                                    <tr key={store.id}>
                                        <td>
                                            <div className="prductWithStore">
                                                <span>{item.name}</span>
                                                <img src={item.image} className="img-fluid" alt="Sheep"/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="prductWithStore">
                                                <span>{store.storeName}</span>
                                                <img src={store.brandImage} className="img-fluid" alt="store"/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                }
            })
        }
    }
    navigateBack=()=>{
            this.flag = true;
        this.props.history.push(`/dataToStore/${this.state.productId}/${this.state.storeId}`)
        // $('.buttonActivePushDataToStore').toggleClass('buttonActivePushDataToStore buttonOffPushDataToStore');
        // $(e.currentTarget).toggleClass('buttonActivePushDataToStore buttonOffPushDataToStore');
        
    }
    render() {
        return (
            <div>
                <Dashboard>
                <div className="pushDataToStoreHeading"><h4>Push Data to Stores</h4></div>
                <div className="md-stepper-horizontal orange">
                    <div className="md-step active done">
                        <div className="md-step-circle"><span>1</span></div>
                        <div className="md-step-title text-danger">Select Products</div>
                        <div className="md-step-bar-left"></div>
                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step active done">
                        <div className="md-step-circle"><span>2</span></div>
                        <div className="md-step-title text-danger">Save to Store</div>
                        <div className="md-step-bar-left"></div>

                        <div className="md-step-bar-right"></div>
                    </div>
                    <div className="md-step inActive3">
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
                    <div className='card   col-8'>
                        <div className="table-responsive">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Stores</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getProducts(this.props.PushDataToStore, this.props.PushDataToStore)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-3 pushDataToStore">
                        <div><button onClick={this.navigateBack} className="button-main button3" style= {{marginTop:'auto'}}>Back</button></div>
                        <div><button id="firstpdts" onClick={this.navigateAhead} className="button-main button3">Proceed</button></div>
                    </div>
                    </div>
                </div>
                </Dashboard>
            </div>
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