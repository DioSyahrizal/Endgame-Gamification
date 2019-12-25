import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoadingCircle from "./components/LoadingCircle";

const Dashboardmain = React.lazy(() => import("./modules/dashboard"));

class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={<LoadingCircle />}>
          <Switch>
            <Route path="/(login|register)" />
            <Route path="/" component={Dashboardmain} />
            <Route render={() => <Redirect to="/login" />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}
export default Main;
