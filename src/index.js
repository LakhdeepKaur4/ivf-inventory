import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import{Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import promise from 'redux-promise'; 
import createSagaMiddleware from 'redux-saga';
import thunk from "redux-thunk";

// Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropzone-uploader/dist/styles.css'

const sagaMiddleware = createSagaMiddleware()

const store= applyMiddleware(promise,sagaMiddleware,thunk)(createStore)

ReactDOM.render( 
    <Provider store={store(rootReducer)}>
            <App/>    
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA