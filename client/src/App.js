import React, { Component } from 'react';
// import classes from './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import Signup from './components/Authentications/Signup/Signup';
import Signin from './components/Authentications/Signin/Signin';
import NewPost from './components/loggedInComponents/NewPost/NewPost';
import NewStory from './components/loggedInComponents/NewStory/NewStory';
import AddFrnd from './components/loggedInComponents/AddFrnd/AddFrnd';
import Home from './components/Home/Home';

// import NavigationItems from './components/Navigation/NavigationItems';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

const posts = () => (<div>Posts</div>);
const newPost = () => (<div>newPost</div>);

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
    // console.log(1);
  }


  render() {

    
    return (
      <div>
        <Route path="/" exact component={Home}></Route>
        {/* <Route path="/posts/new" exact component={newPost}></Route> */}
        {/* <Route path="/posts" exact component={posts}></Route> */}
        <Route path="/signup" component={Signup}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/newPost" component={NewPost}></Route>
        <Route path="/newStory" component={NewStory}></Route>
        <Route path="/addFrnd" component={AddFrnd}></Route>
      </div>
    );
  }

}

export default connect(null, actions)(App);
