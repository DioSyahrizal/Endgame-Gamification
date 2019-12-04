import React, { Component } from "react";
import { Dashboard } from "@kata-kit/dashboard";
import { Button } from "semantic-ui-react";

export default class Dashboardmain extends Component {
  render() {
    return (
      <Dashboard title="Dashboard">
        Halo halo <Button>Click Meh!</Button>
      </Dashboard>
    );
  }
}
