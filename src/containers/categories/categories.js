import React, { Component } from 'react'
import Pagination from 'react-js-pagination';
import Dashboard from '../../components/dashboard/dashboard';

class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            filterName: "customer",
            activePage: '1',
            limit: '5',
            totalItemsCount: ''
        }
    }

    render() {
        return (
            <div>
                <Dashboard>
                <h1 style={{ margin: '6% 22% 2% 4%' }}> Categories</h1>
                <p style={{ margin: '2% 38% 4% 4%', fontSize: '16px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
but also the leap into electronic typesetting, remaining essentially unchanged.</p>

                <div>
                    <label style={{ marginLeft: '4%', fontSize: '18px' }}>Actions</label><i class="fa fa-sort-desc" style={{ marginLeft: '1%', marginTop: '1%' }}></i>
                    <i class="fa fa-plus" style={{ marginLeft: '3%', marginTop: '1%' }}></i><label style={{ marginLeft: '1%', fontSize: '18px' }}>Create</label>

                    <div style={{ float: 'right', marginRight: '2%', color: 'black' }}>
                        <Pagination activePage={this.state.activePage}
                            itemsCountPerPage={this.state.limit}
                            totalItemsCount={this.state.totalItemsCount}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClasss='page-link' />
                    </div>
                </div>
                <table class="table table-hover" style={{ marginLeft: '4%', backgroundColor: 'transparent', marginTop: '2%' }}>
                    <thead>
                        <tr>
                            <th scope="col">Select</th>
                            <th scope="col">Name</th>
                            <th scope="col">Products</th>
                            <th scope="col">PROD IN SC</th>
                            <th scope="col">??????</th>
                            <th scope="col">Actions</th>
                            <th scope="col">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>32</td>
                            <td>Donald</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>22</td>
                            <td>George</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>54</td>
                            <td>John</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>76</td>
                            <td>Jeff</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>55</td>
                            <td>Audrey</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>21</td>
                            <td>Neil</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>64</td>
                            <td>Jason</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <th scope="row"><input type='checkbox' /></th>
                            <td>Striped gangsta sheet pants,casual wear,red black,XL</td>
                            <td>SN25</td>
                            <td>29</td>
                            <td>Jade</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
                </Dashboard>
            </div>

        )
    }
}
export default AddCategory;