import React from 'react';

import RootRoute from './pages/router';
import ErrorBoundary from 'Components/ErrorBoundary/index';

import 'normalize.css';
// import 'antd/dist/antd.css';
import './App.scss';

function App() {
  const associationName = '冰岩作坊';
  return (
    <ErrorBoundary>
      <RootRoute />
    </ErrorBoundary>
  );
}

export default App;
