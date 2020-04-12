import React, { Component } from "react";
import { Card, Image, Progress, Container } from "semantic-ui-react";
import difficulty from "./components/difficulty";
import { RouteComponentProps } from "react-router";
import HeaderContainer from "modules/core/profile/Header";
import Particles from "react-particles-js";
// import Logo from "../../assets/image/saturn.png";

export default class Page extends Component<RouteComponentProps> {
  render() {
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
            {difficulty.map((diff, id) => (
              <div key={id} className="mb-6">
                <Card
                  style={{ borderRadius: 20 }}
                  onClick={() =>
                    this.props.history.push(
                      `/user/fisika/${diff.difficulty.toLowerCase()}/1`
                    )
                  }
                >
                  <Image
                    className="h-auto"
                    src={diff.image}
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>{diff.difficulty}</Card.Header>
                    <Card.Description>{diff.desc}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Progress
                      value={diff.progress}
                      total={10}
                      progress="ratio"
                      success={diff.progress === 10 ? true : false}
                    />
                  </Card.Content>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}
