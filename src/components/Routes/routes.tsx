import { lazy } from "react";

import { RouteConfig } from "./types";

/**  function to lazy-load routes */
const loadModules = (link: string) =>
  lazy(() => import(`../../modules/${link}`));

export const checkoutRoutes: RouteConfig[] = [
  {
    path: "/",
    Component: loadModules("TransactionPayment"),
  },
];
