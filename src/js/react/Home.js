import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onStartGame = this.onStartGame.bind(this);
  }

  onStartGame() {
    return <Redirect to={{ pathname: '/game', state: { from: this.props.location }}} />
  }

  render() {
    return (
      <div>
        <h1>Blackjack</h1>
        <Button onClick={ this.onStartGame }>New Game</Button>
      </div>
    );
  }
}

export default Home;