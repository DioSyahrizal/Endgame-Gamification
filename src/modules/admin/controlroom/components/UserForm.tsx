import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { Form, Button } from "semantic-ui-react";

interface IUserForm {
  user: any;
  submit: (value: any) => void;
  disabled: boolean;
  handler: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required("Name Kosong"),
  username: yup.string().required("Username Kosong"),
  email: yup.string().email("Format email salah").required("Email Kosong"),
  address: yup.string().required("Alamat Kosong"),
  point: yup.number().required("Point kosong"),
  coin: yup.number().required(),
});

const UserForm = (props: IUserForm) => {
  const { disabled, submit, handler } = props;
  return (
    <div>
      <Button
        style={{ marginBottom: 20 }}
        onClick={() => handler()}
        content="Edit User"
        color="yellow"
      />
      <Formik
        initialValues={props.user}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ handleSubmit, values, errors, handleChange }) => {
          return (
            <Form layout="horizontal" onSubmit={handleSubmit}>
              <Form.Input
                name="name"
                onChange={handleChange}
                value={values.name}
                error={errors.name ? { content: errors.name } : null}
                fluid
                placeholder="Name"
                label="Name"
                disabled={disabled}
              />

              <Form.Input
                name="username"
                onChange={handleChange}
                value={values.username}
                error={errors.username ? { content: errors.username } : null}
                fluid
                placeholder="Username"
                label="Username"
                disabled={disabled}
              />
              <Form.Input
                name="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email ? { content: errors.email } : null}
                fluid
                placeholder="Email"
                label="Email"
                disabled={disabled}
              />
              <Form.Input
                name="address"
                onChange={handleChange}
                value={values.address}
                error={errors.address ? { content: errors.address } : null}
                fluid
                placeholder="Address"
                label="Address"
                disabled={disabled}
              />
              <Form.Input
                name="point"
                onChange={handleChange}
                value={values.point}
                error={errors.point ? { content: errors.point } : null}
                fluid
                type="number"
                placeholder="point"
                label="point"
                disabled={disabled}
              />

              <Form.Input
                name="coin"
                onChange={handleChange}
                value={values.coin}
                error={errors.coin ? { content: errors.coin } : null}
                fluid
                type="number"
                placeholder="Diamond"
                label="diamond"
                disabled={disabled}
              />

              <Button
                disabled={disabled}
                type="submit"
                color="green"
                icon="right arrow"
                fluid
                labelPosition="right"
                content="Submit"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UserForm;
