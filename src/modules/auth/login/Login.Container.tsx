import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import Login from "./Login";
import { fetchLoginRequest } from "store/auth/actions";
import { RootStore } from "interfaces/stores";
import {
  getAuthLoading,
  getAuthError,
  getIsAuthenticated
} from "store/auth/selectors";

interface PropsFromState {
  isLoading?: boolean;
  isLoggedIn: boolean;
  errors: string | null;
}

interface PropsFromDispatch {
  loginAction: (
    email: string,
    password: string
  ) => ReturnType<typeof fetchLoginRequest>;
}

export interface LoginContainerProps
  extends PropsFromState,
    PropsFromDispatch,
    RouteComponentProps<{}> {}

const LoginContainer = (props: LoginContainerProps) => <Login {...props} />;

const mapStateToProps = ({ auth }: RootStore): PropsFromState => {
  return {
    isLoading: getAuthLoading(auth),
    errors: getAuthError(auth),
    isLoggedIn: getIsAuthenticated(auth)
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
  return {
    loginAction: (email: string, password: string) =>
      dispatch(fetchLoginRequest(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
