import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetInitialCategory, GetParticularCategory, GetSubCategory, onSubmit } from '../../actions/createCategory';
import HostResolver from '../../components/resolveHost/resolveHost';


class FileStructure extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen:false
        };
    }

    componentDidMount(){
        this.resolveItems();
    }

    resolveItems(){
        let host = this.props.host;
        if(this.props.level == 0){
            this.props.GetInitialCategory(host);
        }
        else if(this.props.level == 1){
            this.props.GetParticularCategory(host,this.props.item._id);
        }
        else if(this.props.level == 2){
            this.props.GetSubCategory(host,this.props.item._id);
        }
    }

    renderChilds() {
        if(this.props.items && this.props.items.length){
            return this.props.items.map(item=>{
                return <FileStructure2 
                    item={item} 
                    level={this.props.level + 1} 
                    host={this.props.host} />
            });
        }
    }

    renderSelf() {
        return (
            <div>
                {this.props.item?<div className="fa fa-folder"
                onClick={this.reso}
                >{this.props.item.name}</div>:null}
                {this.renderChilds()}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderSelf()}
            </div>
        );
    }
}

function mapStateToProps(state,props) {
    let nextProps = {
    };
    switch(props.level){
        case 0: 
            if(state.CreateCategory.initialCategory){
                nextProps.items = state.CreateCategory.initialCategory;
            }
            break;
        case 1:
            if(state.CreateCategory.GetParticularCategory){
                nextProps.items = state.CreateCategory.GetParticularCategory[props.item._id];
            }            
            break;
        case 2:
            if(state.CreateCategory.GetSubCategory){
                nextProps.items = state.CreateCategory.GetSubCategory[props.item._id];
            }
            break;
        default:
            nextProps.items = [];
    }
   return nextProps;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        GetInitialCategory,
        GetParticularCategory,
        GetSubCategory,
        onSubmit
    }, dispatch)
}


const FileStructure2 = connect(mapStateToProps, mapDispatchToProps)(FileStructure);
export default FileStructure2;