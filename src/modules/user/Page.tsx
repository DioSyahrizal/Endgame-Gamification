import React, { Fragment, Suspense } from "react";
import LoadingCircle from "components/LoadingCircle";
import { Switch, Route, Redirect } from "react-router";

const Dashboardmain = React.lazy(() => import("./dashboard"));
const Fisika = React.lazy(() => import("./fisika"));
const Soal = React.lazy(() => import("./fisika/soal"));
const Leaderboard = React.lazy(() => import("./leaderboard"));

const Page: React.FC = () => {
  const parentPath = "/user";
  return (
    <Fragment>
      <Suspense fallback={<LoadingCircle />}>
        <Switch>
          <Route
            path={`${parentPath}/dashboard`}
            exact
            component={Dashboardmain}
          />
          <Route path={`${parentPath}/fisika`} exact component={Fisika} />
          <Route
            path={`${parentPath}/fisika/:diff/:id`}
            exact
            component={Soal}
          />
          <Route path={`${parentPath}/leaderboard`} component={Leaderboard} />
          <Route render={() => <Redirect to={`${parentPath}/dashboard`} />} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default Page;
