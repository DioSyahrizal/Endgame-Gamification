import React from "react";

interface iState {
  selectedKeys: string[];
  openKeys?: string[];
  collapsed: boolean;
}

interface iSideNavContext {
  state: iState;
  setSideNavState: (u: any) => void;
}

const SideNavContext = React.createContext({} as iSideNavContext);

export default SideNavContext;
