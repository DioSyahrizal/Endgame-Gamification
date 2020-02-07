import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getScoreData } from "store/score/selectors";
import { fetchScoreRequest } from "store/score/actions";
import { Header } from "./Header";
import { RootStore } from "interfaces/stores";

interface PropsFromState {
  data: number;
}

interface PropsFromDispatch {
  fetchRequest: (id: number) => ReturnType<typeof fetchScoreRequest>;
}

export type ScoreProps = PropsFromDispatch & PropsFromState;

class HeaderContainer extends React.Component<ScoreProps> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = ({ score }: RootStore): PropsFromState => ({
  data: getScoreData(score)
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
  fetchRequest: (id: number) => dispatch(fetchScoreRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
