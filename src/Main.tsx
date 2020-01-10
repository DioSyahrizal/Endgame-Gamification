import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingCircle from "./components/LoadingCircle";
import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

const App = React.lazy(() => import("./modules/core/App"));

class Main extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <React.Suspense fallback={<LoadingCircle />}>
          <Switch>
            <Route path="/(login|register)" />
            <Route path="/" component={App} />
            <Route render={() => <Redirect to="/login" />} />
          </Switch>
        </React.Suspense>
      </ConnectedRouter>
    );
  }
}
export default Main;
