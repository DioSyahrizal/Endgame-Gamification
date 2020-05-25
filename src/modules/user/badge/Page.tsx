import React, { Component, Fragment } from "react";
import HeaderContainer from "modules/core/profile/Header";
import { Dashboard } from "@kata-kit/dashboard";

export default class Page extends Component {
  render() {
    return (
      <Fragment>
        <Dashboard
          title="Badge"
          floatingElements={
            <Fragment>
              <HeaderContainer color="black" />
            </Fragment>
          }
        >
          <h3>My Badge</h3>
        </Dashboard>
      </Fragment>
    );
  }
}
