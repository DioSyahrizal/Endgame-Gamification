import React, { Fragment, FC, useContext } from "react";
import SideNavContext from "../context/SidenavContext";
import { useOnMount } from "utils/hooks";
import BreadcrumbContext from "../context/BreadcumbContext";

const Page: FC = (props) => {
  const { state: sideNavState, setSideNavState } = useContext(SideNavContext);
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useOnMount(() => {
    const tempSideNavState = { ...sideNavState };
    tempSideNavState["selectedKeys"] = ["controlroom"];
    setSideNavState(tempSideNavState);
    setBreadcrumbs(["Control Room"]);
  });

  return (
    <Fragment>
      <p>Control Room</p>
    </Fragment>
  );
};

export default Page;
