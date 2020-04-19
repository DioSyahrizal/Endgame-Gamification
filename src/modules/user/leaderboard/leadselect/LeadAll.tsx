import React, { Component, Fragment } from "react";

import { Table } from "semantic-ui-react";
import { privateApi } from "utils/api/callApi";

interface Props {}
interface States {
  data: [
    {
      id_user: string;
      name: string;
      username: string;
      total: number;
      jum_badge: number;
    }
  ];
}

class AllLead extends Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [
        {
          id_user: "",
          name: "",
          username: "",
          total: 0,
          jum_badge: 0,
        },
      ],
    };
  }

  componentDidMount() {
    privateApi()
      .get("/leaderboard/all")
      .then((res) => this.setState({ data: res.data }));
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "10%" }}>Rank</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "15%" }}>
                Username
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "30%" }}>Name</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "15%" }}>
                Badge
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "30%" }}>
                Total
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((data, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{data.username}</Table.Cell>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.jum_badge}</Table.Cell>
                <Table.Cell>{data.total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Fragment>
    );
  }
}

export default AllLead;
