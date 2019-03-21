import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// import 'materialize-css/dist/css/materialize.min.css';
import 'typeface-roboto';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducer';
import usersReducer from './reducers/usersReducer';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import reduxThunk from 'redux-thunk';
import { combineReducers } from 'redux';
import frndReqReducer from './reducers/frndReqReducer';
import dashboardPostsReducer from './reducers/dashboardPostsReducer';
import myFriendsReducer from './reducers/myFriendsReducer';


const reducers = combineReducers({
    auth: authReducer,                                  //state.auth      
    posts: postsReducer,                                //state.posts
    users: usersReducer,                                //state.users
    frndReq: frndReqReducer,                            //state.frndReq           
    dashboardPosts: dashboardPostsReducer,              //state.dashboardPosts
    myFriends: myFriendsReducer
});

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));                   //Store created from reducers

const app = (<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
