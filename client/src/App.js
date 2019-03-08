import React, { Component } from 'react';
// import classes from './App.css';


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import Signup from './components/Authentications/Signup/Signup';
import Signin from './components/Authentications/Signin/Signin';
import GuestHome from './components/GuestHome/GuestHome';
// import NavigationItems from './components/Navigation/NavigationItems';

import { Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <div>
          <Route path="/" component={GuestHome}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/signin" component={Signin}></Route>
      </div>
    );
  }

}

export default App;
