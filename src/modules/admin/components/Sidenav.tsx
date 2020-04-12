import React, { useContext } from "react";

import { Layout, Menu } from "antd";
import { useHistory } from "react-router";
import SideNavContext from "../context/SidenavContext";
import LogoutButton from "modules/auth/LogoutButton";

const { SubMenu } = Menu;
const { Sider } = Layout;

interface iMenuItem {
  key: string;
  label: string;
  subs?: any;
}

const menu = [
  {
    key: "controlroom",
    label: "Control Room",
    icon: "dashboard",
  },
  {
    key: "soal",
    label: "Soal",
    icon: "book",
  },
  // {
  //   key: "members",
  //   label: "Member",
  //   icon: "team",
  // },
  // {
  //   key: "announcements",
  //   label: "Announcements",
  //   icon: "notification",
  // },
  // {
  //   key: "news",
  //   label: "Newsletter",
  //   icon: "read",
  //   subs: [
  //     {
  //       key: "manage-news",
  //       label: "Manage News",
  //     },
  //     {
  //       key: "manage-subscriber",
  //       label: "Manage Subscriber",
  //     },
  //   ],
  // },
  // {
  //   key: "admin",
  //   label: "Admin",
  //   icon: "appstore",
  //   subs: [
  //     {
  //       key: "users",
  //       label: "User",
  //     },
  //     {
  //       key: "logs",
  //       label: "Log",
  //     },
  //   ],
  // },
];

const SideNav = () => {
  const history = useHistory();

  const { state: sideNavState, setSideNavState } = useContext(SideNavContext);

  function handleClick(key: string, keyPaths: string[]) {
    setSideNavState({
      selectedKeys: [key],
    });
    history.push("/admin/" + keyPaths.reverse().join("/"));
  }

  return (
    <Sider width={240} style={{ background: "#fff" }}>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={sideNavState.selectedKeys}
        defaultOpenKeys={sideNavState.openKeys}
        onClick={({ keyPath, key }) => handleClick(key, keyPath)}
        style={{ height: "100%", borderRight: 0 }}
      >
        {menu.map((item: iMenuItem) => {
          if (item.subs) {
            return (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <span>{item.label}</span>
                  </span>
                }
              >
                {item.subs.map((sub: iMenuItem) => (
                  <Menu.Item key={sub.key}>
                    <span>{sub.label}</span>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }

          return (
            <Menu.Item key={item.key}>
              <span>{item.label}</span>
            </Menu.Item>
          );
        })}
      </Menu>
      <LogoutButton />
    </Sider>
  );
};

export default SideNav;
