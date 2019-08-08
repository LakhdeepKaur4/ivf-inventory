import React, { Component } from 'react';
import { connect } from 'react-redux';
import './createCategory.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { bindActionCreators } from 'redux';
import { GetInitialCategory, GetParticularCategory, GetSubCategory, onSubmit } from '../../actions/createCategory';

import FileBase64 from 'react-file-base64';

import $ from 'jquery';

class ClassCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {

            name: '',

            url: '',
            editorChange:EditorState.createEmpty(),
            description: '',
            fileName: '',
            picture: '',
            pageTitle: '',
            metaDescription: '',
            Search: '',
            parent: null,
            subParent: '',
            show: false,
            showSub: false


        }
    }
    componentDidMount() {
        this.props.GetInitialCategory();
        this.setState({ show: false, showSub: false });
    }

    change = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state);
        this.setState({ show: false, showSub: false });
    }


    editorChange = (editorChange) => {
        let desc=draftToHtml(convertToRaw(this.state.editorChange.getCurrentContent()));
        console.log(desc);
        
        desc = desc.toString();
        desc = desc.slice(desc.indexOf(">") + 1);
        desc = desc.slice(0, desc.indexOf("<"));
        console.log(desc);

        this.setState({ editorChange,description:desc });
// console.log(this.state.description);
        this.setState({ show: false, showSub: false });

    }

    getFiles = (files) => {
        console.log(files);
        this.setState({ fileName: files[0].name, picture: files[0].base64 });
    }

    submit = () => {
        console.log(this.state);
        this.props.onSubmit({ ...this.state });
    }
    push = (id) => {

        console.log('initial', id);
        this.setState({ parent: id });
        this.props.GetParticularCategory(id);
        this.setState({ show: true });
    }

    getsubCategory = (id) => {
        console.log('edgvgdvggvdsdc', id);
        this.props.GetSubCategory(id);
        // this.setState({show:false,showSub:true});
        this.setState({ parent: id })

    }
    getInitialCategory = ({ initialCategory }) => {

        if (initialCategory) {

            console.log(initialCategory);
            return initialCategory.category.map((item) => {
            
                return (
                    <div id={item._id}><div className="fa fa-folder" onClick={() => this.push(item._id)} key={item._id} value={item._id}>
                        {item.name}</div></div>
                )
            }
            )
        }

    }

    getParticularCategory = ({ getParticularCategory }) => {

        console.log('dchvdcgd', getParticularCategory);
        if (getParticularCategory) {
            console.log($(`#${this.state.parent}`).children().length);
            if ($(`#${this.state.parent}`).children().length !== 1) {
                return true;
            }
            else {
                getParticularCategory.category.map((item) => item.subCategories.map((item) => {
                    if (this.state.parent === item.parent) {

                        // <div style={{marginLeft:'20px'}} onClick={()=>this.getsubCategory(item._id)} className="fa fa-folder">{item.name}</div>
                        $(`#${this.state.parent}`).append(`<div id=${item._id}><div key=${item._id}>
                    <i class="fa fa-folder ml-3"
                    name="getParticularCategory" />${item.name}
                    </div></div>`),

                            $(`#${item._id} > div`).click(() => this.getCategory(item._id));

                    }



                }))
            }
        }
    }
    getCategory = (id) => {
        console.log('clo');
        console.log("getCategory", id);
        this.setState({ parent: id, show: false, showSub: true });
        this.props.GetSubCategory(id);




    }
    getSubCategory = ({ getSubCategory }) => {
        console.log('badsvhycgbdashcbdsjcfvdsgcfdhcfsdhcvdscvsdncgvsdncdscgt', getSubCategory);
        if (getSubCategory) {
            console.log('badsvhycgbdashcbdsjcfvdsgcfdhcfsdhcvdscvsdncgvsdncdscgt', getSubCategory);
            if ($(`#${this.state.parent}`).children().length !== 1) {
                return true;
            }
            else {
                getSubCategory.category.map((item) => item.subCategories.map((item) => {
                    if (this.state.parent === item.parent) {
                        // <div style={{marginLeft:'30px'}}><input type="radio"/>{item.name}</div>
                        $(`#${this.state.parent}`).append(`<div key=${item._id}><i class="fa fa-folder ml-4"/>${item.name}</div>`);
                    }


                }))
            }

        }

    }

    render() {
        return (
            <div>

                <div className="m-auto p-5">
                    <div><b>Create Category</b></div>
                    <div className="row mt-3">
                        <div className="col-4">
                            <div>Info</div>
                            <div style={{ color: 'red', fontSize: '10px' }} className="mt-2">Name</div>
                            <div style={{ width: '280px' }}><input type="text" placeholder="Enter Info" name="name" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <div style={{ width: '280px' }}><input type="text" placeholder="URL" name="url" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                        </div>
                        <div className="col-4">
                            <div>Theme</div>
                            <div className="row mt-2">
                                <div className="col-6">Template Layout</div>
                                <div className="col-6"> <select className=" selectCreateCategory form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"></select></div>
                            </div>
                            <div className="row">
                                <div className="col-5 mt-2">Sort</div>
                                <div className="col-7 mt-2"><input style={{ width: '180px', marginLeft: '34px' }} type="text" placeholder="Enter Info" className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            </div>
                            <div className="row">
                                <div className="col-6 mt-3">Coteg Thumb</div>
                                <div className="col-6 mt-3"><FileBase64
                                    multiple={true}
                                    onDone={this.getFiles} /></div>
                                {/* <div className="col-6 mt-3"> <input type="file"name="fileName"  onChange={this.imageUpload}/></div> */}
                            </div>
                            <div className="row">
                                <div className="col-6 mt-3">Default Sort</div>
                                <div className="col-6 mt-3"><select className=" selectCreateCategory form-Ucontrol border border-top-0 border-right-0 border-left-0 border-dark rounded-0"></select></div>
                            </div>
                        </div>
                        <div style={{ marginLeft: '8%' }}>

                            <div>Meta (SEO)</div>
                            <div style={{ color: 'red', fontSize: '10px' }}>Page Title</div>
                            <div><input type="text" placeholder="Enter Info" name="pageTitle" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <div><input type="text" placeholder="Meta??" className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <div><input type="text" placeholder="Meta Desc" name="metaDescription" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <div><input type="text" placeholder="Search key" name="Search" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <div><button onClick={this.submit}>Submit</button></div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-8">Description</div>
                        <div className="col-3"><span style={{ marginLeft: '15px' }}>Parent</span></div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-8">
                            <Editor
                                editorState={this.state.editorChange}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.editorChange}
                                className="card bg-light"
                            />
                        </div>
                        <div className="col-4 card cardCreateCategory">
                            {this.getInitialCategory(this.props.CreateCategory)}

                            {this.state.show ? this.getParticularCategory(this.props.CreateCategory) : ''}
                            {this.state.showSub ? this.getSubCategory(this.props.CreateCategory) : ''}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        CreateCategory: state.CreateCategory
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        GetInitialCategory,
        GetParticularCategory,
        GetSubCategory,
        onSubmit
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassCategory);