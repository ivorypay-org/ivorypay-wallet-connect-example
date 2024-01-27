import React from "react";

export interface RoutesProps {
  setCurrentPageIndex?: () => void;
}

export interface RouteConfig {
  path: string;
  Component: React.FC;
}
