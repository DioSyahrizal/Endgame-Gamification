import React, { useContext } from "react";
import { Breadcrumb } from "antd";
import BreadcrumbContext from "../context/BreadcumbContext";

const CurrentPath = () => {
  const { breadcrumbs } = useContext(BreadcrumbContext);

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbs.map((path) => (
        <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CurrentPath;
