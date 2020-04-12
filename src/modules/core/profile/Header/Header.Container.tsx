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
  fetchRequest: () => ReturnType<typeof fetchScoreRequest>;
}

interface ColorProps {
  color?: string;
}

export type ScoreProps = PropsFromDispatch & PropsFromState & ColorProps;

class HeaderContainer extends React.Component<ScoreProps> {
  componentDidMount = () => {
    this.props.fetchRequest();
  };

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = ({ score }: RootStore): PropsFromState => ({
  data: getScoreData(score),
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
  fetchRequest: () => dispatch(fetchScoreRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
