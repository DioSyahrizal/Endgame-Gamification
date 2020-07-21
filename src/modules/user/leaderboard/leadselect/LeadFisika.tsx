import React, { Component, Fragment } from "react";

import { Table } from "semantic-ui-react";
import { privateApi } from "utils/api/callApi";

interface Props {
  level: string;
}
interface States {
  data: [
    {
      id_user: string;
      name: string;
      username: string;
      nilai: number;
      jum_badge: number;
    },
    {
      id_user: string;
      name: string;
      username: string;
      nilai: number;
      jum_badge: number;
    },
    {
      id_user: string;
      name: string;
      username: string;
      nilai: number;
      jum_badge: number;
    }
  ];
}

class FisikaLead extends Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [
        {
          id_user: "",
          name: "",
          username: "",
          nilai: 0,
          jum_badge: 0,
        },
        {
          id_user: "",
          name: "",
          username: "",
          nilai: 0,
          jum_badge: 0,
        },
        {
          id_user: "",
          name: "",
          username: "",
          nilai: 0,
          jum_badge: 0,
        },
      ],
    };
  }

  componentDidMount() {
    privateApi()
      .get("/leaderboard/fisika", { params: { level: this.props.level } })
      .then((res) => {
        this.setState({ data: res.data });
        console.dir(res.data);
      });
  }

  componentDidUpdate(prevProps: Props, _prevState: any) {
    if (prevProps.level !== this.props.level) {
      privateApi()
        .get("/leaderboard/fisika", { params: { level: this.props.level } })
        .then((res) => {
          this.setState({ data: res.data });
        });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Fragment>
        <div className="flex flex-row justify-around items-center mb-4">
          <div className="flex flex-col items-center" style={{ maxWidth: 100 }}>
            <img
              src={require("assets/icon/medal2.svg")}
              style={{ width: 80, height: 80 }}
              alt="silver"
            />
            <p className="mt-4 text-lg text-center font-bold">
              {data && data[1].name}
            </p>
            <p
              className="px-2 py-2"
              style={{ borderRadius: 20, background: "silver" }}
            >
              {data && data[1].nilai}
            </p>
          </div>
          <div className="flex flex-col items-center" style={{ maxWidth: 100 }}>
            <img
              src={require("assets/icon/medal.svg")}
              style={{ width: 120, height: 120 }}
              alt="gold"
            />
            <p className="mt-2 text-lg text-center font-bold">{data[0].name}</p>
            <p
              className="px-2 py-2"
              style={{ borderRadius: 20, background: "gold" }}
            >
              {data && data[0].nilai}
            </p>
          </div>
          <div className="flex flex-col items-center" style={{ maxWidth: 100 }}>
            <img
              src={require("assets/icon/medal3.svg")}
              style={{ width: 80, height: 80 }}
              alt="bronze"
            />
            <p className="mt-4 text-lg text-center font-bold">
              {data && data[2].name}
            </p>
            <p
              className="px-2 py-2"
              style={{ borderRadius: 20, background: "#CD7F32" }}
            >
              {data && data[2].nilai}
            </p>
          </div>
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "10%" }}>Rank</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "15%" }}>
                Username
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "30%" }}>Name</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "30%" }}>
                Total
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map(
              (data, index) =>
                index >= 3 && (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{data.username}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.nilai}</Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
      </Fragment>
    );
  }
}

export default FisikaLead;
