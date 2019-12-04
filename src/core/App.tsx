import React, { Component } from "react";
import LoadingCircle from "../components/LoadingCircle";
import { Switch, Route, Redirect } from "react-router";

const Dashboardmain = React.lazy(() => import("../modules/dashboard"));

export default class App extends Component {
  render() {
    return (
      <React.Suspense fallback={<LoadingCircle />}>
        <Switch>
          <Route path="/dashboard" component={Dashboardmain} />
          <Route render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </React.Suspense>
    );
  }
}
