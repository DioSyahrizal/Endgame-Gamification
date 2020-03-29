import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import Login from "./login/Login.Container";
import Register from "./register/register";

export default class Page extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Fragment>
    );
  }
}
