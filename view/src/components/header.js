import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div id="header">
        <AppBar color="primary" position="fixed">
          <Toolbar variant="dense">
            <div className="menu">
              <div className="menu-items-wrapper">
                <div className="menu-items" id="posts">
                  <Link to="/">
                    <Typography color="inherit" variant="button">
                      Posts
                    </Typography>
                  </Link>
                </div>
                {this.props.loggedIn ? (
                  <div className="menu-items login">
                    <Link to="/logout" onClick={this.props.logOut}>
                      <Typography color="inherit" variant="button">
                        Logout
                      </Typography>
                    </Link>
                  </div>
                ) : (
                  <React.Fragment>
                    <div className="menu-items login">
                      <Link to="/login">
                        <Typography color="inherit" variant="button">
                          Login
                        </Typography>
                      </Link>
                    </div>
                    <div className="menu-items login">
                      <Link to="/register">
                        <Typography color="inherit" variant="button">
                          Register
                        </Typography>
                      </Link>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
