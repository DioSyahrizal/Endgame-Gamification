import React, { Component, Fragment } from "react";
import { Dashboard } from "@kata-kit/dashboard";
import { Card, Grid } from "semantic-ui-react";
import difficulty from "./components/difficulty";
// import Logo from "../../assets/image/saturn.png";

export default class Page extends Component {
  render() {
    return (
      <Dashboard
        title="Fisika"
        floatingElements={
          <Fragment>
            <p>Dropdown</p>
          </Fragment>
        }
      >
        <Fragment>
          <Grid>
            <Grid.Row columns={3}>
              {difficulty.map(diff => (
                <Grid.Column>
                  <Card>
                    {/* <Image src={Logo} wrapped ui={false} /> */}
                    <Card.Content>
                      <Card.Header>{diff.difficulty}</Card.Header>
                      <Card.Description>{diff.desc}</Card.Description>
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
