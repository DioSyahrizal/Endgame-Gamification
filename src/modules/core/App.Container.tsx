import React from "react";
import { connect } from "react-redux";

import { RootStore } from "interfaces/stores";
import { User } from "interfaces/user";
import { getAuthSelected } from "store/auth/selectors";
import App from "./App";

interface PropsFromState {
  selected: User | null;
}

export interface AppProps extends PropsFromState {}

const AppContainer = (props: AppProps) => <App {...props} />;

const mapStateToProps = ({ auth }: RootStore): PropsFromState => {
  return {
    selected: getAuthSelected(auth)
  };
};

const mapDispatchtoProps = {};

export default connect(mapStateToProps, mapDispatchtoProps)(AppContainer);
