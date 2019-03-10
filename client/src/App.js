import React, { Component } from 'react';
// import classes from './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import Signup from './components/Authentications/Signup/Signup';
import Signin from './components/Authentications/Signin/Signin';
import GuestHome from './components/GuestHome/GuestHome';

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
        <Route path="/landing" component={GuestHome}></Route>
        <Route path="/posts/new" exact component={newPost}></Route>
        <Route path="/posts" exact component={posts}></Route>
        <Route path="/landing/signup" component={Signup}></Route>
        <Route path="/landing/signin" component={Signin}></Route>
      </div>
    );
  }

}

export default connect(null, actions)(App);
