import React, { Component } from 'react'
import './products.css';
import Dashboard from '../../components/dashboard/dashboard';
import { getProductsItem, getSearch } from '../../actions/productItemAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileStructure2 from '../../components/fileStructure/fileStructure2';
import HostResolver from '../../components/resolveHost/resolveHost';
import Pagination from 'react-js-pagination';
import $ from 'jquery';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            host: '',
            activePage: 1,
            limit: 5,
            totalItemsCount: 0,
        }
    }

    setHost = host => {
        this.setState({ host });
        this.props.getProductsItem(host);
    }

    searchOnChange = (e) => {
       
        this.props.getSearch(this.state.host, e.target.value);
        console.log("this.props.getSearch======>",this.props.getSearch(this.state.host, e.target.value));
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            return x.name.toLowerCase().includes(search.toLowerCase()) ||
                !search;
        }
    }

    handlePageChange = (pageNo) => {
        this.setState({ activePage: pageNo });
        this.props.viewCategory(this.state.host, pageNo, this.state.limit);
    }

    renderPagination() {
        return <Pagination activePage={this.state.activePage}
            firstPageText={<i className="fa fa-angle-left"></i>}
            lastPageText={<i className="fa fa-angle-right"></i>}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.totalItemsCount}
            onChange={this.handlePageChange}
            itemClass='page-item'
            linkClasss='page-link'
        />
    }



    productsItem = ({ productItem }) => {
        console.log("productItem====>",productItem)

        if (productItem && productItem.order && productItem.order.cart
        ) {

            return productItem.order.cart.cartProducts ? productItem.order.cart.cartProducts.map((item) => {
                return (
                    <tr key={item.cartProductId}>
                        <td >{item.productTitle}</td>
                        <td>{productItem.order.shipment.type}</td>
                        <td >{item.quantity}</td>
                        <td >{item.price}</td>
                        <td>{productItem.order.payment.amount}</td>
                    </tr>

                )

            }) : ''

        }
    }

    toggle = (e, id) => {
        console.log();
        if (id === 1) {
            $('.toggleCustomer1').removeClass('hide');
            $('.toggleCustomer2').addClass('hide');

        } else if (id === 2) {
            $('.toggleCustomer2').removeClass('hide');
            $('.toggleCustomer1').addClass('hide');
        }
        $('.underline').addClass('visible');
        $(e.currentTarget).children('hr').removeClass('visible');
        $('.tabHead').addClass('visible');
        $(e.currentTarget).children('h5').removeClass('visible');
    }


    viewProducts = ({ search }) => {
        if (search) {
            console.log("search", "==========",search)
            return search.map(item => {
                console.log("",item)
                return (
                    item ? <tr>
                        <td>{item.image}</td>
                        <td>{item.name}</td>
                        <td>{item.sku}</td>
                        <td>{item.stock}</td>
                        <td>{item.price}</td>
                    </tr> : ''
                )
            })
        }
    }

    prevStatusHandle = () => {
        this.props.history.push('/editanorder');
    }

    nextStepHandle = () => {
        this.props.history.push('/finalizeorder');
    }


    render() {
        let productsItem = <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>

                        <th>NAME</th>
                        <th>SHIPPED</th>
                        <th>QTY.</th>
                        <th>ITEM PRICE</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {this.productsItem(this.props.ProductItemReducer)}
                </tbody>
            </table>
        </div>
        return (
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host);
            }}>
                <div>
                    <Dashboard>
                        <div className="mt-4 ml-4">
                            <h4>Products</h4>
                        </div>

                        <div className="md-stepper-horizontal orange">
                            <div className="md-step active done products">
                                <div className="md-step-circle"><span>1</span></div>
                                <div className="md-step-title">Customer info</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                            <div className="md-step prdStep">
                                <div className="md-step-circle"><span>2</span></div>
                                <div className="md-step-title">Products</div>
                                <div className="md-step-bar-left"></div>

                                <div className="md-step-bar-right"></div>
                            </div>
                            <div className="md-step">
                                <div className="md-step-circle"><span>3</span></div>
                                <div className="md-step-title">Finalize</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                        </div>

                        <div class="card-group m-5">
                            <div class="card">
                                <div class="card-body mainProductDiv">
                                    <div className='row'>
                                        <div className="col-3" onClick={e => { this.toggle(e, 1) }}>
                                            <h5 className="card-title tabHead">ADD Products</h5>
                                            <hr className="underline" />
                                        </div>
                                        <div className="col" onClick={e => { this.toggle(e, 2) }}>
                                            <h5 className="card-title tabHead mr-5 visible" >BROWSE Categories </h5>
                                            <hr className="underline visible" />
                                        </div>
                                    </div>
                                    <div className="toggleCustomer1">
                                    <div className="md-form active-purple-2 mb-3">
                                        <div>
                                            <span style={{ paddingTop: '1px' }}><span className="form-group has-search">
                                                <span className="fa fa-search form-control-feedback"></span>
                                                <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" list="products" name="search" onChange={this.searchOnChange} style={{ backgroundColor: 'transparent' }} />
                                                <datalist id="products">
                                                    <option />

                                                </datalist>
                                            </span>
                                            </span>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>IMAGES</th>
                                                        <th>NAME</th>
                                                        <th>SKU</th>
                                                        <th>STOCK</th>
                                                        <th>PRICE</th>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.viewProducts(this.props.ProductItemReducer)}

                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                  
                                    </div>
                            <div className='toggleCustomer2 hide'>{this.state.host ? <FileStructure2
                                        showHiglighter={true}
                                        level={0}
                                        defaultOpenLevels={1}
                                        host={this.state.host}
                                    /> : null}

                                  
                                </div>
                                
                            </div>
                                    
                            </div>
                        </div>

                        <div className="row float-right" style={{ marginRight: "50px" }}>
                            <button type="button" class="btn btn-light stepbutton prevBtn" onClick={this.prevStatusHandle}>PREVIOUS STEP</button>
                            <button type="button" class="btn btn-dark stepbutton nxtBtn" onClick={this.nextStepHandle}>NEXT STEP</button>
                        </div>

                        <div class="clearfix"></div>

                        {this.renderPagination()}



                        <div className="bg-light text-dark col m-3">
                            <div className="row">
                                {productsItem}
                            </div>
                        </div>

                    </Dashboard>
                </div>
            </HostResolver>
        )
    }

}

function mapStateToProps(state) {
            console.log('ProductItemReducer======>',state.ProductItemReducer)
    return {
        ProductItemReducer: state.ProductItemReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProductsItem, getSearch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);