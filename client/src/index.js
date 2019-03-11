import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// import 'materialize-css/dist/css/materialize.min.css';
import 'typeface-roboto';
import authReducer from './reducers/authReducer';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import reduxThunk from 'redux-thunk';
import { combineReducers } from 'redux';


const reducers = combineReducers({
    auth: authReducer
});

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const app = (<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
