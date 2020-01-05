import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "semantic-ui-react";
import dashboardLogo from "assets/image/dashboard.svg";

import {
  Dashboard as KataDashboard,
  DashboardCards,
  DashboardContentHeader
} from "@kata-kit/dashboard";
import { Card } from "@kata-kit/card";

import { Header } from "modules/core/Header";
import { AccountSelectorWrapper } from "./components";
import styled from "styled-components";

const Dashboard = styled(KataDashboard)`
  img {
    width: 426px;
    height: 240px;
  }
`;

export default class Dashboardmain extends Component<RouteComponentProps> {
  render() {
    return (
      <Fragment>
        <Container style={{ position: "relative" }}>
          <AccountSelectorWrapper>
            <Header color="white" />
          </AccountSelectorWrapper>
        </Container>
        <Dashboard
          title="Gamification Primagama"
          isStarter
          image={dashboardLogo}
          headerContent={<p>Learn with Game Mechanic</p>}
        >
          <DashboardContentHeader>Mata Pelajaran</DashboardContentHeader>
          <DashboardCards>
            <Card
              title="Fisika"
              onClick={() => this.props.history.push("/fisika")}
            >
              <p>Progress: 25%</p>
            </Card>
            <Card title="Kimia" />
          </DashboardCards>
        </Dashboard>
      </Fragment>
    );
  }
}
