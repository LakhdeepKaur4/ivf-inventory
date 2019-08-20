import React, { Component } from "react";
import './CreatePage.css';
import Dashboard from "../../components/dashboard/dashboard";
import $ from 'jquery';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

class CreatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorChange:EditorState.createEmpty(),
            }
    }

    componentDidMount() {
        $(function () {
            $('textarea#eg-textarea').editable({
                inlineMode: false
            })
        });
    }

    editorChange = (editorChange) => {
        let desc=draftToHtml(convertToRaw(this.state.editorChange.getCurrentContent()));   
        desc = desc.toString();
        desc = desc.slice(desc.indexOf(">") + 1);
        desc = desc.slice(0, desc.indexOf("<"));
        this.setState({ editorChange,description:desc });
        this.setState({ show: false, showSub: false });
    }

    render() {
        return (
            <div>
                <Dashboard>
                   <div>
                       <h3>CREATE PAGE</h3>
                   </div>
                   <div className="pageDesc mt-3">
                       <h6>[Page Description]</h6>
                       <p>[Subtitle]</p>
                   </div>
                    <div className="row">
                        <div className="col-md-2">
                            <h5>Other Meta</h5>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="pagetitle" placeholder="Place title" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="keywords" placeholder="keywords" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="description" placeholder="Description" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="keywords" placeholder="s. keywords" />
                            </div>
                            <div className="md-form active-purple-2 mb-3">
                                <select className="templateLayout form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0 " style={{ backgroundColor: '#F2F4F7' }} type="select">
                                    <option style={{ backgroundColor: "red" }}>Template Layout</option>
                                </select>
                                <i className="fa fa-angle-down"></i>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="displayashome" />
                                <label class="form-check-label" for="displayhome">
                                    Display as home
                                </label>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <h5>Link</h5>
                        </div>    
                        <div className="col-md-5">
                            <div>
                                <input type="radio" id="huey" name="drone" value="huey" className="radioInput" />
                                <label className="radioLabel" for="huey">Content from editor below</label>
                            </div>

                            <div>
                                <input type="radio" id="dewey" name="drone" value="dewey" className="radioInput" />
                                <label className="radioLabel" for="dewey">Link to website or doc</label>
                            </div>

                            <div>
                                <input type="radio" id="louie" name="drone" value="louie" className="radioInput"/>
                                <label className="radioLabel" for="louie">Display content from RSS</label>
                            </div>
                            <div>
                                <input type="radio" id="louie" name="drone" value="louie" className="radioInput"/>
                                <label className="radioLabel" for="louie">Allow people to send questions/comments via...                           </label>
                            </div>
                            <div>
                                <input type="radio" id="louie" name="drone" value="louie" className="radioInput"/>
                                <label className="radioLabel" for="louie">Contain raw HTML entered in the textarea below</label>
                            </div>
                        </div>
                        </div>
                            <div>
                                <h5>Web Page Details</h5>
                            </div>
                            <div className="col-md-6 ml-5">
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="pagetitle" placeholder="Page title" />
                                    </div>
                                    <div className='col-sm-2 vt-center'>
                                        <div className="tip">
                                        (?)
                                            <span className='tiptext'>help text</span>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="keywords" placeholder="Page Url" />
                                    </div>
                                    <div className='col-sm-2 vt-center'>
                                        <div className="tip">
                                        (?)
                                            <span className='tiptext'>help text</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <textarea type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="description" placeholder="Content" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="keywords" placeholder="Page n zone" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" id="keywords" placeholder="URL" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5>Page content</h5>
                            </div>
                    <div className="row mt-3">
                        <div className="col-8 ml-5">
                            <Editor
                                editorState={this.state.editorChange}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.editorChange}
                                className="card bg-light"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                             <h5>Navigation menu option</h5>
                        </div>
                        <div className="col-md-7">
                            <div>
                                <input className="radioInput" type="checkbox" />
                                <label className="radioLabel">Nav Menu</label>
                                <span className="m-3">(show this in nav)</span>
                                <div className='tip'>(?)
                                    <span className='tiptext'>help text</span>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-md-3">
                             
                        </div>
                        <div className="col-md-6">
                            <h6>Parent page</h6>
                        <div>
                            <input className="radioInput" type="checkbox" />
                            <label className="radioLabel">None</label>
                        </div>
                        <div>
                            <input className="radioInput" type="checkbox" />
                            <label className="radioLabel">Blog</label>
                        </div>
                        <div>
                            <input className="radioInput" type="checkbox" />
                            <label className="radioLabel">Contact us</label>
                        </div>
                        <div>
                            <input className="radioInput" type="checkbox" />
                            <label className="radioLabel">Home</label>
                        </div>
                        <div>
                            <input className="radioInput" type="checkbox" />
                            <label className="radioLabel">Shop</label>
                        </div>
                        <div>
                            <input className="radioInput" type="checkbox" />
                            <label className="radioLabel">Nav Menu</label>
                        </div>
                        </div>
                    </div>
                </Dashboard>
            </div>
        );
    }
}

export default CreatePage;
