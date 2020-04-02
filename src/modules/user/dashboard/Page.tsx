import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "semantic-ui-react";
import { Link, LinkProps } from "react-router-dom";
import dashboardLogo from "assets/image/dashboard.svg";
import { ReactComponent as PhysicsLogo } from "assets/image/atom.svg";
import { ReactComponent as ChemistryLogo } from "assets/image/chemistry.svg";
import { ReactComponent as QuestLogo } from "assets/image/quest.svg";

import { Dashboard as KataDashboard } from "@kata-kit/dashboard";

import styled from "styled-components";
import HeaderContainer from "modules/core/profile/Header";

import { AccountSelectorWrapper } from "./components";

import * as env from "utils/env";

const GAMA_SERVICES = env.getRuntimeEnv(
  "REACT_APP_RUNTIME_GAMA_SERVICE_URL",
  env.defaultEnvs["REACT_APP_RUNTIME_GAMA_SERVICE_URL"]
);

const Dashboard = styled(KataDashboard)`
  .sc-brqgnP {
    width: 426px;
    height: 240px;
  }
  .cueDVP {
    background: linear-gradient(to right, black, blue);
  }
`;

const Board = styled(Link)<LinkProps>`
  text-decoration: none;
  color: black;
  transition: 0.5s;
  border: solid black 1px;
  :hover {
    text-decoration: none;
    color: black;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }

  svg {
    width: 128px;
    height: 128px;
    path {
      fill: white;
    }
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
          {/* <DashboardCards>
            <Card
              title="Fisika"
              onClick={() => this.props.history.push("/fisika")}
            >
              <p>Progress: 25%</p>
            </Card>
            <Card title="Kimia" />
          </DashboardCards> */}
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <Board
                to="/fisika"
                style={{
                  color: "white",
                  background: "#c02c26"
                }}
                className="flex flex-col bg-gray-500 m-2 p-4 w-full h-full rounded-md text-center items-center justify-center"
              >
                <PhysicsLogo />
                <h3>Physics Learn</h3>
              </Board>

              <Board
                to="/kimia"
                style={{ color: "white", background: "#f19f1f" }}
                className="flex flex-col bg-gray-500 m-2 p-4 w-full h-full rounded-md text-center items-center justify-center"
              >
                <ChemistryLogo />
                <h3>Chemistry Learn</h3>
              </Board>
            </div>
            <Board
              to="/quest"
              style={{ color: "white", background: "#39479d" }}
              className="flex flex-col w-full h-full bg-gray-500 mr-4 py-4 rounded-md text-center items-center justify-center"
            >
              <QuestLogo />
              <h3>Quest</h3>
            </Board>
          </div>
        </Dashboard>
      </Fragment>
    );
  }
}
