import React, { Component } from 'react';

import Signup from './components/Authentications/Signup/Signup';
import Signin from './components/Authentications/Signin/Signin';
import NewPost from './components/loggedInComponents/NewPost/NewPost';
import NewStory from './components/loggedInComponents/NewStory/NewStory';
import AddFrnd from './components/loggedInComponents/AddFrnd/AddFrnd';
import Home from './components/Home/Home';
import MyPosts from './components/loggedInComponents/Posts/MyPosts';
import Chat from './components/loggedInComponents/Chat/Chat';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';



class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={Home}></Route>
        <Route path="/newPost" exact component={NewPost}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/myPosts" exact component={MyPosts}></Route>
        <Route path="/newStory" component={NewStory}></Route>
        <Route path="/addFrnd" component={AddFrnd}></Route>
      </div>
    );
  }
}

export default connect(null, actions)(App);
