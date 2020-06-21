import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "semantic-ui-react";
import { Link, LinkProps } from "react-router-dom";
import dashboardLogo from "assets/image/dashboard.svg";
import { ReactComponent as PhysicsLogo } from "assets/image/atom.svg";
import { ReactComponent as ChemistryLogo } from "assets/image/chemistry.svg";
import { ReactComponent as QuestLogo } from "assets/image/search.svg";

import { Dashboard as KataDashboard } from "@kata-kit/dashboard";

import styled from "styled-components";
import HeaderContainer from "modules/core/profile/Header";

import { AccountSelectorWrapper } from "./components";
import Fisika from "assets/image/fisika.jpeg";
import Kimia from "assets/image/kimia.jpeg";

import * as env from "utils/env";

const GAMA_SERVICES = env.getRuntimeEnv(
  "REACT_APP_RUNTIME_GAMA_SERVICE_URL",
  env.defaultEnvs["REACT_APP_RUNTIME_GAMA_SERVICE_URL"]
);

const Title = styled("h3")`
  color: white;
`;

const Dashboard = styled(KataDashboard)`
  .sc-brqgnP {
    width: 326px;
    height: 240px;
    margin-right: 40px;
    margin-top: 40px;
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

          <div className="flex flex-col mb-10">
            <div className="flex flex-row justify-between">
              <Board
                to="/user/fisika"
                style={{
                  color: "white",
                  backgroundImage: `url(${Fisika})`,
                  backgroundSize: "100% 100%",
                }}
                className="flex flex-col bg-gray-500 m-2 p-4 w-full h-full rounded-md text-center items-center justify-center"
              >
                <PhysicsLogo />
                <Title>Physics Learn</Title>
              </Board>

              <Board
                to="/user/kimia"
                style={{
                  color: "white",
                  backgroundImage: `url(${Kimia})`,
                  backgroundSize: "100% 100%",
                }}
                className="flex flex-col bg-gray-500 m-2 p-4 w-full h-full rounded-md text-center items-center justify-center"
              >
                <ChemistryLogo />
                <Title>Chemistry Learn</Title>
              </Board>
            </div>
            <Board
              to="/user/quest/1"
              style={{ color: "white", background: "#39479d" }}
              className="flex flex-col w-full h-full bg-gray-500 mr-4 py-4 rounded-md text-center items-center justify-center"
            >
              <QuestLogo />
              <Title>Quest</Title>
              <p>Buka di hari Selasa dan Kamis</p>
            </Board>
          </div>
        </Dashboard>
      </Fragment>
    );
  }
}
