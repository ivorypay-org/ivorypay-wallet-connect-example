import React, { Fragment, ReactElement, Suspense } from "react";
import { RouteConfig, RoutesProps } from "./components/Routes/types";
import { Routes, Route } from "react-router-dom";
import { checkoutRoutes as routes } from "./components/Routes/routes";
import NotFound from "./modules/404";

const generateRoutes = (
  { path, Component }: RouteConfig,
  i: any
): ReactElement => {
  return (
    <Route
      key={i}
      path={path}
      element={
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      }
    />
  );
};

const App: React.FC<RoutesProps> = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          {routes.map((route, i) => (
            <Fragment key={i}>{generateRoutes(route, i)}</Fragment>
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
