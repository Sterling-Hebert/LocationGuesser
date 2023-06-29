
  //create world game
  //create famous game
  //create us game
  //edit a round in a game

// Constants
const CREATE_WORLD_GAME = "game/CREATE_WORLD_GAME";
const READ_GAME = "game/READ_GAME";

// Action creators
export const createNewWorldGame = (game) => ({
  type: CREATE_WORLD_GAME,
  payload: game
});

export const readGame = (gameData) => ({
  type: READ_GAME,
  payload: gameData,
});


// @game_routes.route('/world', methods=["POST"])
export const createWorldGame = (game) => async (dispatch) => {
  const response = await fetch(`/api/play/world`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(game)
  })
}
// @stats_routes.route('/world', methods=["POST"])
export const readWorldGame = () => async (dispatch) => {
  const response = await fetch(`/api/stats/world`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    } })
    if (response.ok){
      const {current_world_games} = await response.json()
      dispatch(readGame(current_world_games))
    }
}
// Reducer
const initialState = {
  games: [],
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_WORLD_GAME:
      const { game_id, game_mode, rounds } = action.payload;
      const newGame = {
        gameId: game_id,
        gameMode: game_mode,
        rounds: rounds.map((round) => round.to_dict()),
        gameFinished: false,
        finalScore: null,
        finalScoreId: null,
      };
      return {
        ...state,
        games: [...state.games, newGame],
      };
      case READ_GAME:
        return {
          ...state,
          games: action.payload,
        };
    default:
      return state;
  }
}
