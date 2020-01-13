import React, { Component, Fragment } from "react";
import { Dashboard } from "@kata-kit/dashboard";
import { Tab, Table } from "semantic-ui-react";
import HeaderContainer from "modules/core/profile/Header";

const panes = [
  { menuItem: "Fisika", render: () => <Tab panes={fisikaPanes} /> },
  { menuItem: "Kimia", render: () => <Tab panes={fisikaPanes} /> }
];

const fisikaPanes = [
  {
    menuItem: "Easy",
    render: () => <Tab.Pane>{renderFisikaEasy()}</Tab.Pane>
  },
  { menuItem: "Medium", render: () => <Tab.Pane>There is no data!</Tab.Pane> },
  { menuItem: "Hard", render: () => <Tab.Pane>There is no data!</Tab.Pane> }
];

const renderFisikaEasy = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{ width: "10%" }}>Rank</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "15%" }}>Username</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "15%" }}>Point</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "30%" }}>Badge</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "30%" }}>Total</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>dioSyahrizal</Table.Cell>
        <Table.Cell>10000</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>10000</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>dioSyahrizal</Table.Cell>
        <Table.Cell>10000</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>10000</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>3</Table.Cell>
        <Table.Cell>dioSyahrizal</Table.Cell>
        <Table.Cell>10000</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>10000</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default class Page extends Component {
  render() {
    return (
      <Fragment>
        <Dashboard
          title="Leaderboard"
          floatingElements={
            <Fragment>
              <HeaderContainer />
            </Fragment>
          }
        >
          <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
        </Dashboard>
      </Fragment>
    );
  }
}
