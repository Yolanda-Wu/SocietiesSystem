import React from 'react';
import ReactDOM from '@hot-loader/react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    // in all other cases - re-require App manually
    render(require('./App')); // eslint-disable-line
  });
}
