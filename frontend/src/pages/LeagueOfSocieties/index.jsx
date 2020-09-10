import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useRouteMatch
} from 'react-router-dom';

import Head from './components/Head';
import routes from './route';
import { formatRoute } from 'Utils/route';

import './index.scss';

export default function RecruitSign() {
  const match = useRouteMatch('');
  // console.log(match);
  return (
    <div className='recruit-sign'>
      <Head />
      <Switch>
        {formatRoute(routes, []).map((route, i) => (
          <Route
            key={i}
            exact={route.exact}
            path={match.url + route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  );
}
