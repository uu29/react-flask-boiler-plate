import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

//Routes
import Home from './Home';

//SubRoutes

const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
];

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

const RouteConfig = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
};

export { routes, RouteConfig, RouteWithSubRoutes };
