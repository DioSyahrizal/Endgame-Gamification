import React, { Component, Fragment, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";
import LoadingCircle from "../../components/LoadingCircle";

const Dashboardmain = React.lazy(() => import("../dashboard"));
const Fisika = React.lazy(() => import("../fisika"));
const Soal = React.lazy(() => import("../fisika/soal"));
const Leaderboard = React.lazy(() => import("../leaderboard"));

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Suspense fallback={<LoadingCircle />}>
          <Switch>
            <Route path="/dashboard" exact component={Dashboardmain} />
            <Route path="/fisika" exact component={Fisika} />
            <Route path="/fisika/(easy|medium|hard)" component={Soal} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </Suspense>
      </Fragment>
    );
  }
}
