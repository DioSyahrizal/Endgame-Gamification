import React, { Component } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";

import { LoginContainerProps } from "./Login.Container";
import { Redirect } from "react-router";
import Background from "assets/image/login.jpeg";

interface Props extends LoginContainerProps {}

interface States {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is empty!"),
  password: yup.string().required("Password is empty!"),
});

export default class Login extends Component<Props> {
  login = (values: States) => {
    this.props.loginAction(values.email, values.password);
  };

  render() {
    const { isLoggedIn, isLoading } = this.props;
    const from = this.props.location.state || "/";

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <Grid
        textAlign="center"
        style={{
          height: "100vh",
          backgroundImage: `url(${Background}) `,
          backgroundSize: "cover",
        }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.props.errors && (
            <Message negative>
              <Message.Header>{this.props.errors}</Message.Header>
            </Message>
          )}
          <Header as="h2" textAlign="center">
            Gamification Primagama
          </Header>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={this.login}
          >
            {({ handleSubmit, values, errors, handleChange }) => {
              return (
                <Form layout="horizontal" onSubmit={handleSubmit}>
                  <Segment raised>
                    <Form.Input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      error={errors.email ? { content: errors.email } : null}
                      fluid
                      icon="mail"
                      iconPosition="left"
                      placeholder="email"
                    />

                    <Form.Input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      error={
                        errors.password ? { content: errors.password } : null
                      }
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                    />

                    <Button
                      type="submit"
                      color="green"
                      icon="right arrow"
                      fluid
                      loading={isLoading}
                      labelPosition="right"
                      content="Login"
                    />
                  </Segment>
                </Form>
              );
            }}
          </Formik>
          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
