import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetInitialCategory, GetParticularCategory, GetSubCategory, onSubmit } from '../../actions/createCategory';


class FileStructure extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

    }

    onActiveOpenedItemId = (id) => {
        if (this.props.showHiglighter) {
            this.setState({
                highlightedId: id
            });
        }
    }

    componentDidMount() {
        if (this.props.level <= (this.props.defaultOpenLevels||0)) {
            this.resolveItems();
        }
    }

    resolveItems = (e) => {
        if (e) {
            e.stopPropagation();
        }

        if (e && this.props.item && this.props.item._id) {
            this.props.onActiveOpenedItemId(this.props.item._id);
        }

        let host = this.props.host;
        if (this.props.level == 0) {
            this.props.GetInitialCategory(host);
        }
        else if (this.props.level == 1) {
            this.props.GetParticularCategory(host, this.props.item._id);
        }
        else if (this.props.level == 2) {
            this.props.GetSubCategory(host, this.props.item._id);
        }
    }

    renderChilds() {
        if (this.props.items && this.props.items.length) {
            let highlightedAction, highlightedId;
            if (this.props.level == 0) {
                highlightedAction = this.onActiveOpenedItemId;
                highlightedId = this.state.highlightedId;
            }
            else {
                highlightedAction = this.props.onActiveOpenedItemId;
                highlightedId = this.props.highlightedId;
            }
            return this.props.items.map(item => {
                return <FileStructure2
                    defaultOpenLevels={this.props.defaultOpenLevels}
                    onActiveOpenedItemId={highlightedAction}
                    highlightedId={highlightedId}
                    item={item}
                    level={this.props.level + 1}
                    host={this.props.host} />
            });
        }
    }

    renderSelf() {
        let showHighlighter = false;
        if (this.props.level != 0 && this.props.item &&
            this.props.highlightedId == this.props.item._id) {
            showHighlighter = true;
        }
        return (
            <React.Fragment>
                {this.props.item ? <div 
                    style={{marginLeft:this.props.level*10}}
                    className={`${this.props.level} folder-item fa fa-folder 
                        ${showHighlighter ? 'higlightStructure' : ''}`}
                        onClick={this.resolveItems}>
                        {this.props.item.name}                       
                </div> : null}
                {this.renderChilds()}
            </React.Fragment>

        );
    }

    render() {
        return (
            <div className="folder-container"
                style={{
                    paddingTop:this.props.level == 0?10:0
                }}>
                {this.renderSelf()}
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    let nextProps = {
    };
    switch (props.level) {
        case 0:
            if (state.CreateCategory.initialCategory) {
                nextProps.items = state.CreateCategory.initialCategory;
            }
            break;
        case 1:
            if (state.CreateCategory.getParticularCategory) {
                nextProps.items = state.CreateCategory.getParticularCategory[props.item._id];
            }
            break;
        case 2:
            if (state.CreateCategory.getSubCategory) {
                nextProps.items = state.CreateCategory.getSubCategory[props.item._id];
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