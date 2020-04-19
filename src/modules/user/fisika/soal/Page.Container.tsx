import React, { FC } from "react";
import { connect } from "react-redux";
import { RootStore } from "interfaces/stores";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router";

import { getAuthSelected } from "store/auth/selectors";
import { User } from "interfaces/user";
import Page from "./Page";

interface PropsFromState {
  selected: User | null;
}

interface PropsFromDispatch {}

export interface FisikaProps
  extends PropsFromState,
    PropsFromDispatch,
    RouteComponentProps<{ id?: any; diff?: any }> {}

const PageContainer: FC<FisikaProps> = (props: FisikaProps) => {
  return <Page {...props} />;
};

const mapStateToProps = ({ auth }: RootStore): PropsFromState => {
  return {
    selected: getAuthSelected(auth),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
