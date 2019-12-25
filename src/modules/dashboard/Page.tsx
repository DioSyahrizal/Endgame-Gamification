import React, { Component } from "react";
import { Dashboard, DashboardCards } from "@kata-kit/dashboard";
import { Card } from "@kata-kit/card";
import { RouteComponentProps } from "react-router";

export default class Dashboardmain extends Component<RouteComponentProps> {
  render() {
    return (
      <Dashboard
        title="Dashboard"
        isStarter
        headerContent={<p>Gamification at Primagama</p>}
      >
        <DashboardCards>
          <Card
            title="Fisika"
            onClick={() => this.props.history.push("/fisika")}
          />
          <Card title="Kimia" />
        </DashboardCards>
      </Dashboard>
    );
  }
}
