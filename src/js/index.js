import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './state/store';
import App from './react/App';

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.getElementById('app');

  ReactDOM.render(
    <Provider store={ store }>
      <Router>
        <Route component={ App } />
      </Router>
    </Provider>, 
    elem
  );
});