import React, { Component, Fragment, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";
import LoadingCircle from "../../components/LoadingCircle";
import { AppProps } from "./App.Container";

const User = React.lazy(() => import("../user"));
const Admin = React.lazy(() => import("../admin"));

export default class App extends Component<AppProps> {
  render() {
    const { selected } = this.props;
    return (
      <Fragment>
        <Suspense fallback={<LoadingCircle />}>
          <Switch>
            {selected && selected.role === "user" ? (
              <Route path="/user" component={User} />
            ) : (
              <Route path="/admin" component={Admin} />
            )}

            <Route
              render={props => {
                if (selected && selected.role === "user") {
                  return <Route render={() => <Redirect to="/user" />} />;
                }
                if (selected && selected.role === "admin") {
                  return <Route render={() => <Redirect to="/admin" />} />;
                }
                return <Route render={() => <Redirect to="/" />} />;
              }}
            />
          </Switch>
        </Suspense>
      </Fragment>
    );
  }
}
