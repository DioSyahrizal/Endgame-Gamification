import React, { Suspense, FC, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from "react-router";
import { Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import LoadingCircle from "components/LoadingCircle";
import SideNav from "./components/Sidenav";

import "antd/dist/antd.css";
import SideNavContext from "./context/SidenavContext";
import CurrentPath from "./components/Breadcumb";
import BreadcrumbContext from "./context/BreadcumbContext";
import { clearAuthRequest } from "store/auth/actions";

interface PropsFromState {}

interface PropsFromDispatch {
  logout: () => ReturnType<typeof clearAuthRequest>;
}

interface Props extends PropsFromDispatch, RouteComponentProps {}

const ControlRoom = React.lazy(() => import("./controlroom"));
const Soal = React.lazy(() => import("./soal"));
const Quiz = React.lazy(() => import("./quiz"));

const parentPath = "/admin";

const { Content, Header } = Layout;

const Page: FC<Props> = (props: Props) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [sideNavState, setSideNavState] = useState({
    selectedKeys: [],
    openKeys: [],
    collapsed: false,
  });

  return (
    <SideNavContext.Provider
      value={{ state: { ...sideNavState }, setSideNavState }}
    >
      <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
        <Layout style={{ height: "100vh" }}>
          <Header
            style={{
              padding: 0,
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "240px",
                  height: "100%",
                  textAlign: "center",
                  display: "inline-block",
                  background: "#fff",
                }}
              >
                <b>Admin Page</b>
              </div>
            </div>
            <div style={{ paddingRight: "24px" }}>
              <div
                className="flex flex-row justify-center items-center cursor-pointer"
                onClick={() => props.logout()}
              >
                <LogoutOutlined />
                <span className="ml-2">Logout</span>
              </div>
            </div>
          </Header>

          <Layout>
            <SideNav />

            <Layout style={{ padding: "0 24px 24px" }}>
              <CurrentPath />
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  overflowY: "auto",
                }}
              >
                <Suspense fallback={<LoadingCircle />}>
                  <Switch>
                    <Route
                      path={`${parentPath}/controlroom`}
                      exact
                      component={ControlRoom}
                    />
                    <Route path={`${parentPath}/soal`} exact component={Soal} />
                    <Route path={`${parentPath}/quiz`} exact component={Quiz} />
                    <Route
                      render={() => (
                        <Redirect to={`${parentPath}/controlroom`} />
                      )}
                    />
                  </Switch>
                </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BreadcrumbContext.Provider>
    </SideNavContext.Provider>
  );
};

const mapStateToProps = (): PropsFromState => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
  return {
    logout: () => dispatch(clearAuthRequest()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
