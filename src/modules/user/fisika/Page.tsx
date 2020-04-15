import React, { Component } from "react";
import { Card, Image, Progress, Container } from "semantic-ui-react";

import HeaderContainer from "modules/core/profile/Header";
import Particles from "react-particles-js";
import { privateApi } from "utils/api/callApi";
import { SoalProps } from "./Page.Container";
// import Logo from "../../assets/image/saturn.png";

interface States {
  progress: { easy: number; med: number; hard: number };
}

export default class Page extends Component<SoalProps, States> {
  constructor(props: SoalProps) {
    super(props);

    this.state = {
      progress: { easy: 0, med: 0, hard: 0 },
    };
  }

  componentDidMount = () => {
    privateApi()
      .get("/quiz/progress", {
        params: {
          id_user: this.props.selected && this.props.selected.id,
          matpel: "Fisika",
        },
      })
      .then((res) => this.setState({ progress: res.data }));
  };

  render() {
    const { progress } = this.state;
    return (
      <div>
        <div
          className="flex flex-row justify-between items-center content-center py-6 px-12"
          style={{ backgroundColor: "#d64141" }}
        >
          <h2 style={{ margin: 0, color: "white" }}>Fisika</h2>
          <HeaderContainer color="black" />
        </div>
        <Container style={{ marginTop: 20 }}>
          <Particles
            style={{
              position: "absolute",
              top: 84,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            params={{
              particles: {
                number: {
                  value: 30,
                },
                size: {
                  value: 3,
                },
                color: {
                  value: "#000",
                },
                line_linked: {
                  color: "#000",
                },
              },
            }}
          />
          <div className="relative flex flex-col justify-around items-center lg:flex-row">
            <div className="mb-6">
              <Card
                style={{ borderRadius: 20 }}
                onClick={() => this.props.history.push(`/user/fisika/easy/1`)}
              >
                <Image
                  className="h-auto"
                  src={require("assets/image/saturn.png")}
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Easy</Card.Header>
                  <Card.Description>This is an Easiest Test!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Progress
                    value={progress.easy}
                    total={5}
                    progress="ratio"
                    success={progress.easy === 5 ? true : false}
                  />
                </Card.Content>
              </Card>
            </div>

            <div className="mb-6">
              <Card
                style={{ borderRadius: 20 }}
                onClick={() => this.props.history.push(`/user/fisika/medium/1`)}
              >
                <Image
                  className="h-auto"
                  src={require("assets/image/saturn.png")}
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Medium</Card.Header>
                  <Card.Description>
                    This is an Mediocore Test!
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Progress
                    value={progress.med}
                    total={5}
                    progress="ratio"
                    success={progress.med === 5 ? true : false}
                  />
                </Card.Content>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
