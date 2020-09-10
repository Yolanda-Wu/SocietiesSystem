import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import SocietiesLogin from './SocietiesLogin';
import Login from './Login';
import SocietiesAdmin from './SocietiesAdmin';
import LeagueSocieties from './LeagueOfSocieties';
import Join from './Join';

const routes = [
  // {
  //   path: '/',
  //   component: LeagueSocieties,
  //   exact: true,
  // },
  // {
  //   path: '/login',
  //   component: Login,
  //   exact: true,
  // },
  { path: '/societies/login', component: SocietiesLogin, exact: true },
  { path: '/societies/:telephone', component: SocietiesAdmin },
  { path: '/league/login', component: Login, exact: true },
  { path: '/league/:telephone', component: LeagueSocieties },
  {
    path: '/join',
    component: Join,
  },
  // {
  //   path: '/platform',
  //   component: null
  // }
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
