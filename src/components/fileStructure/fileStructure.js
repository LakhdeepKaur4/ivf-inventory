import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetInitialCategory, GetParticularCategory, GetSubCategory, onSubmit } from '../../actions/createCategory';
import $ from 'jquery';


class FileStructure extends Component{

        constructor(props){
            super(props);

            this.state={
                parent:''
            }
        }

        componentDidMount() {
            this.props.GetInitialCategory();
            this.setState({ show: false, showSub: false });
        }

        push = (id) => {

            console.log('initial', id);
            this.setState({ parent: id });
            this.props.GetParticularCategory(id);
            this.setState({ show: true });
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
        getCategory = (id) => {
            console.log('clo');
            console.log("getCategory", id);
            this.setState({ parent: id, show: false, showSub: true });
            this.props.GetSubCategory(id);
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

    render(){
        return(
            <div>
               {this.getInitialCategory(this.props.CreateCategory)}
               {this.state.show ? this.getParticularCategory(this.props.CreateCategory) : ''}
               {this.state.showSub ? this.getSubCategory(this.props.CreateCategory) : ''}
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


export default connect(mapStateToProps, mapDispatchToProps)(FileStructure);