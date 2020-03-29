import React, { Component, Fragment } from "react";
import { Dashboard } from "@kata-kit/dashboard";
import { Card, Image, Progress } from "semantic-ui-react";
import difficulty from "./components/difficulty";
import { RouteComponentProps } from "react-router";
import HeaderContainer from "modules/core/profile/Header";
// import Logo from "../../assets/image/saturn.png";

export default class Page extends Component<RouteComponentProps> {
  render() {
    return (
      <Dashboard
        title="Fisika"
        floatingElements={
          <Fragment>
            <HeaderContainer />
          </Fragment>
        }
      >
        <Fragment>
          <div className="flex flex-col justify-around items-center lg:flex-row">
            {difficulty.map((diff, id) => (
              <div key={id}>
                <Card
                  onClick={() =>
                    this.props.history.push(
                      `/fisika/${diff.difficulty.toLowerCase()}`
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
        </Fragment>
      </Dashboard>
    );
  }
}
