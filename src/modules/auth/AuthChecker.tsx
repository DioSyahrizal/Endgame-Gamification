import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { validateAuth } from "store/auth/actions";

class AuthChecker extends React.Component<any, any> {
  componentDidMount() {
    this.props.checkLogin();
  }

  render() {
    return null;
  }
}

const mapStateToProps = ({ auth }: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    checkLogin: () => dispatch(validateAuth(true))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthChecker);
