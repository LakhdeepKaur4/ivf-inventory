import React, { Component } from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import './blogPost.css';
import $ from 'jquery';
import HostResolver from '../../components/resolveHost/resolveHost';

class BlogPost extends Component {
    constructor() {
        super();
        this.state = {
            startDate: new Date(),
            host: ''
        };
    }

    componentDidMount() {
        console.log(React.version)
        $('#file-upload').change(function () {
            var i = $(this).prev('label').clone();
            var file = $('#file-upload')[0].files[0].name;
            $(this).prev('label').text(file);
        });
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    setHost = async host => {
        await this.setState({ host });
    }

    render() {
        return (
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host)
            }}>
            <Dashboard>
                <div className="container containerBlogPost">
                    <h3 className='p-4' style={{ color: "#555555" }}>BLOG POST</h3>
                    <div className="row w-100">
                        <div className="col-6">
                            <div className="col-12" >
                                <div className="md-form active-purple-2 mb-3">
                                    <h6 style={{ color: "#555555" }}>Create</h6>
                                </div>
                                <div className="md-form active-purple-2 mb-3">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"
                                        type="text" style={{ backgroundColor: 'transparent' }} placeholder="Title" />
                                </div>
                                <div style={{ height: "54px" }}></div>
                                <div className="md-form active-purple-2 mb-3">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} placeholder="Body" />
                                </div>
                                <div className="md-form active-purple-2 mb-3">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" type="text" style={{ backgroundColor: 'transparent' }} placeholder="Author" />
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="md-form active-purple-2 mb-3 col-6 pl-4">
                                            <label style={{ color: "#555555" }}>Post Thumbnail</label>
                                        </div>
                                        <div className="md-form active-purple-2 mb-3 col-6">
                                            <label for="file-upload" className="custom-file-upload">CHOOSE</label>
                                            <label className="ml-2" style={{color:"#888888"}}></label>
                                            <input id="file-upload" type="file" />
                                        </div>
                                     </div>
                                     <div>
                                            <button className="btn btn-secondary btnCreate pl-5 pr-5 rounded-pill " type="submit">Post</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6" style={{ color: "#43425D" }}>
                            <div className="col-12">
                                <div className="md-form active-purple-2 mb-3">
                                    <h6 style={{ color: "#555555" }}>SEO</h6>
                                </div>
                                <div className="md-form active-purple-2 mb-3 row">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-12" type="text" style={{ backgroundColor: 'transparent' }} placeholder="Post URL" />
                                </div>
                                <div className="md-form active-purple-2 mb-3 row">
                                    <input className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 col-12" type="text" style={{ backgroundColor: 'transparent' }} placeholder="Post Meta D" />
                                </div>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>
            </HostResolver>
        )
    }



}

export default BlogPost;