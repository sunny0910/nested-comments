import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/post';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import getDataFromCookie from "./getDataFromCookie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: getDataFromCookie("userId") === "" ? false : true,
      userId: getDataFromCookie("userId"),
      // userRoleId: getDataFromCookie("userRoleId"),
      jwtToken: getDataFromCookie("token"),
      // serverError: false,
      // unAuthorised: false,
      // productsInCartCount: getDataFromCookie("productsInCartCount"),
      // productsInCart: getDataFromCookie("productsInCart"),
      // roles: []
    };
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Router>
          <Switch>
            <Route
              exact
              path = "/"
              render = {() => (<Post/>)}
            />
            <Route
              exact
              path = "/login"
            />
            <Route
              exact
              path = "/register"
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
