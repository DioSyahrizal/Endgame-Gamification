import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "semantic-ui-react";
import dashboardLogo from "assets/image/dashboard.svg";

import {
  Dashboard as KataDashboard,
  DashboardContentHeader
} from "@kata-kit/dashboard";

import styled from "styled-components";
import HeaderContainer from "modules/core/profile/Header";

import { AccountSelectorWrapper } from "./components";

import * as env from "utils/env";

const GAMA_SERVICES = env.getRuntimeEnv(
  "REACT_APP_RUNTIME_GAMA_SERVICE_URL",
  env.defaultEnvs["REACT_APP_RUNTIME_GAMA_SERVICE_URL"]
);

const Dashboard = styled(KataDashboard)`
  img {
    width: 426px;
    height: 240px;
  }
  .cueDVP {
    background: linear-gradient(to right, blue, grey);
  }
`;

export default class Dashboardmain extends Component<RouteComponentProps> {
  render() {
    return (
      <Fragment>
        <Container style={{ position: "relative" }}>
          <AccountSelectorWrapper>
            <HeaderContainer />
          </AccountSelectorWrapper>
        </Container>
        <Dashboard
          title="Gamification Primagama"
          isStarter
          image={dashboardLogo}
          headerContent={
            <>
              <p>Learn with Game Mechanic</p> <br />
              <p>
                Build in {process.env.NODE_ENV} and {GAMA_SERVICES}
              </p>
            </>
          }
        >
          <DashboardContentHeader>Mata Pelajaran</DashboardContentHeader>
          {/* <DashboardCards>
            <Card
              title="Fisika"
              onClick={() => this.props.history.push("/fisika")}
            >
              <p>Progress: 25%</p>
            </Card>
            <Card title="Kimia" />
          </DashboardCards> */}
          <div className="flex flex-row justify-between">
            <div className="bg-gray-500 m-2 p-4 w-full h-full rounded-md text-center">
              <h3>Pysich Learn</h3>
            </div>
            <div className="bg-gray-500 m-2 w-full h-full rounded-md text-center">
              Pysich Learn
            </div>
          </div>
        </Dashboard>
      </Fragment>
    );
  }
}
