import React, { Component, Fragment } from "react";
import { Dashboard } from "@kata-kit/dashboard";
import { Tab } from "semantic-ui-react";

import HeaderContainer from "modules/core/profile/Header";
import LeadAll from "./leadselect/LeadAll";
import FisikaLead from "./leadselect/LeadFisika";
import KimiaLead from "./leadselect/LeadKimia";

const panes = [
  { menuItem: "All Time", render: () => <LeadAll /> },
  { menuItem: "Fisika", render: () => <Tab panes={fisikaPanes} /> },
  { menuItem: "Kimia", render: () => <Tab panes={kimiaPanes} /> },
];

const fisikaPanes = [
  {
    menuItem: "Easy",
    render: () => (
      <Tab.Pane>
        <FisikaLead level="Easy" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Medium",
    render: () => (
      <Tab.Pane>
        <FisikaLead level="Medium" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Hard",
    render: () => (
      <Tab.Pane>
        <FisikaLead level="Hard" />
      </Tab.Pane>
    ),
  },
];

const kimiaPanes = [
  {
    menuItem: "Easy",
    render: () => (
      <Tab.Pane>
        <KimiaLead level="Easy" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Medium",
    render: () => (
      <Tab.Pane>
        <KimiaLead level="Medium" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Hard",
    render: () => (
      <Tab.Pane>
        <KimiaLead level="Hard" />
      </Tab.Pane>
    ),
  },
];

export default class Page extends Component {
  render() {
    return (
      <Fragment>
        <Dashboard
          title="Leaderboard"
          floatingElements={
            <Fragment>
              <HeaderContainer color="black" />
            </Fragment>
          }
        >
          <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
        </Dashboard>
      </Fragment>
    );
  }
}
