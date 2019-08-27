import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetInitialCategory, GetParticularCategory, GetSubCategory, onSubmit } from '../../actions/createCategory';
import $ from 'jquery';
import HostResolver from '../../components/resolveHost/resolveHost';
class FileStructure extends Component{
        constructor(props){
            super(props);
            this.state={
                parent: null,
                host:''
            }
        }
        // componentDidMount() {
        //     this.props.GetInitialCategory();
        //     this.setState({ show: false, showSub: false });
        // }
        setHost=host=>{
            this.setState({host});
            this.props.GetInitialCategory(host);
            this.setState({ show: false, showSub: false });
        }
        push = (host,id) => {
            console.log('parent id',id)
            this.setState({ parent: id });
            this.props.GetParticularCategory(host,id);
            this.setState({ show: true });
        }
        getInitialCategory = ({ initialCategory }) => {
            if (initialCategory) {
                return initialCategory.category.map((item) => {
                
                    return (
                        <div id={item._id}><div className="fa fa-folder" onClick={() => this.push(this.state.host,item._id)} key={item._id} value={item._id}>
                            {item.name}</div></div>
                    )
                }
                )
            }
        }
        // getCategory = (id,host) => {
        //     console.log('edwed',id,host)
        //     this.setState({ parent: id, show: false, showSub: true });
        //     this.props.GetSubCategory(id,host);
        // }
        getParticularCategory = ({ getParticularCategory }) => {
            console.log('parent',getParticularCategory);
            if (getParticularCategory) {
                if ($(`#${this.state.parent}`).children().length !== 1) {
                    return true;
                }
                else {
                    getParticularCategory.map((item) => item.subCategories.map((item) => {
                        if (this.state.parent === item.parent) {    
                            // <div style={{marginLeft:'20px'}} onClick={()=>this.getsubCategory(item._id)} className="fa fa-folder">{item.name}</div>
                            $(`#${this.state.parent}`).append(`<div id=${item._id}><div key=${item._id}>
                        <i class="fa fa-folder ml-3"
                        name="getParticularCategory" />${item.name}
                        </div></div>`),
    
                                $(`#${item._id} > div`).click(() => this.getCategory(this.state.host,item._id));
    
                        }
                    }))
                }
            }
        }
        getCategory = (host,id) => {
            this.setState({ parent: id, show: false, showSub: true });
            this.props.GetSubCategory(host,id);
    
        }
        getSubCategory = ({ getSubCategory }) => {
            if (getSubCategory) {;
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
        }    
    render(){
        return(
            <HostResolver hostToGet="inventory" hostResolved={host => {
                this.setHost(host);
            }}>
            <div>
             {this.getInitialCategory(this.props.CreateCategory)}
               {this.state.show ? this.getParticularCategory(this.props.CreateCategory) : ''}
               {this.state.showSub ? this.getSubCategory(this.props.CreateCategory) : ''}
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


export default connect(mapStateToProps, mapDispatchToProps)(FileStructure);