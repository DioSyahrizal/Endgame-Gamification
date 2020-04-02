import React, { Fragment, Suspense, FC } from "react";
import { Switch, Route, Redirect } from "react-router";

import LoadingCircle from "components/LoadingCircle";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ControlRoom = React.lazy(() => import("./controlroom"));
const parentPath = "/admin";

const Page: FC = () => {
  return (
    <Fragment>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        vertical
        visible
      >
        <Menu.Item as={Link} to="/admin">
          <Icon name="building" />
          Rubykraft
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="user" />
          Shan
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="user" />
          Vishnu
        </Menu.Item>
      </Sidebar>
      <Suspense fallback={<LoadingCircle />}>
        <Switch>
          <Route
            path={`${parentPath}/controlroom`}
            exact
            component={ControlRoom}
          />
          <Route render={() => <Redirect to={`${parentPath}/controlroom`} />} />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default Page;
