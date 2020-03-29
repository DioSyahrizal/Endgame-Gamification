import React, { Component } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message
} from "semantic-ui-react";
import { LoginContainerProps } from "./Login.Container";

interface Props extends LoginContainerProps {}

interface States {
  username: string;
  password: string;
}

export default class Login extends Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginAction(data.username, data.password);
  };

  inputChange = (name: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const newState: any = {};

      newState[name] = value;
      this.setState(newState);
    };
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            {/* <Image src='/logo.png' /> Log-in to your account */}
          </Header>
          <Form onSubmit={this.login} size="large">
            <Segment raised>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="username"
                onChange={this.inputChange("username")}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.inputChange("password")}
              />

              <Button
                color="green"
                icon="right arrow"
                fluid
                labelPosition="right"
                content="Login"
              />
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
