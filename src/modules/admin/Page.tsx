import React, { Suspense, FC, useState } from "react";
import { Switch, Route, Redirect } from "react-router";
import { Layout } from "antd";

import LoadingCircle from "components/LoadingCircle";
import SideNav from "./components/Sidenav";

import "antd/dist/antd.css";
import SideNavContext from "./context/SidenavContext";
import CurrentPath from "./components/Breadcumb";
import BreadcrumbContext from "./context/BreadcumbContext";

const ControlRoom = React.lazy(() => import("./controlroom"));
const Soal = React.lazy(() => import("./soal"));

const parentPath = "/admin";

const { Header, Content } = Layout;

const Page: FC = () => {
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

export default Page;
