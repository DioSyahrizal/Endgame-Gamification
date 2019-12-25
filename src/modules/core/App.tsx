import React, { Component, Fragment, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";
import LoadingCircle from "../../components/LoadingCircle";

const Dashboardmain = React.lazy(() => import("../dashboard"));
const Fisika = React.lazy(() => import("../fisika"));

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Suspense fallback={<LoadingCircle />}>
          <Switch>
            <Route path="/dashboard" component={Dashboardmain} />
            <Route path="/fisika" component={Fisika} />
            <Route render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </Suspense>
      </Fragment>
    );
  }
}
