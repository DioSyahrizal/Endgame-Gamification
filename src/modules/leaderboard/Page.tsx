import React, { Component, Fragment } from "react";
import { Dashboard } from "@kata-kit/dashboard";
import { Header } from "modules/core/Header";
import { Tab, Table, Label } from "semantic-ui-react";

const panes = [
  { menuItem: "Fisika", render: () => <Tab panes={fisikaPanes} /> },
  { menuItem: "Kimia", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
];

const fisikaPanes = [
  {
    menuItem: "Easy",
    render: () => <Tab.Pane>{renderFisikaEasy()}</Tab.Pane>
  },
  { menuItem: "Medium", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: "Hard", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
];

const renderFisikaEasy = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell style={{ width: "10%" }}>Rank</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "30%" }}>Username</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "30%" }}>Point</Table.HeaderCell>
        <Table.HeaderCell style={{ width: "30%" }}>Badge</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>First</Label>
        </Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
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
              <Header color="black" />
            </Fragment>
          }
        >
          <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
        </Dashboard>
      </Fragment>
    );
  }
}
