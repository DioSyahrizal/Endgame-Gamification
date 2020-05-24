import React, { FC } from "react";
import { connect } from "react-redux";
import { RootStore } from "interfaces/stores";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router";
import * as Cookies from "js-cookie";

import { getAuthSelected } from "store/auth/selectors";
import { User } from "interfaces/user";
import Page from "./Page";
import { fetchBuyItem } from "store/score/actions";
import { CK_LAST_PATH } from "store/app/sagas";

interface PropsBack {
  goBack: () => void;
}

interface PropsFromState {
  selected: User | null;
}

interface PropsFromDispatch {
  buyAction: () => ReturnType<typeof fetchBuyItem>;
}

export interface FisikaProps
  extends PropsFromState,
    PropsBack,
    PropsFromDispatch,
    RouteComponentProps<{ id?: any; diff?: any }> {}

const prevPath = Cookies.get(CK_LAST_PATH) || "/";

const PageContainer: FC<FisikaProps> = (props: FisikaProps) => {
  return <Page {...props} goBack={() => props.history.push(prevPath)} />;
};

const mapStateToProps = ({ auth }: RootStore): PropsFromState => {
  return {
    selected: getAuthSelected(auth),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
  buyAction: () => dispatch(fetchBuyItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
