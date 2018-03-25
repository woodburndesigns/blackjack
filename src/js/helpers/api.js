const api = {};
const storage = window.localStorage;

api.games = {
  fetch() {
    return storage.getItem('games') || {};
  },

  create() {
    let games = JSON.parse(storage.getItem('games')) || {};

    const gameIds = Object.keys(games);
    const nextId = gameIds.length;

    games[nextId] = {
      id: nextId,
      dealer: {
        hand: [],
        score: 0,
      },
      player: {
        hand: [],
        score: 0,
        stand: false,
      },
      created_at: new Date(),
      finished_at: null,
    };

    storage.setItem('games', JSON.stringify(games));

    return games[nextId];
  }
}

export default api;