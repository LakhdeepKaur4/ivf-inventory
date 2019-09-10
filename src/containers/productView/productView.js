import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProductsView } from '../../actions/productsViewAction';
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';
import axios from 'axios';
import HostResolver from '../../components/resolveHost/resolveHost';
import './productView.css';

class ProductsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            activePage: '1',
            limit: '20',
            totalItemsCount: '',
            filterName: 'name',
            sortVal: true,
            ids: [],
            visible: [],
            allProductIds: [],
            productId: [],
            errMessage:'',
            productID: props.match.params.id,
            host: ''
        }
    }

    btnClick = (id) => {
        let ids = this.state.visible;
        if (ids.includes(id) === true) {
            ids.splice(ids.indexOf(id), 1);
        } else {
            ids.push(id);
        }
        this.setState({
            visible: ids
        })
    }
    pickIds = (id, action) => {
        let IDS = this.state.productId
        if (action == true) {
            IDS.push(id);
        } else {
            IDS.splice(IDS.indexOf(id), 1);
        }
        this.setState({ productId: IDS })
    }
    setHost = host => {
        var defaultPage = this.state.activePage;
        var limit=this.state.limit;
        this.setState({ host });
        this.props.getProductsView(host, this.state.productID, defaultPage,limit)
            .then((res) => {
                let Ids = [];
                if (res.payload && res.payload.items && res.payload.items.docs) {
                    res.payload.items.docs.map((item) => {
                        Ids.push(item._id)
                    })
                    this.setState({ allProductIds: Ids,
                        //  limit: res.payload.items.limit,
                          totalItemsCount: res.payload.items.total })
                }
            }).then(()=>console.log(this.state.totalItemsCount))
        if (this.state.productID) {
            const request = axios.get(`${host}/api/item/category/${this.state.productID}`)
                .then(response => {

                })
        }

    }

    handleEditBrand=(itemid)=>{
        this.props.history.push(`/productTree/editProduct/${itemid}`)
    }


    handlePageChange = (pageNumber) => {
        // this.props.getPageDetails(pageNumber);
        this.props.getProductsView(this.state.host,null,pageNumber,this.state.limit);
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter =  (x)=> {
        let search = this.state.search;
        let ret = {};

        ret.sku = (x.sku !== undefined) ? x.sku.toLowerCase().includes(search.toLowerCase()) : false;
        ret.optStock = (x.optStock !== undefined) ? x.optStock.toString().includes(search.toString()) : false;
        ret.name = (x.name !== undefined) ? x.name.toLowerCase().includes(search.toLowerCase()) : false;
        ret.price = (x.price !== undefined && x.price.range !== undefined) ? x.price.range.toString().includes(search.toString()) : false;
        return ret.sku ||
            ret.optStock ||
            ret.name ||
            ret.price ||
            !search;
    }

    onSort = () => {
        this.setState(() => {
            return {
                sortVal: true,
            }
        });

    }


    onSortInv = () => {
        this.setState(() => {
            return {
                sortVal: false,
            }
        });
    }

    onToggleDropDown = (option) => {

        this.props.onSizePerPageList(Number(option.target.value))
    }
    pickIds = (id, action) => {
        let IDS = this.state.productId
        if (action == true) {
            IDS.push(id);
        } else {
            IDS.splice(IDS.indexOf(id), 1);
        }
        this.setState({ productId: IDS })
    }

    sorted = (arr, way) => {
        if (way === 'inc') {
            arr.sort((a, b) => {
                var orderBool = a.name > b.name;
                return orderBool ? 1 : -1;
            })
        } else {
            arr.sort((a, b) => {
                var orderBool = a.name < b.name;
                return orderBool ? 1 : -1;
            })
        }

        return arr
    }

    productsResult = ({ productList }) => {
        let data = [];
        if (this.props.match.params.id) {
            data = productList;
        }
        else if (productList && productList.items && productList.items.docs) {
            data = productList.items.docs
        }else{
            
        }
        if (data && data.length) {
            let arr = [];
            for (let x of data) {
                arr.push(x);
            }
            let arrReturned
            if (this.state.sortVal === true) {
                arrReturned = this.sorted(arr, 'inc');
            } else {
                arrReturned = this.sorted(arr, 'dec');
            }
            return arrReturned.filter(this.searchFilter)
                .map((item) => {
                    return (
                        <tr>
                            <td scope="row">
                                <input type="checkbox" checked={this.state.productId.includes(item._id)}
                                    onClick={(e) => this.pickIds(item._id, e.currentTarget.checked)} />
                            </td>
                            <td>
                            <img src={`${this.state.host}`+item.productPicture[0]} className="img-fluid" alt="Sheep" />
                            </td>
                            <td>{item.name}</td>
                            <td>
                                {item.sku}
                            </td>
                            <td>
                                {item.optStock}
                            </td>
                            <td>
                                {item.price ? item.price.range : ''}
                            </td>
                            <td>
                                <div><button className="button button1 active" onClick={() => this.btnClick(item._id)}>{(this.state.visible.includes(item._id)) ? 'Invisible' : 'Visible'}</button></div>
                                <div><button className="button button2" onClick={this.btnClick}>Bookmark</button></div>
                            </td>
                            <td>
                                <div className="dropdown">
                                    <button
                                        className="btn"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        ...
                  </button>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton"
                                    >
                                        <a
                                            className="dropdown-item"
                                            onClick={() => this.handleEditBrand(item._id)}
                                        >
                                            Edit
                    </a>
                                        {item.status === false ? (
                                            <a
                                                className="dropdown-item"
                                                onClick={() => this.handleEnable(item._id)}
                                            >
                                                Publish
                      </a>
                                        ) : (
                                                <a
                                                    className="dropdown-item"
                                                    onClick={() => this.handleDisable(item._id)}
                                                >
                                                    Hide
                      </a>
                                            )}
                                        <a
                                            className="dropdown-item"
                                            onClick={() => { this.viewProducts(item._id) }}>View Products</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )

                })
        }
    }
    selectAll = (action) => {
        if (action === true) {
            this.setState({ productId: [...this.state.allProductIds] })
        }
        else {
            this.setState({ productId: [] })
        }

    }
    navigate = () => {
        this.props.history.push('/createProduct');
    }
    renderPagination=()=>{
        return <Pagination activePage={this.state.activePage}
        itemsCountPerPage={this.state.limit}
        totalItemsCount={this.state.totalItemsCount}
        onChange={this.handlePageChange}
        itemClass='page-item'
        linkClasss='page-link'
    />
    }
    render() {

        let tableData =
            <div className="table-responsive card text-dark">
                <table className="table productView">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" checked={(this.state.productId.length === this.state.allProductIds.length) ? true : false} onClick={(e) => this.selectAll(e.currentTarget.checked)} /></th>
                            <th scope="col">IMAGES</th>
                            <th scope="col">Name</th>
                            <th scope="col">SKU</th>
                            <th scope="col">STOCK</th>
                            <th scope="col">PRICE</th>
                            <th scope="col"></th>
                            <th scope="col">ACTIONS</th>
                            <th scope="col">...</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {this.state.errMessage}
                        {this.productsResult(this.props.ProductsViewReducer)}
                    </tbody>
                </table>
            </div>

        let navLink =
            <nav className="navbar navbar-expand-sm navbar-light bg-faded">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div><h4 className="navbar-brand"><b>PRODUCTS (VIEW)</b></h4></div>

                {/* <div className="collapse navbar-collapse justify-content-end" id="nav-content">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">All</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Free Shipping</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Oofs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Hidden</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Visible</a>
                        </li>
                    </ul>
                </div> */}
            </nav>




        let navIcon =
            <nav className="navbar navbar-expand-lg navbar-light bg-faded">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <span className="nav-link" onClick={this.onSort}><i className="fas fa-sort-amount-down" aria-hidden="true"></i></span>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link" onClick={this.onSortInv}><i className="fas fa-sort-amount-up" aria-hidden="true"></i></span>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link"><i className="fas fa-th-large" aria-hidden="true"></i></span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Limits 20<i className="fas fa-angle-down" aria-hidden="true" style={{ marginLeft: '5px' }} ></i></span>
                        </li>

                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                    </span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link" style={{ paddingTop: '1px' }}><span className="form-group has-search">
                                <span className="fa fa-search form-control-feedback"></span>
                                <input type="text" className="form-control searchBox " placeholder="Search" value={this.state.search}
                                    onChange={this.searchOnChange} />
                            </span></span>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link"><i className="fas fa-plus" aria-hidden="true" style={{ marginLeft: '5px' }}></i><span style={{ marginLeft: '5px' }} onClick={this.navigate}>New</span></span>
                        </li>
                    </ul>
                </div>
                <div
                            style={{
                                alignSelf: "flex-end",
                                height: "30px"
                            }}
                            className="sw-action-bar__item sw-action-bar__item--right parent-flex-center">
                            {this.renderPagination()}
                        </div>
            </nav>

        return (
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host);
            }}>
                <div>
                    <Dashboard>


                        <div>
                            {navLink}
                        </div>
                        {navIcon}                        
                        <div>
                            {tableData}
                        </div>
                        <div>
                            {/* <button className="button-main button3" onClick={this.navigate}>Next</button> */}
                        </div>


                    </Dashboard>
                </div>

            </HostResolver>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        ProductsViewReducer: state.ProductsViewReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProductsView }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);