import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMockProductsView } from '../../actions/productsViewAction';
import Pagination from 'react-js-pagination';
import './pushProductView.css';
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';
import '../../commonCss/stepbar.css'

class ProductsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            activePage: '1',
            limit: '5',
            totalItemsCount: '',
            filterName: 'name',
            sortVal: false,
            ids: [],
            allIds: [],
            flag: false,
            error:false,
            host:''
        }
    }
    btnClick = () => {
        this.setState({ checked: true })
    }

    componentWillUnmount() {
        if (!this.state.flag) {
            localStorage.clear();
        }
    }
    
    setHost = host => {
        this.setState({host});
        if (localStorage.getItem('product') !== null) {
            let products = localStorage.getItem('product').split(',');
            this.setState({ ids: products });
        }
        this.props.getMockProductsView(host)
            .then(res => {
                let Ids = [];
                res.payload.map(item => {
                    Ids.push(item.id);
                })
                this.setState({ allIds: Ids });
            });
    }

  // This function will be used in pagination in later stage.

    handlePageChange = (pageNumber) => {
        // this.props.getPageDetails(pageNumber);
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            return x.sku.toLowerCase().includes(search.toLowerCase()) ||
                x.stock.toString().includes(search.toString()) ||
                x.name.toLowerCase().includes(search.toLowerCase()) ||
                !search;
        }
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

    pickIds = (Id, action) => {
        this.setState({error:false})
        var IDS = this.state.ids;
        if (action === true) {
            IDS.push(Id);
        } else {
            IDS.splice(IDS.indexOf(Id), 1);
        }
        this.setState({ ids: IDS });
    }

    productsResult = ({ productListMock }) => {
        if (productListMock) {
            let Ids = [];
            productListMock.map(item => {
                Ids.push(item.id);
            })
            return productListMock.sort((item1, item2) => {
                var cmprVal = (item1[this.state.filterName].localeCompare(item2[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item) => {
                return (
                    <tr>
                        <td scope="row"><input type="checkbox" checked={(this.state.ids.includes(item.id)) ? true : false} onClick={(e) => {
                            let action = e.currentTarget.checked;
                            this.pickIds(item.id, action);
                        }} /></td>
                        <td><img src={item.image} className="img-fluid" alt="Sheep" /></td>
                        <td>{item.sku}</td>
                        <td>{item.stock}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                    </tr>
                )

            })
        }
    }
    navigate = () => {
        this.setState({error:true})
        this.setState({ flag: true })
        if(this.state.ids.length){
            this.props.history.push(`/dataToStore/${this.state.ids}`)
        }
        
    }
    selectAll = (action) => {
        this.setState({error:false})
        if (action === true) {
            this.setState({ ids: [...this.state.allIds] });
           
        } else {
            this.setState({ ids: [] });
        }
    }

    

    render() {
        let tableData =
            <div className="table-responsive card text-dark">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" checked={(this.state.ids.length === this.state.allIds.length) ? true : false} onClick={
                                
                                (e) => {
                                    this.selectAll(e.currentTarget.checked);
                                }
                            } /></th>
                            <th scope="col">IMAGES</th>
                            <th scope="col">SKU</th>
                            <th scope="col">STOCK</th>
                            <th scope="col">NAME</th>
                            <th scope="col">PRICE</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
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

                <div className="collapse navbar-collapse justify-content-end" id="nav-content">
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
                </div>
            </nav>




        let navIcon =
            <nav className="navbar navbar-expand-lg navbar-light bg-faded">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <span className="nav-link" onClick={this.onSort}><i class="fas fa-sort-amount-down" aria-hidden="true"></i></span>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link" onClick={this.onSortInv}><i class="fas fa-sort-amount-up" aria-hidden="true"></i></span>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link"><i class="fas fa-th-large" aria-hidden="true"></i></span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Limits 20<i class="fas fa-angle-down" aria-hidden="true" style={{ marginLeft: '5px' }} ></i></span>
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
                            {/* <span className="nav-link"><i class="fas fa-plus" aria-hidden="true" style={{marginLeft: '5px'}}></i><span style={{marginLeft: '5px'}}>New</span></span> */}
                        </li>
                    </ul>
                </div>
            </nav>

        return (
            <HostResolver hostToGet="mockup" hostResolved={host => {
                this.setHost(host);
            }}>
            <div>
                <Dashboard>


                    <div>
                        {navLink}
                    </div>
                    <div className="md-stepper-horizontal orange">
                        <div className="md-step activeProductsView ">
                            <div className="md-step-circle activePush"><span>1</span></div>
                            <div className="md-step-title">Select Products</div>
                            <div className="md-step-bar-left"></div>
                            <div className="md-step-bar-right"></div>
                        </div>
                        <div className="md-step ">
                            <div className="md-step-circle"><span>2</span></div>
                            <div className="md-step-title deactive">Save to Store</div>
                            <div className="md-step-bar-left"></div>

                            <div className="md-step-bar-right"></div>
                        </div>
                        <div className="md-step">
                            <div className="md-step-circle"><span>3</span></div>
                            <div className="md-step-title deactive">Proceed</div>
                            <div className="md-step-bar-left"></div>
                            <div className="md-step-bar-right"></div>
                        </div>
                    </div>
                    <div>
                        {navIcon}
                    </div>
                    <div style={{ float: 'right' }}>
                        <Pagination activePage={this.state.activePage}
                            itemsCountPerPage={this.state.limit}
                            totalItemsCount={this.state.totalItemsCount}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClasss='page-link'
                        />
                    </div>

                    <div>
                        {tableData}
                    </div>
                    <div>
                    <div className="col-12"style={{color:'red',textAlign:'right'}}>{this.state.error?'Please Select at Least one Id':''}
                    </div>
                        <button className="button-main button3" style={{marginTop:'15px'}} onClick={this.navigate}>Next</button>  
                    </div>


                </Dashboard>
            </div>
            </HostResolver>

        )
    }
}

function mapStateToProps(state) {

    return {
        ProductsViewReducer: state.ProductsViewReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMockProductsView }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);