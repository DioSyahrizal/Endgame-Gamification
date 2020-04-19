import React from "react";

interface iBreadcrumbContext {
  breadcrumbs: string[];
  setBreadcrumbs: (u: any) => void;
}

const BreadcrumbContext = React.createContext({} as iBreadcrumbContext);

export default BreadcrumbContext;
