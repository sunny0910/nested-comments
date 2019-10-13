import React, { Component } from "react";
import {
  Paper,
  InputLabel,
  Button,
  Input,
  FormControl,
  Typography,
  LinearProgress
} from "@material-ui/core";
import apiRequest from "../../apiRequest";
import apiUrl from "../../apiUrl";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      passwordError: false,
      hideProgress: true,
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value, passwordError: false });
  }

  registerSubmit = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.password === "" || this.state.passwordError) {
      this.setState({
        passwordError: true
      });
      return
    }
    this.setState({
      hideProgress: false
    });
    const data = JSON.stringify({
      name: this.state.name,
      password: this.state.password,
    });
    apiRequest(apiUrl + "/users/signup", "POST", data).then(result => {
      if (result.status === 409) {
        this.setState({
          passwordError: true,
          hideProgress: true
        });
        return;
      }
      if (result.status === 500) {
        this.setState({
          hideProgress: true
        });
        return;
      }
      result
        .json()
        .then(json => {
          this.setState({
            hideProgress: true,
            jwtToken: json.token
          });
          this.props.userLogIn(true, json.token, json.id, json.name);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  render() {
    document.title = "Register";
    return (
      <form onSubmit={this.registerSubmit} className="formpaper">
        {this.state.hideProgress ? "" : <LinearProgress />}
        <Paper className="formcontent">
          <div className="formHeading">
            <Typography variant="h5">Register</Typography>
          </div>
          <FormControl
            margin="normal"
            required
            fullWidth
            error={this.state.passwordError}
          >
            <InputLabel htmlFor="name">Username</InputLabel>
            <Input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleNameChange}
              autoComplete="name"
              required
            />
          </FormControl>

          <FormControl
            margin="normal"
            required
            fullWidth
            error={this.state.passwordError}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
            {this.state.passwordError ? (
              <span style={{ display: "block", color: "red" }}>
                Username Already Used!
              </span>
            ) : (
              ""
            )}
          </FormControl>
          <Button
            className="formSubmit "
            type="submit"
            color="primary"
            variant="contained"
            style={{backgroundColor: '#2196f3'}}
            fullWidth
          >
            Register
          </Button>
        </Paper>
      </form>
    );
  }
}
