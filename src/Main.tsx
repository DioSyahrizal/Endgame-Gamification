import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "store";
import Pusher from "pusher-js";

import ProtectedRoute from "./modules/auth/Route";
import LoadingCircle from "./components/LoadingCircle";

import "./styles/output.css";
import "antd/dist/antd.css";
import { notification } from "antd";
import AuthChecker from "modules/auth/AuthChecker";

const App = React.lazy(() => import("./modules/core/App.Container"));
const Auth = React.lazy(() => import("./modules/auth"));

class Main extends React.Component {
  componentDidMount = () => {
    const pusher = new Pusher("9ce3c8a195d350f6ff35", {
      cluster: "ap1",
      encrypted: true,
    });
    const channel = pusher.subscribe("badge");
    channel.bind("triggerBadge", (data: any) => {
      notification["success"]({
        message: "New Badge!",
        description: data.message,
        placement: "topLeft",
      });
    });
  };

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
