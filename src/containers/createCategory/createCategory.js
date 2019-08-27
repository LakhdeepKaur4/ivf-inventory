import React, { Component } from 'react';
import { connect } from 'react-redux';
import './createCategory.css';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { bindActionCreators } from 'redux';
import { GetInitialCategory, GetParticularCategory, GetSubCategory, onSubmit } from '../../actions/createCategory';
import FileStructure from '../../components/fileStructure/fileStructure';
import FileBase64 from 'react-file-base64';
import $ from 'jquery';
import Dashboard from '../../components/dashboard/dashboard';
import HostResolver from '../../components/resolveHost/resolveHost';
import axios from 'axios';

class ClassCategory extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            url: '',
            editorChange: EditorState.createEmpty(),
            description: '',
            fileName: '',
            picture: '',
            pageTitle: '',
            metaDescription: '',
            Search: '',
            file:'',
            parent: null,
            subParent: '',
            show: false,
            showSub: false,
            errors:{},
            host:'',
            _id:props.match.params.id
        }

    }
    
    // componentDidMount() { 
    //     console.log(this.state._id)
    //     this.props.GetInitialCategory();
    //     this.setState({ show: false, showSub: false });
    //     $('#file-upload').change(function () {
    //         var i = $(this).prev('label').clone();
    //         var file = $('#file-upload')[0].files[0].name;
    //         $(this).prev('label').text(file);
    //     });
        
    //     if(this.state._id) {
    //         const request = axios.get(`${this.state.host}/api/category/${this.state._id}`)
    //         .then( response => console.log(response.data))
    //     }
    // }

    setHost = host => {
        this.setState({host});
        this.props.GetInitialCategory();
        this.setState({ show: false, showSub: false });
        $('#file-upload').change(function () {
            var i = $(this).prev('label').clone();
            var file = $('#file-upload')[0].files[0].name;
            $(this).prev('label').text(file);
        });
        
        if(this.state._id) {
            const request = axios.get(`${this.state.host}/api/category/${this.state._id}`)
            .then( response => console.log(response.data))
        }
    }

    change = (e) => {
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
            this.setState({ show: false, showSub: false });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
             this.setState({ show: false, showSub: false });
        }
    }

    editorChange = (editorChange) => {
        this.state.errors.description='';
        let desc = draftToHtml(convertToRaw(this.state.editorChange.getCurrentContent()));
        desc = desc.toString();
        desc = desc.slice(desc.indexOf(">") + 1);
        desc = desc.slice(0, desc.indexOf("<"));
        this.setState({ editorChange, description: desc });
        this.setState({ show: false, showSub: false });
    }
    getFiles = (files) => {
        this.setState({ fileName: files[0].name, picture: files[0].base64 });
    }
    submit = () => {
        let errors={};
        if(this.state.name=='') errors.name='Please enter name';
        if(this.state.url=='') errors.url='Please enter URL';
        if(this.state.Search=='') errors.Search='Please enter Search Key';
        if(this.state.metaDescription=='') errors.metaDescription='Please enter Search Key';
        if(this.state.pageTitle=='') errors.pageTitle='Please enter Search Key';
        if(this.state.description=='') errors.description='Please enter desciption'; 
        if(this.state.file=='') errors.file='Please attach a file';       
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            console.log('hii');
            // this.props.onSubmit({ ...this.state });
        }
    }
    push = (id) => {
        console.log('catgryid', id)
        this.setState({ parent: id });
        this.props.GetParticularCategory(id);
        this.setState({ show: true });

    }
    getInitialCategory = ({ initialCategory }) => {
        console.log(initialCategory);
        if (initialCategory) {
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
        console.log('getParticularCategory', getParticularCategory)
        if (getParticularCategory) {
            if ($(`#${this.state.parent}`).children().length !== 1) {
                return true;
            }
            else {
                getParticularCategory.map((item) =>  item.subCategories.map((item) => {
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
        return true;
    }
    getCategory = (id) => {
        this.setState({ parent: id, show: false, showSub: true });
        this.props.GetSubCategory(id);
    }
    getSubCategory = ({ getSubCategory }) => {
        console.log('getSubCategory',getSubCategory)
        if (getSubCategory) {
            if ($(`#${this.state.parent}`).children().length !== 1) {
                return true;
            }
            else {
                getSubCategory.map((item) => item.subCategories.map((item) => {
                    if (this.state.parent === item.parent) {
                        // <div style={{marginLeft:'30px'}}><input type="radio"/>{item.name}</div>
                        $(`#${this.state.parent}`).append(`<div key=${item._id}><i class="fa fa-folder ml-4"/>${item.name}</div>`);
                    }
                }))
            }
        }
        return;
    }
    fileAttach=()=>{
        this.st
    }
    render() {
        return (
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host);
            }}>
            <div>
                <Dashboard>
                <div className="m-auto">
                    <div><b>Create Category</b></div>
                    <div className="row ">
                        <div className="col-4">
                            <div>Info</div>
                            <div style={{ color: 'red', fontSize: '10px' }} className="mt-2">Name</div>
                            <div><input type="text" placeholder="Enter Info" name="name" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <span style={{color: "red"}}>{this.state.errors.name}</span>
                            <div><input type="text" placeholder="URL" name="url" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <span style={{color: "red"}}>{this.state.errors.url}</span>
                        </div>
                        <div className="col-4">
                            <div>Theme</div>
                            <div className="row ">
                                <div className="col-6">Template Layout</div>
                                <div className="col-6"> <select className=" selectCreateCategory form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"><option>default</option></select></div>
                            </div>
                            <div className="row">
                                <div className="col-6">Sort</div>
                                <div className="col-6"><input type="text" placeholder="Enter Info" className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">Coteg Thumb</div>
                                <div className="col-6">
                                <div className="md-form ">
                                            <label for="file-upload" className="custom-file-upload">CHOOSE</label>
                                            {/* {/ <label className="ml-2" style={{color:"#888888"}}></label> /} */}
                                            <input id="file-upload" type="file" onClick={this.fileAttach} />
                                            {/* <div><span style={{color:'red'}}>{this.state.errors.file}</span></div> */}
                                        </div></div>
                                {/* <div className="col-6 mt-3"> <input type="file"name="fileName"  onChange={this.imageUpload}/></div> */}
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">Default Sort</div>
                                <div className="col-6 "><select className=" selectCreateCategory form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0"><option>default</option></select></div>
                            </div>
                        </div>
                        <div className="col-4 ">

                            <div>Meta (SEO)</div>
                            <div style={{ color: 'red', fontSize: '10px' }}>Page Title</div>
                            <div><input type="text" placeholder="Enter Info" name="pageTitle" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <span style={{color: "red"}}>{this.state.errors.pageTitle}</span>
                            <div><input type="text" placeholder="Meta??" className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <div><input type="text" placeholder="Meta Desc" name="metaDescription" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <span style={{color: "red"}}>{this.state.errors.metaDescription}</span>
                            <div><input type="text" placeholder="Search key" name="Search" onChange={this.change} className=" form-control border border-top-0 border-right-0 border-left-0 border-dark rounded-0" /></div>
                            <span style={{color: "red"}}>{this.state.errors.Search}</span>
                            <div><button style={{marginTop:'5px'}}onClick={this.submit}>Submit</button></div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-8">Description <span style={{color: "red"}}>{this.state.errors.description}</span></div>
                        <div className="col-3"><span>Parent</span></div>
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
                </Dashboard>
            </div>
            </HostResolver>
        )
    }
}
function mapStateToProps(state) {
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