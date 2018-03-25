import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route key="game" path="/game" component={ Game } />
      </Switch>
    )
  }
};

export default App;