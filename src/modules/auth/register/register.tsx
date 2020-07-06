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
import { notPrivateApi } from "utils/api/callApi";
import { Formik } from "formik";

interface Props extends RouteComponentProps {}

interface States {
  loading: boolean;
  error: string | null;
}

const initialValues = {
  email: "",
  username: "",
  password: "",
  address: "",
  name: "",
  sekolah: "",
  nohp: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is empty!"),
  username: yup.string().required("Username is empty!"),
  password: yup.string().required("Password is empty!"),
  address: yup.string().required("Address is empty"),
  name: yup.string().required("Name is required"),
  sekolah: yup.string().required("Sekolah is required"),
  nohp: yup.string().required("No HP is required"),
});

export default class Register extends Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
    };
  }

  register = (values: any) => {
    this.setState({ loading: true });
    notPrivateApi()
      .post("/register", values)
      .then((_res) => {
        this.setState({ loading: false });
        this.props.history.push("/login");
      })
      .catch((error) =>
        this.setState({ error: error.response.data.message, loading: false })
      );
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
    const { loading } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "auto", backgroundImage: `url(${Background}) ` }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.state.error && (
            <Message negative>
              <Message.Header>{this.state.error}</Message.Header>
            </Message>
          )}
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
                      label="Password"
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
                      label="Nama"
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
                      label="Alamat"
                    />

                    <Form.Input
                      name="sekolah"
                      onChange={handleChange}
                      value={values.sekolah}
                      error={
                        errors.sekolah
                          ? { content: errors.sekolah, pointing: "top" }
                          : null
                      }
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="sekolah"
                      label="Sekolah"
                    />

                    <Form.Input
                      name="nohp"
                      onChange={handleChange}
                      value={values.nohp}
                      error={
                        errors.nohp
                          ? { content: errors.nohp, pointing: "top" }
                          : null
                      }
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="nohp"
                      label="Nomor HP"
                    />

                    <Button
                      type="submit"
                      color="green"
                      icon="right arrow"
                      fluid
                      labelPosition="right"
                      content="Register"
                      loading={loading}
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
