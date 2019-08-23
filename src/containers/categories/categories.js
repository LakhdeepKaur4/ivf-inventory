import React, { Component } from 'react'
import Pagination from 'react-js-pagination';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { viewCategory } from '../../actions/categoriesAction';
import Dashboard from '../../components/dashboard/dashboard';
import './categories.css';

class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            filterName: "customer",
            activePage: '1',
            limit: '5',
            totalItemsCount: '',
            checked:false
        }
    }

    componentDidMount() {
        this.props.viewCategory();
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    categoryResult = ({ categoryData }) => {
        if (categoryData) {
            console.log("=-====================",categoryData)
            return categoryData.categories.map(item => {
                return item.items.map(data => {
                return (
                    <tr key={item.id}>
                        <td><input type="checkbox" checked={this.state.checked}></input></td>
                        <td>{item.name}</td>
                        <td>{data}</td>
                        <td>{item.count}</td>
                        {(item.status === true) ? <td style={{ color: "#1ABC9C" }}>Visible</td> : <td style={{ color: "#F46565" }}>Not Visible</td>}
                        <td>
                        <div className="category_actions" style={{marginLeft:'3%'}}>
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
        })
        }
    }
    selectAll=()=>{
        this.setState({checked:!this.state.checked})
    }

    clickToCreate=()=>{
        this.props.history.push("/createCategory")
    }

    render() {
        return (
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
                                                <i class="fa fa-angle-down" aria-hidden="true" style={{paddingLeft :'12px', color:'#777777'}}></i>
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
                                
                            <i className="fa fa-plus" style={{ marginLeft: '3%', marginTop: '1%', color:'#777777' }}>
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
                                    <th scope="col"><input type="checkbox" onClick={this.selectAll}/></th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Products</th>
                                    <th scope="col">PROD IN SC</th>
                                    <th scope="col">Visible</th>
                                    <th scope="col">Actions</th>
                                    <th scope="col">
                                        <div className="category_actions" >
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

                                    <div className="dropdown-menu" aria-labelledby="dropdownActionMenu" style={{marginLeft:'4%'}}>
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
        )
    }  
}

function mapStateToProps(state) {
    console.log(state)
    return {
        catogoriesReducer: state.catogoriesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ viewCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);