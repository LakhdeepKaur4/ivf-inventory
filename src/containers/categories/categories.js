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
            results:''
        }
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 200);
    }

    componentDidMount() {
        this.props.viewCategory();
    }

    componentWillReceiveProps(nextprops) {
        if(!this.props.catogoriesReducer  || nextprops.catogoriesReducer.categoryData != this.props.catogoriesReducer.categoryData ) {
            this.setState({categoryData:nextprops.catogoriesReducer.categoryData})
        }
    }

    debouncedOnChange(value) {
        this.search(value); // perform a search only once every 200ms
    }

    search(value) {
        const request = axios.get(`${this.state.host}/search?search=${value}`)
        .then(response=> request.data )
        .then(data=>{
            this.setState({categoryData:data})
        }); 
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
        this.debouncedOnChange(e.target.value);
    }

    viewCategoryData = () => {
        if (this.state.categoryData) {
            return this.state.categoryData.categories.map((item) => <option>{item.name}</option>)
        }
    }

    categoryResult = () => {
        let categoryData = this.state.categoryData;
        if (categoryData) {
            return categoryData.categories.map(category => {
                return (
                    <tr key={category.id}>
                        <td><input type="checkbox" checked={this.state.checked}></input></td>
                        <td>{category.name}</td>
                        <td>{category.items[0] || 'no data'}</td>
                        <td>{category.items[1]}</td>
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
                                        <a className="dropdown-item">
                                            View Products
                                        </a>
                                        <a className="dropdown-item">
                                            Not visible
                                        </a>
                                        <a className="dropdown-item">
                                            New seed
                                        </a>
                                        <a className="dropdown-item">
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
        this.setState({ checked: !this.state.checked })
    }

    clickToCreate = () => {
        this.props.history.push("/createCategory")
    }

    setHost = host => {
        this.setState({host});
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
                                                Not visible
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

                            <table className="table table-hover" style={{ backgroundColor: 'transparent', marginTop: '2%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col"><input type="checkbox" onClick={this.selectAll} /></th>
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
    return {
        catogoriesReducer: state.catogoriesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ viewCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);