import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getScoreData, getCoinData } from "store/score/selectors";
import { fetchScoreRequest } from "store/score/actions";
import { Header } from "./Header";
import { RootStore } from "interfaces/stores";
import { getAuthSelected } from "store/auth/selectors";
import { User } from "interfaces/user";

interface PropsFromState {
  point: number;
  coin: number;
  selected?: User | null;
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

const mapStateToProps = ({ score, auth }: RootStore): PropsFromState => ({
  point: getScoreData(score),
  coin: getCoinData(score),
  selected: getAuthSelected(auth),
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => ({
  fetchRequest: () => dispatch(fetchScoreRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
