import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getIsAuthenticated } from "store/auth/selectors";
import { RootStore } from "interfaces/stores";

// Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
// const isLoggedIn: boolean = true;

interface PropsFromState {
  isLoggedIn: boolean;
}

interface PropsFromDispatch {}

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }: RootStore): PropsFromState => {
  return {
    isLoggedIn: getIsAuthenticated(auth)
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
