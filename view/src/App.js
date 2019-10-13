import React, {Component} from 'react';
import Header from './components/header';
import './App.css';
import Post from './components/post';
import Login from './components/forms/login';
import Register from './components/forms/register';
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
      jwtToken: getDataFromCookie("token")
    };
  }

  userLogIn = (loggedIn, token, id, name) => {
    this.setState({
      userId: id,
      loggedIn: loggedIn,
      jwtToken: token
    });
    document.cookie = "token=" + token + "; path=/";
    document.cookie = "userId=" + id + "; path=/";
    document.cookie = "name=" + name + "; path=/";
    return true;
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      userId: 0,
      jwtToken: "",
    });
    document.cookie = "token =; expires = 01-10-1995; path=/;";
    document.cookie = "userId =; expires = 01-10-1995; path=/;";
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header loggedIn={this.state.loggedIn}
              logOut={this.logOut} />
          <Switch>
            <Route
              exact
              path = "/"
              render = {() => (<Post loggedIn = {this.state.loggedIn}/>)}
            />
            <Route
              exact
              path = "/login"
              render = {() => this.state.loggedIn ? (<Redirect to="/" />):(<Login userLogIn = {this.userLogIn}/>)}
            />
            <Route
              exact
              path = "/register"
              render = {() => this.state.loggedIn ? (<Redirect to="/" />):(<Register userLogIn={this.userLogIn} />)}
            />
            <Route
              exact
              path = "/logout"
              render = {() => this.state.loggedIn ? this.logOut() : <Redirect to="/" />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
