import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import { createGame, hit, stand } from '../state/actions/gameActions';
import { DEALER, PLAYER, DEALER_MIN_HAND, MAX_HAND, GAME_STATUS } from '../constants';

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
    this.onNewGame = this.onNewGame.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(createGame());
  }

  componentWillReceiveProps(nextProps) {
    const dispatch = nextProps.dispatch;
    const game = nextProps.game;

    if (game && game.status === GAME_STATUS.playing) {
      const stood = game.player.stand;

      if (stood && game.dealer.score < DEALER_MIN_HAND) {
        dispatch(hit(game.id, DEALER));
      }
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

  onNewGame() {
    this.props.dispatch(createGame());
  }

  renderRecommendation() {
    const game = this.props.game;
    const dealerScore = game.dealer.score;
    const playerScore = game.player.score;
    let jsx;


    return jsx;
  }

  renderDealerCards() {
    const game = this.props.game;
    const hand = game.dealer.hand;
    const stood = game.player.stand;
    const cardCount = hand.length;

    return hand.map((card, index) => {
      const content = index === 1 && !stood ? 'Stand to view' : `${ card.card } of ${ card.suit }`;

      return (
        <Card key={ index }>
          <Card.Content>{ content }</Card.Content>
        </Card>
      )
    });
  }

  renderPlayerCards() {
    return this.props.game.player.hand.map((card, index) => (
      <Card key={ index }>
        <Card.Content>{ card.card } of { card.suit }</Card.Content>
      </Card>
    ));
  }

  renderDealerScore() {
    const game = this.props.game;
    const stood = game.player.stand;
    const score = stood ? game.dealer.score : '' ;
    
    return `Dealer: ${score}`;
  }

  renderPlayerScore() {
    return `You: ${this.props.game.player.score}`;
  }

  render() {
    const game = this.props.game;

    if (!game) {
      return null;
    }

    const gameDisabled = game.status !== GAME_STATUS.playing;
    const hitDisabled = game.player.stand || gameDisabled;
    const standDisabled = gameDisabled;
    const newGameDisabled = !gameDisabled;

    const dealerCards = this.renderDealerCards();
    const playerCards = this.renderPlayerCards();
    
    const playerScore = this.renderPlayerScore();
    const dealerScore = this.renderDealerScore();

    const recommendation = this.renderRecommendation();

    return (
      <div>
        <div>
          <h2>Dealer&apos;s Hand</h2>
          <Card.Group>
            { dealerCards }
          </Card.Group>
        </div>
        <div>
          <h2>Player&apos;s Hand</h2>
          <Card.Group>
            { playerCards }
          </Card.Group>
        </div>
        <div>
          <Button onClick={ this.onHit } disabled={ hitDisabled }>Hit</Button>
          <Button onClick={ this.onStand } disabled={ standDisabled }>Stand</Button>
          <Button onClick={ this.onNewGame } disabled={ newGameDisabled }>New Game</Button>
        </div>
        <div>
          <h2>Scoring</h2>
          <ul>
            <li>{ playerScore }</li>
            <li>{ dealerScore }</li>
          </ul>
        </div>
        <div>
          <h2>Recommendations</h2>
          { recommendation }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Game);