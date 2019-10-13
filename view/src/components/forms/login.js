import React, { Component } from "react";
import {
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  LinearProgress
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import apiUrl from "../../apiUrl";
import apiRequest, {handleErrors} from "../../apiRequest";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      hideProgress: true,
      loginError: false
    };
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
      loginError: false
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
      loginError: false
    });
  }

  loginSubmit = (event) => {
    event.preventDefault();
    if (this.state.name === "" || this.state.password === "") {
      this.setState({
        loginError: true,
      });
      return;
    }
    this.setState({
      hideProgress: false
    });
    const data = JSON.stringify({
      name: this.state.name,
      password: this.state.password
    });
    apiRequest(apiUrl + "/users/login", "POST", data).then(handleErrors).then(result => {
      if (result.status === 500) {
        return;
      }
      result
        .json()
        .then(json => {
          this.setState({
            hideProgress: true
          });
          this.props.userLogIn(true, json.token, json.id, json.name);
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err => {
      this.setState({
        loginError: true,
        hideProgress: true
      })
    })
  }

  render() {
    document.title = "Login";
    return (
      <form onSubmit={this.loginSubmit} className="formpaper">
        {this.state.hideProgress ? "" : <LinearProgress />}
        <Paper className="formcontent">
          <Avatar className="avatarIcon">
            <Person />
          </Avatar>
          <div className="formHeading">
            <Typography variant="h5">Login</Typography>
          </div>
          <FormControl
            margin="normal"
            required
            fullWidth
            error={this.state.loginError}
          >
            <InputLabel htmlFor="name">Username: </InputLabel>
            <Input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleNameChange}
              autoComplete="name"
              required
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth error={this.state.loginError}>
            <InputLabel htmlFor="password">Password: </InputLabel>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              autoComplete="password"
              required
            />
          </FormControl>
          {this.state.loginError ? (
              <span style={{ display: "block", color: "red" }}>
                Invalid Username or Password
              </span>
            ) : (
              ""
            )}
          <Button
            className="formSubmit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{backgroundColor: '#2196f3'}}
          >
            LogIn
          </Button>
        </Paper>
      </form>
    );
  }
}
export default Login;
