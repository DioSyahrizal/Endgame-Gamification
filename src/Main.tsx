import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

import ProtectedRoute from "./modules/auth/Route";
import LoadingCircle from "./components/LoadingCircle";

import "./styles/output.css";
import AuthChecker from "modules/auth/AuthChecker";

const App = React.lazy(() => import("./modules/core/App.Container"));
const Auth = React.lazy(() => import("./modules/auth"));

class Main extends React.Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <React.Suspense fallback={<LoadingCircle />}>
          <AuthChecker />
          <Switch>
            <Route path="/(login|register)" component={Auth} />
            <ProtectedRoute path="/" component={App} />
            <Route render={() => <Redirect to="/login" />} />
          </Switch>
        </React.Suspense>
      </ConnectedRouter>
    );
  }
}
export default Main;
