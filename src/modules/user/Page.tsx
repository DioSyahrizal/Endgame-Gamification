import React, { Fragment, Suspense } from "react";
import LoadingCircle from "components/LoadingCircle";
import { Switch, Route, Redirect } from "react-router";

const Dashboardmain = React.lazy(() => import("./dashboard"));
const Fisika = React.lazy(() => import("./fisika"));
const SoalFisika = React.lazy(() => import("./fisika/soal"));
const Kimia = React.lazy(() => import("./kimia"));
const SoalKimia = React.lazy(() => import("./kimia/soal"));
const Leaderboard = React.lazy(() => import("./leaderboard"));
const Badge = React.lazy(() => import("./badge"));
const Quest = React.lazy(() => import("./quest"));

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
            component={SoalFisika}
          />
          <Route path={`${parentPath}/kimia`} exact component={Kimia} />
          <Route
            path={`${parentPath}/kimia/:diff/:id`}
            exact
            component={SoalKimia}
          />
          <Route path={`${parentPath}/quest/:id`} exact component={Quest} />
          <Route path={`${parentPath}/leaderboard`} component={Leaderboard} />
          <Route path={`${parentPath}/badge`} component={Badge} />

          <Route render={() => <Redirect to={`${parentPath}/dashboard`} />} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default Page;
