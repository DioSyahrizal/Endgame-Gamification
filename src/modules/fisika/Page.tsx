import React, { Component, Fragment } from "react";
import { Dashboard } from "@kata-kit/dashboard";
import { Card, Grid, Image, Progress } from "semantic-ui-react";
import difficulty from "./components/difficulty";
import { Header } from "modules/core/Header";
import { RouteComponentProps } from "react-router";
// import Logo from "../../assets/image/saturn.png";

export default class Page extends Component<RouteComponentProps> {
  render() {
    return (
      <Dashboard
        title="Fisika"
        floatingElements={
          <Fragment>
            <Header color="black" />
          </Fragment>
        }
      >
        <Fragment>
          <Grid>
            <Grid.Row columns={3}>
              {difficulty.map(diff => (
                <Grid.Column>
                  <Card
                    onClick={() =>
                      this.props.history.push(
                        `/fisika/${diff.difficulty.toLowerCase()}`
                      )
                    }
                  >
                    <Image src={diff.image} wrapped ui={false} />
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
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Fragment>
      </Dashboard>
    );
  }
}
