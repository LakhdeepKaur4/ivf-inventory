import React, { Component } from 'react'
import Pagination from 'react-js-pagination';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewCategory, changeStatus, enableCategory, disableCategory } from '../../actions/categoriesAction';
import Dashboard from '../../components/dashboard/dashboard';
import './categories.css';
import _ from 'lodash';
import HostResolver from '../../components/resolveHost/resolveHost';
import axios from 'axios';
import { throws } from 'assert';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filterName: "customer",
            activePage: 1,
            limit: 5,
            totalItemsCount: 0,
            checked: false,
            host: '',
            results: '',
            categoryData: [],
            multiSelect: [],
            isAllSelect: false,
        }
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 200);
    }

    componentWillReceiveProps(nextprops) {
        if (!this.props.categories || nextprops.categores != this.props.categories) {
            this.setState({ categories: nextprops.categories });
        }

        this.setState({
            totalItemsCount: nextprops.totalData
        });
    }

    debouncedOnChange(value) {
        this.search(value); // perform a search only once every 200ms
    }

    search(value) {
        const request = axios.get(`${this.state.host}/api/category/search?search=${value}`)
            .then(response => {
                return response.data.category
            })
            .then(data => {
                this.setState({ categories: data })
            });
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
        this.debouncedOnChange(e.target.value);
    }

    viewCategoryData = () => {
        if (this.state.categories) {
            return this.state.categories.map((item) => 
            <option key={item._id}>{item.name}</option>)
        }
    }

    editCategory = (id) => {
        this.props.history.push(`/editcategory/${id}`);
    }

    getProductData = (id) => {
        this.props.history.push(`/productsView/${id}`);
    }

    getSelectedIds = () => {
        let checkedIds = [];
        this.state.categories.map((category) => {
            if(category.checked) {
                checkedIds.push(category._id);
            }
        })
        return checkedIds;
    }


    //Handle multiple
    handleMultiple = value => {
        let ids = this.getSelectedIds();
        const { pageNo, host } = this.state;
        this.props.changeStatus(value, ids, pageNo, host)
            .then(() => {
                this.props.viewCategory(this.state.host,this.state.activePage, this.state.limit);
            });

        this.setState({
            multiSelect: [],
            isAllSelect: false,
            dropdownClick: false
        })
    };

    // Get Ids for selected Category
    onSingleSelect = (id, action) => {

        this.setState((prevState) => {            
            return {
                categories: prevState.categories.map(_category => {
                    if (_category._id == id) {
                        return { ..._category, checked: !_category.checked }
                    }
                    return _category;
                })
            }
        },()=>{
            let isAllSelect = false;
            if(action){
                isAllSelect = this.state.categories.every(category=>{
                    return category.checked;
                });
            }
            this.setState({
                isAllSelect
            });
        });
        if(action){
            let isAllSelect = 
            
            this.setState({
                isAllSelect
            });

        }else{
            this.setState({
                isAllSelect: false
            });
        }
    };

    // Handle Enable
    handleEnable = id => {
        const { activePage, host } = this.state;
        this.props.enableCategory(id, activePage, host)
        .then(() => {
            this.props.viewCategory(this.state.host, this.state.activePage, this.state.limit);
        });
    };

    // Handle Disable 
    handleDisable = id => {
        const { activePage, host } = this.state;
        this.props.disableCategory(id, activePage, host)
        .then(() => {
            this.props.viewCategory(this.state.host, this.state.activePage, this.state.limit);
        });
    };


    categoryResult = () => {
        let categories = this.state.categories;
        if (categories) {
            return categories.map(category => {
                return (
                    <tr key={category._id}>
                        <td><input type="checkbox" checked={category.checked}                        
                            onChange={e => {
                                this.onSingleSelect(category._id, e.currentTarget.checked);
                            }}
                            />
                        </td>
                        <td>{category.name}</td>
                        <td>{category.parent ? category.parent.name : ''}</td>
                        <td>{category.items ? category.items.length : 0}</td>

                        {(category.status === true) ? <td style={{ color: "#1ABC9C" }}>Enable</td> : <td style={{ color: "#F46565" }}>Disabled</td>}
                        <td>

                            <div className="category_actions" style={{ marginLeft: '3%' }}>
                                <div className="dropdown">
                                    <button
                                        className="btn"
                                        type="button"
                                        id="dropdownActionMenu"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        ...
                                        </button>

                                    <div className="dropdown-menu" aria-labelledby="dropdownActionMenu">
                                        <a className="dropdown-item" onClick={() => this.editCategory(category._id)}>
                                            Edit
                                        </a>
                                        <a className="dropdown-item" onClick={() => this.getProductData(category._id)}>
                                            View Products
                                        </a>
                                        {category.status === false ? (
                                            <a
                                                className="dropdown-item"
                                                onClick={() => this.handleEnable(category._id)}
                                            >
                                                Enable
                                            </a>
                                        ) : (
                                                <a
                                                    className="dropdown-item"
                                                    onClick={() => this.handleDisable(category._id)}
                                                >
                                                    Disable
                                            </a>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
    }
    selectAll = () => {
        this.setState(currentState => { 
            return {
                checked: !currentState.checked,
                categories: currentState.categories.map(category => {
                    return {
                        ...category,
                        checked: !currentState.checked
                    }
                })
            }
        })
    }

    clickToCreate = () => {
        this.props.history.push("/createCategory")
    }

    setHost = host => {
        this.setState({ host });
        this.props.viewCategory(host, this.state.activePage, this.state.limit);
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

    handleAllSelect = action => {
       let categories = [];
        categories = this.state.categories.map((category) => {
            category.checked = action;
            return category;
       })
       this.setState({
           categories,
           isAllSelect:action
       })
    }

    render() {
        return (
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host);
            }}>
                <div>
                    <Dashboard>
                        <div>
                            <div className="categoryHeading"> CATEGORIES</div>
                            <div className="descriptionText">
                                <p>
                                    Categories are intended to group together pages on similar subjects. They are implemented by a MediaWiki feature that adds any page with a text like [[Category:XYZ]] in its wikimarkup to the automated listing that is the category with name XYZ. Categories help readers to find, and navigate around, a subject area, to see pages sorted by title, and to thus find article relationships.
                                </p>
                            </div>

                            <div className="sw-action-bar">
                                <div className="category_actions parent-flex-center" >
                                    <div className="dropdown">
                                        <button
                                            className="btn actionButton"
                                            type="button"
                                            id="dropdownActionMenu"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >Action
                                                <i className="fa fa-angle-down" aria-hidden="true" style={{ paddingLeft: '12px', color: '#777777' }}></i>
                                        </button>

                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownActionMenu"
                                        >
                                            <a
                                                className="dropdown-item"
                                                onClick={() => {
                                                    this.handleMultiple("Enabled");
                                                }}
                                            >
                                                Enable
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                onClick={() => {
                                                    this.handleMultiple("disabled");
                                                }}
                                            >
                                                Disable
                                            </a>
                                        </div>
                                    </div>

                                </div>

                                <div className="parent-flex-center"
                                    style={{ marginLeft: "16px" }}>
                                    <i className="fa fa-plus" style={{ fontSize: "14px", marginLeft: '3%', marginTop: '1%', color: '#777777' }}>
                                    </i>
                                    <button className="btn createText" onClick={this.clickToCreate}>
                                        New
                                    </button>
                                </div>

                                <li className="nav-item searchBox">
                                    <span className="nav-link" style={{ paddingTop: '1px' }}><span className="form-group has-search">
                                        <span className="fa fa-search form-control-feedback"></span>
                                        <input type="text" className="form-control searchBox " placeholder="Search" value={this.state.search}
                                            onChange={this.searchOnChange} />
                                    </span></span>
                                </li>
                                <datalist id="products">
                                    {this.viewCategoryData(this.props.catogoriesReducer)}
                                </datalist>


                                <div
                                    style={{
                                        alignSelf: "flex-end",
                                        height: "30px"
                                    }}
                                    className="sw-action-bar__item sw-action-bar__item--right parent-flex-center">
                                    {this.renderPagination()}
                                </div>
                            </div>

                            <table className="table table-hover categoryList" style={{ backgroundColor: '#FFFFFF', marginTop: '2%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input type="checkbox" 
                                            checked={this.state.isAllSelect}
                                            onChange={e => {
                                                this.handleAllSelect(e.currentTarget.checked);
                                              }}
                                            />
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Parent</th>
                                        <th scope="col">Products</th>
                                        <th scope="col">Visibility</th>
                                        <th scope="col">Actions</th>
                                        <th scope="col">
                                            <div className="category_actions" >
                                                <div >
                                                    <button
                                                        className="btn"
                                                        type="button"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        ...
                                                </button>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.categoryResult(this.props.catogoriesReducer)}
                                </tbody>
                            </table>
                        </div>
                    </Dashboard>
                </div>
            </HostResolver>
        )
    }
}

function mapStateToProps(state) {
    let categories = [];
    let totalData = 0;
    if (state.catogoriesReducer && state.catogoriesReducer.categoryData
        && state.catogoriesReducer.categoryData.categories
    ) {
        categories = state.catogoriesReducer.categoryData.categories;
        totalData = state.catogoriesReducer.categoryData.total;
    }
    return {
        categories,
        totalData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ viewCategory, changeStatus, enableCategory, disableCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);