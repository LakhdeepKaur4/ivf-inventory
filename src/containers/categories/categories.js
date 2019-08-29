import React, { Component } from 'react'
import Pagination from 'react-js-pagination';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewCategory } from '../../actions/categoriesAction';
import Dashboard from '../../components/dashboard/dashboard';
import './categories.css';
import _ from 'lodash';
import HostResolver from '../../components/resolveHost/resolveHost';
import axios from 'axios';
import { toasterMessage } from "../../utils.js";

class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            filterName: "customer",
            activePage: '1',
            limit: '5',
            totalItemsCount: '',
            checked: false,
            host:'',
            results:'',
            categoryData:[]
        }
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 200);
    }

    componentWillReceiveProps(nextprops) {
        if(!this.props.categories || nextprops.categores != this.props.categories) {
            this.setState({categories:nextprops.categories});
        }
    }

    debouncedOnChange(value) {
        this.search(value); // perform a search only once every 200ms
    }

    search(value) {
        const request = axios.get(`${this.state.host}/api/category/search?search=${value}`)
        .then(response=> {
            return response.data.category
         })
        .then(data=>{
            this.setState({categories:data})
        }); 
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
        this.debouncedOnChange(e.target.value);
    }

    viewCategoryData = () => {
        if (this.state.categories) {
            return this.state.categories.map((item) => <option key={item.id}>{item.name}</option>)
        }
    }

    editCategory = (id) => {
        this.props.history.push(`/editcategory/${id}`);
    }

    getProductData = (id) => {
        this.props.history.push(`/productsView/${id}`)
    }

    categoryResult = () => {
        let categories = this.state.categories;
        if (categories) {
            return categories.map(category => {
                return (
                    <tr key={category.id}>
                        <td><input type="checkbox" checked={category.checked}
                        onClick = {()=>{
                            this.setState((prevState)=>{
                                return{
                                    categories:prevState.categories.map(_category=>{
                                        if(_category._id == category._id){
                                            return {..._category,checked:!_category.checked}
                                        }
                                        return _category;
                                    })
                                }
                            });
                        }}
                        ></input></td>
                        <td>{category.name}</td>
                        <td>{category.items ? category.items[0]:''}</td>
                        <td>{category.items ? category.items[1]:''}</td>
                        {(category.status === true) ? <td style={{ color: "#1ABC9C" }}>Visible</td> : <td style={{ color: "#F46565" }}>Not Visible</td>}
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
                                        <a className="dropdown-item" onClick={() => this.getProductData(category._id)}>
                                            View Products
                                        </a>
                                        <a className="dropdown-item" onClick={() => this.editCategory(category._id)}>
                                            Edit
                                        </a>
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
        this.setState(currentState=>{
            return {
                checked: !currentState.checked,
                categories:currentState.categories.map(category=>{
                    return {
                        ...category,
                        checked:!currentState.checked
                    }
                })
            }
        });
    }

    clickToCreate = () => {
        this.props.history.push("/createCategory")
    }

    setHost = host => {
        this.setState({host});
        this.props.viewCategory(host);
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

                            <div>
                                <div className="category_actions" >
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
                                                    this.handleMultiple("enabled");
                                                }}
                                            >
                                                Visible
                                                    </a>
                                            <a
                                                className="dropdown-item"
                                                onClick={() => {
                                                    this.handleMultiple("disabled");
                                                }}
                                            >
                                                Not Visible
                                                    </a>
                                        </div>
                                    </div>

                                </div>

                                <i className="fa fa-plus" style={{ marginLeft: '3%', marginTop: '1%', color: '#777777' }}>
                                </i>
                                <button className="btn createText" onClick={this.clickToCreate}>
                                    Create
                            </button>

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


                                <div style={{ float: 'right', marginRight: '2%', color: 'black' }}>
                                    <Pagination activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.limit}
                                        totalItemsCount={this.state.totalItemsCount}
                                        onChange={this.handlePageChange}
                                        itemclass='page-item'
                                        linkclass='page-link' />
                                </div>

                            </div>

                            <table className="table table-hover categoryList" style={{ backgroundColor: '#FFFFFF', marginTop: '2%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input type="checkbox" onClick={this.selectAll} />
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Products</th>
                                        <th scope="col">PROD IN SC</th>
                                        <th scope="col">Visible</th>
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
    if(state.catogoriesReducer && state.catogoriesReducer.categoryData
        && state.catogoriesReducer.categoryData.categories){
        categories = state.catogoriesReducer.categoryData.categories
    }
    return {
        categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ viewCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);