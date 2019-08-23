import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import $ from 'jquery';

class BlogSettings extends Component {
    constructor() {
        super();
        this.state = {
            startDate: new Date(),
        };
    }

    componentDidMount() {
        $('#file-upload').change(function () {
            $(this).prev('label').clone();
            var file = $('#file-upload')[0].files[0].name;
            $(this).prev('label').text(file);
        });
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <Dashboard>
                <div className="container containerBlogPost">
                    <h3 className='p-4' style={{ color: "#555555" }}>BLOG SETTINGS</h3>
                    <div className="row w-100">
                        <div className="col-5 pl-4">
                            <div className="col-12" style={{width:"200px"}}>
                                <div className="md-form border border-top-0 border-right-0 border-left-0 w-21 rounded-0 active-purple-2 mb-3">
                                    <h6 style={{ color: "#555555" }}>About</h6>
                                </div>
                                <div className="md-form border border-top-0 border-right-0 border-left-0  rounded-0 active-purple-2 mb-3">
                                    <h6 style={{ color: "grey" }}>Social</h6>
                                </div>
                                <div className="md-form border border-top-0 border-right-0 border-left-0  rounded-0 active-purple-2 mb-3">
                                    <h6 style={{ color: "grey" }}>Comments</h6>
                                </div>
                              
                              
                            </div>
                        </div>
                        <div className="col-5" style={{ color: "#43425D" }}>
                            <div className="col-12 ">
                                <div className="md-form active-purple-2 mb-3">
                                    <h6 style={{ color: "#555555" }}>About content</h6>
                                </div>
                                <div className="md-form active-purple-2 mb-3 row">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-12" type="text" style={{ backgroundColor: 'transparent' }} placeholder="Blog Title" />
                                </div>
                                <div style={{height:"22px"}}></div>
                                <div className="md-form active-purple-2 mb-3 row">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-12" type="text" style={{ backgroundColor: 'transparent' }} placeholder="Description" />
                                </div>
                                <div style={{height:"22px"}}></div>
                                <div className="md-form active-purple-2 mb-3 row">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-12" type="text" style={{ backgroundColor: 'transparent' }} placeholder="Blog Description" />
                                </div>
                                <div className="md-form active-purple-2 mb-3 row">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-12" type="text" style={{ backgroundColor: 'transparent' }} placeholder="url" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>

        )
    }



}

export default BlogSettings;