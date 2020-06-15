import React, { FC } from "react";
import { connect } from "react-redux";
import { RootStore } from "interfaces/stores";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router";
import * as Cookies from "js-cookie";

import { getAuthSelected } from "store/auth/selectors";
import { User } from "interfaces/user";
import Page from "./Page";
import { CK_LAST_PATH } from "store/app/sagas";

interface PropsBack {
  goBack: () => void;
}

interface PropsFromState {
  selected: User | null;
}

export interface QuestProps
  extends PropsFromState,
    PropsBack,
    RouteComponentProps<{ id?: any; diff?: any }> {}

const prevPath = Cookies.get(CK_LAST_PATH) || "/";

const PageContainer: FC<QuestProps> = (props: QuestProps) => {
  return <Page {...props} goBack={() => props.history.push(prevPath)} />;
};

const mapStateToProps = ({ auth }: RootStore): PropsFromState => {
  return {
    selected: getAuthSelected(auth),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
