import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SocietyLogin from './SocietyLogin';
import LeagueLogin from './LeagueLogin';
import SocietyAdmin from './SocietyAdmin';
import LeagueSocieties from './LeagueOfSocieties';
import SocietyPlatform from './SocietyPlatform';

const routes = [
  {
    path: '/',
    component: LeagueSocieties,
    exact: true,
  },
  { path: '/society/login', component: SocietyLogin, exact: true },
  { path: '/society/:telephone', component: SocietyAdmin },
  { path: '/league/login', component: LeagueLogin, exact: true },
  { path: '/league/:telephone', component: LeagueSocieties },
  {
    path: '/platform',
    component: SocietyPlatform,
  },
];

const RootRoute = () => (
  <Router>
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  </Router>
);

export default RootRoute;
