import React, { Component } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import { RouteComponentProps } from "react-router";

import Background from "assets/image/login.jpeg";
import { callApiWithoutToken } from "utils/api/callApi";

interface Props extends RouteComponentProps {}

interface States {
  username: string;
  name: string;
  email: string;
  password: string;
  address: string;
}

export default class Register extends Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      name: "",
      email: "",
      password: "",
      address: "",
    };
  }

  register = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      address: this.state.address,
      name: this.state.name,
    };
    callApiWithoutToken("post", "/register", data).then((res) => {
      if (res.success) {
        this.props.history.push("/login");
      } else {
        console.dir("Failed registration");
      }
    });
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
        style={{ height: "100vh", backgroundImage: `url(${Background}) ` }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            {/* <Image src='/logo.png' /> Log-in to your account */}
          </Header>
          <Form onSubmit={this.register} size="large">
            <Segment raised>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Nama Lengkap"
                onChange={this.inputChange("name")}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
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
              <Form.Input
                fluid
                icon="address card"
                iconPosition="left"
                placeholder="Alamat Rumah"
                type="textarea"
                onChange={this.inputChange("address")}
              />
              <Form.Input
                fluid
                icon="envelope"
                iconPosition="left"
                placeholder="Email"
                onChange={this.inputChange("email")}
              />

              <Button
                color="green"
                content="Register"
                fluid
                size="large"
                icon="right arrow"
                labelPosition="right"
              />
            </Segment>
          </Form>
          <Message>
            Have a account? <a href="/login">Login</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
