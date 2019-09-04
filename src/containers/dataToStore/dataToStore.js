import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDataStore } from '../../actions/dataToStoreAction';
import '../../commonCss/style.css';
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';
import './dataToStore.css';
import HostResolver from '../../components/resolveHost/resolveHost';
import '../../commonCss/stepbar.css'

class DataToStore extends Component {
    flag = false;
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            filterName: "customer",
            activePage: '1',
            limit: '5',
            totalItemsCount: '',
            sortVal:false,
            productId: [],
            storeIds: [],
            allIds: [],
            flag: false,
            error: false
        }
    }
    setHost = host => {
        this.setState({ host });
        window.onpopstate = () => {
            this.flag = true;
        }

        if (localStorage.getItem('store') !== null) {
            let stores = localStorage.getItem('store').split(',');
            this.setState({ storeIds: stores });
        }
        this.props.getDataStore(host)
            .then(res => {
                let Ids = [];
                res.payload.data.data.map(item => {
                    Ids.push(item.instanceId);
                })
                this.setState({ allIds: Ids });
            });
        var urlAr = location.href.split('/');
        var ids = urlAr[4];
        localStorage.setItem('product', ids);
        this.setState({ productId: ids });
    }

    componentWillUnmount() {

        if (!this.flag) {
            localStorage.clear();
        }
    }


    getStoreId = (id, action) => {
        this.setState({ error: false })
        var IDS = [];
        IDS = this.state.storeIds;
        if (action === true) {
            console.log('true')
            IDS.push(id);
        } else {
            console.log('hii');
            IDS.splice(IDS.indexOf(id), 1);
        }
        this.setState({ storeIds: IDS })
    }

    sortArr=(arr,way)=>{
        if(way==='inc'){
            arr.sort((a,b)=>{
                var orderBool= a.name > b.name
                return orderBool ?1 :-1;

            })
        }else{
            arr.sort((a,b)=>{
                var orderBool= a.name < b.name
                return orderBool ?1 :-1;
            
        })

    }}
    

    viewOrderFun = ({ dataStore }) => {
        if (dataStore) {
            let arr= dataStore.data.data;
            console.log(arr);
            if(this.state.sortVal===true){
                this.sortArr(arr,'inc');
            }else{
                this.sortArr(arr,'dec');
            }
            return dataStore.data.data
            .filter(this.searchFilter)
            .map((item => {
                return (
                    <tr key={item.instanceId}>
                        <td><input type="checkbox" checked={(this.state.storeIds.includes(item.instanceId)) ? true : false} onClick={(e) => {
                            let action = e.currentTarget.checked;
                            this.getStoreId(item.instanceId, action)
                        }}></input></td>
                        {/* <td>
                            <img src={item.brandImage} className="img-fluid" alt="store" />
                        </td> */}
                        <td>{item.name}</td>
                        <td>
                        {item.rootDomain+' '+item.selectedNode}
                        </td>
                        <td>{item.description}</td>
                        <td>{item['Group.name']}</td>
                        <td>Trinity</td>
                    </tr>
                )
            }))
        }

    }
    navigateNext = () => {
        ;
        this.setState({ error: true })
        this.flag = true;
        if (this.state.storeIds.length) {
            this.props.history.push(`/pushDataToStore/${this.state.productId}/${this.state.storeIds}`)
        }
    }
    navigatePrevious = () => {
        this.flag = true;
        this.props.history.push(`/pushProductsView/${this.state.productId}`)
    }
    selectAll = (action) => {
        this.setState({ error: false })
        if (action === true) {
            this.setState({ storeIds: [...this.state.allIds] });
        } else {
            this.setState({ storeIds: [] });
        }
    }
    searchOnChange = (e) => {
        this.setState({ search: e.target.value })

    }
    searchFilter = (x) => {
        console.log(x)
        let search = this.state.search;
        let ret = {};

        ret.name = (x.name !== undefined) ? x.name.toLowerCase().includes(search.toLowerCase()) : false;
        // ret.rootDomain = (x.rootDomain !== undefined) ? x.rootDomain.toLowerCase().includes(search.toLowerCase()) : false;
        // ret.selectedNode = (x.selectedNode !== undefined) ? x.selectedNode.toLowerCase().includes(search.toLowerCase()) : false;
        // ret.price = (x.price !== undefined && x.price.range !== undefined) ? x.price.range.toString().includes(search.toString()) : false;
        return ret.name ||
            //  ret.rootDomain ||
            //  ret.selectedNode ||
            // ret.price ||
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

    render() {
        let viewOrderData =
            <div className="table-responsive card">
                <table className="table dataToStore">
                    <thead>
                        <tr style={{ color: "#777777" }}>
                            <th scope="col"><input type="checkbox" checked={(this.state.storeIds.length === this.state.allIds.length) ? true : false} onClick={(e) => {
                                this.selectAll(e.currentTarget.checked)
                            }}></input></th>
                            {/* <th scope="col">STORE LOGO</th> */}
                            <th scope="col">STORE NAME</th>
                            <th scope="col">STORE URL</th>
                            <th scope="col">STORE Description</th>
                            <th scope="col">Group</th>
                            <th scope="col">Type</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.viewOrderFun(this.props.DataToStoreReducer)}
                    </tbody>
                </table>
            </div>

        let navLink = <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-faded">
                <h4 className="navbar-brand"><b>PUSH DATA TO STORE</b></h4>


            </nav>

        </div>


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
                            <span className="nav-link" style={{ paddingTop: '1px' }}><span className="form-group has-search">
                                <span className="fa fa-search form-control-feedback"></span>
                                <input type="text" className="form-control searchBox" placeholder="Search" value={this.state.search}
                                    onChange={this.searchOnChange} />
                            </span></span>
                        </li>


                        <li className="nav-item">
                            <span className="nav-link"><spna>Filter</spna><span style={{ marginLeft: '5px' }}><i class="fas fa-angle-down" aria-hidden="true" style={{ marginLeft: '5px' }}></i></span></span>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link"><spna>Push Information to stores</spna><span style={{ marginLeft: '5px' }}><i className="fas fa-check-circle" aria-hidden="true" style={{ marginLeft: '5px' }}></i></span></span>
                        </li>


                    </ul>
                </div>
            </nav>
        return (
            <HostResolver hostToGet="voxel" hostResolved={host => {
                this.setHost(host);
            }}>
                <div>
                    <Dashboard>
                        {navLink}
                        <div className="md-stepper-horizontal orange">
                            <div className="md-step active done products">
                                <div className="md-step-circle"><span>1</span></div>
                                <div className="md-step-title text-danger">Select Products</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                            <div className="md-step inactive1 prdStep">
                                <div className="md-step-circle"><span className="text-danger">2</span></div>
                                <div className="md-step-title">Save to Store</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                            <div className="md-step inactive2">
                                <div className="md-step-circle"><span className="text-inactive2">3</span></div>
                                <div className="md-step-title">Proceed</div>
                                <div className="md-step-bar-left"></div>
                                <div className="md-step-bar-right"></div>
                            </div>
                        </div>
                        <div>
                            {navIcon}
                            <div style={{ float: "right" }}>
                                <Pagination activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.limit}
                                    totalItemsCount={this.state.totalItemsCount}
                                    onChange={this.handlePageChange}
                                    itemClass='page-item'
                                    linkClasss='page-link'
                                />
                            </div>
                        </div>


                        <div>{viewOrderData}</div>
                        <div className="col-12" style={{ color: 'red', textAlign: 'right' }}>{this.state.error ? 'Please Select One Store' : ''}</div>
                        <div style={{ marginTop: '15px' }}>
                            <button className="button-main button3" onClick={this.navigateNext}>Next</button>
                            <button className="button-main button3" style={{ marginRight: '10px' }} onClick={this.navigatePrevious}>Previous</button>
                        </div>
                    </Dashboard>
                </div>
            </HostResolver>



        )
    }
}

function mapStateToProps(state) {

    return {
        DataToStoreReducer: state.DataToStoreReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getDataStore }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DataToStore);