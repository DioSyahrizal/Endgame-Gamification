import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { DropdownItem } from "@kata-kit/dropdown";

import { clearAuthRequest } from "store/auth/actions";

interface PropsFromState {}

interface PropsFromDispatch {
  logout: () => ReturnType<typeof clearAuthRequest>;
}

interface LogoutButtonProps extends PropsFromDispatch, RouteComponentProps {}

export const LogoutButton = ({ logout }: LogoutButtonProps) => (
  <DropdownItem
    onClick={e => {
      e.preventDefault();
      logout();
    }}
  >
    Log out
  </DropdownItem>
);

const mapStateToProps = (): PropsFromState => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
  return {
    logout: () => dispatch(clearAuthRequest())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
);
