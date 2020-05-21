import React, { Component } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import { RouteComponentProps } from "react-router";
import * as yup from "yup";

import Background from "assets/image/login.jpeg";
import { callApiWithoutToken } from "utils/api/callApi";
import { Formik } from "formik";

interface Props extends RouteComponentProps {}

interface States {
  username: string;
  name: string;
  email: string;
  password: string;
  address: string;
}

const initialValues = {
  email: "",
  username: "",
  password: "",
  address: "",
  name: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is empty!"),
  username: yup.string().required("Username is empty!"),
  password: yup.string().required("Password is empty!"),
  address: yup.string().required("Address is empty"),
  name: yup.string().required("Name is required"),
});

export default class Register extends Component<Props, States> {
  register = (values: any) => {
    callApiWithoutToken("post", "/register", values).then((res) => {
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.register}
          >
            {({ handleSubmit, values, errors, handleChange }) => {
              return (
                <Form layout="horizontal" onSubmit={handleSubmit}>
                  <Segment raised style={{ textAlign: "left" }}>
                    <Form.Input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      error={
                        errors.email
                          ? { content: errors.email, pointing: "top" }
                          : null
                      }
                      icon="mail"
                      iconPosition="left"
                      placeholder="email"
                      label="Email"
                    />

                    <Form.Input
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      error={
                        errors.username
                          ? { content: errors.username, pointing: "top" }
                          : null
                      }
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="username"
                      label="Username"
                    />

                    <Form.Input
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={values.password}
                      error={
                        errors.password
                          ? { content: errors.password, pointing: "top" }
                          : null
                      }
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="password"
                      label="password"
                    />

                    <Form.Input
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      error={
                        errors.name
                          ? { content: errors.name, pointing: "top" }
                          : null
                      }
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="name"
                      label="Name"
                    />

                    <Form.Input
                      name="address"
                      type="address"
                      onChange={handleChange}
                      value={values.address}
                      error={
                        errors.address
                          ? { content: errors.address, pointing: "top" }
                          : null
                      }
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="address"
                      label="Address"
                    />

                    <Button
                      type="submit"
                      color="green"
                      icon="right arrow"
                      fluid
                      labelPosition="right"
                      content="Register"
                    />
                  </Segment>
                </Form>
              );
            }}
          </Formik>

          <Message>
            Have a account? <a href="/login">Login</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
