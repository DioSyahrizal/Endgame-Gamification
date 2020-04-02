import React, { Component, Fragment } from "react";
import { Container, Grid, Button } from "semantic-ui-react";
import styled from "styled-components";

import { variables } from "@kata-kit/theme";
import { Dashboard } from "@kata-kit/dashboard";
import HeaderContainer from "modules/core/profile/Header";

const Box = styled("div")`
  background: ${variables.colors.gray10};
  border: 1px solid ${variables.colors.gray30};
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 8px;
  padding: 14px 16px;
  font-weight: 500;
  margin-bottom: 30px;
`;

export default class Page extends Component {
  render() {
    return (
      <Dashboard
        floatingElements={
          <Fragment>
            <HeaderContainer />
          </Fragment>
        }
      >
        <Container textAlign="center">
          <h1 style={{ marginTop: "40px", marginBottom: "40px" }}>Soal 1</h1>
          <Box>
            <h2>Apakah Gas termasuk benda yang bisa disentuh?</h2>
          </Box>

          <Grid centered>
            <Grid.Row>
              <Button size="large" fluid color="red">
                A. Benar
              </Button>
            </Grid.Row>
            <Grid.Row>
              <Button size="large" fluid color="yellow">
                B. Salah
              </Button>
            </Grid.Row>
            <Grid.Row>
              <Button size="large" fluid color="green">
                A. Mungkin
              </Button>
            </Grid.Row>
            <Grid.Row>
              <Button size="large" fluid color="blue">
                A. Akan tetapi
              </Button>
            </Grid.Row>
          </Grid>
        </Container>
      </Dashboard>
    );
  }
}
