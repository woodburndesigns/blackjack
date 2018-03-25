import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import { createGame, hit, stand } from '../state/actions/gameActions';
import { DEALER, PLAYER } from '../constants';

const mapStateToProps = (state, props) => {
  const game = state.game.games[state.game.activeGame];

  return {
    game,
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.onHit = this.onHit.bind(this);
    this.onStand = this.onStand.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(createGame());
  }

  componentWillReceiveProps(nextProps) {
    const game = nextProps.game;

    if (game && game.player.stand && game.dealer.score < 21) {
      this.props.dispatch(hit(game.id, DEALER));
    }
  }

  onHit() {
    const game = this.props.game;

    this.props.dispatch(hit(game.id, PLAYER));
  }

  onStand() {
    const game = this.props.game;

    this.props.dispatch(stand(game.id));
  }

  renderDealerCards() {
    return this.props.game.dealer.hand.map((card, index) => (
      <Card key={ index }>
        <Card.Content>{ card.card } of { card.suit }</Card.Content>
      </Card>
    ));
  }

  renderPlayerCards() {
    return this.props.game.player.hand.map((card, index) => (
      <Card key={ index }>
        <Card.Content>{ card.card } of { card.suit }</Card.Content>
      </Card>
    ));
  }

  renderPlayerScore() {
    return `Your score is: ${this.props.game.player.score}`;
  }

  render() {
    const game = this.props.game;

    if (!game) {
      return null;
    }

    const hitDisabled = game.player.stand;
    const dealerCards = this.renderDealerCards();
    const playerCards = this.renderPlayerCards();
    const playerScore = this.renderPlayerScore();

    return (
      <div>
        <div>
          <h2>Dealer's Hand</h2>
          <Card.Group>
            { dealerCards }
          </Card.Group>
        </div>
        <div>
          <h2>Player's Hand</h2>
          <Card.Group>
            { playerCards }
          </Card.Group>
        </div>
        <div>
          <Button onClick={ this.onHit } disabled={ hitDisabled }>Hit</Button>
          <Button onClick={ this.onStand }>Stand</Button>
        </div>
        { playerScore }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Game);