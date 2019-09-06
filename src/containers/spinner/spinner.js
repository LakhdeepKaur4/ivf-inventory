import React from 'react';
import { connect } from 'react-redux';
import './spinner.css';

const spinner = ({showLoader}) => {
    if(showLoader){
        return (
        <div className="loader_backdrop">
            <div className="Loader">Loading...</div>
        </div>
        );
    }
    return null;
};

export default connect((state)=>{
    return {
        showLoader:state.LoaderReducer.showLoader
    }
})(spinner);