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
            title="Matematika"
            onClick={() => this.props.history.push("/matematika")}
          />
          <Card title="Fisika" />
          <Card title="Kimia" />
          <Card title="Biologi" />
        </DashboardCards>
      </Dashboard>
    );
  }
}
