import React, { FC } from "react";
import { connect } from "react-redux";
import { RootStore } from "interfaces/stores";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router";
import { getAuthSelected } from "store/auth/selectors";
import { User } from "interfaces/user";
import Page from "./Page";
import { buyLevelMedRequest, buyLevelHardRequest } from "store/score/actions";

interface PropsFromState {
  selected: User | null;
}

interface PropsFromDispatch {
  buyMedium: (curr: string) => ReturnType<typeof buyLevelMedRequest>;
  buyHard: (curr: string) => ReturnType<typeof buyLevelHardRequest>;
}

export interface SoalProps
  extends PropsFromState,
    PropsFromDispatch,
    RouteComponentProps {}

const PageContainer: FC<SoalProps> = (props: SoalProps) => {
  return <Page {...props} />;
};

const mapStateToProps = ({ auth }: RootStore): PropsFromState => {
  return {
    selected: getAuthSelected(auth),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
  buyMedium: (currency: string) => dispatch(buyLevelMedRequest(currency)),
  buyHard: (currency: string) => dispatch(buyLevelHardRequest(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
