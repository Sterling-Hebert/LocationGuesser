
  //create world game
  //create famous game
  //create us game
  //edit a round in a game

// Constants
const CREATE_WORLD_GAME = "game/CREATE_WORLD_GAME";
const READ_GAME = "game/READ_GAME";
const UPDATE_ROUND_SCORE = "game/UPDATE_ROUND_SCORE";

// Action creators
export const createNewWorldGame = (game) => ({
  type: CREATE_WORLD_GAME,
  payload: game
});

export const readGame = (gameData) => ({
  type: READ_GAME,
  payload: gameData,
});

export const updateRoundScore = (roundId, roundScore, hasStarted) => ({
  type: UPDATE_ROUND_SCORE,
  payload: {
    roundId,
    roundScore,
    hasStarted,
  },
});


// @game_routes.route('/world', methods=["POST"])
export const createWorldGame = (game) => async (dispatch) => {
  const response = await fetch(`/api/play/world`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(game)
  });
  if (response.ok) {
    const createdGame = await response.json();
    dispatch(createNewWorldGame(createdGame));
  }
};

// @stats_routes.route('/world', methods=["POST"])
export const readWorldGame = () => async (dispatch) => {
  const response = await fetch(`/api/stats/world`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    const { current_world_games } = await response.json();
    dispatch(readGame(current_world_games));
  }
};

export const editRoundScore = (roundId, roundScore, hasStarted) => async (dispatch) => {
  const response = await fetch(`/api/play/edit-round-score/${roundId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      roundScore: roundScore,
      hasStarted: hasStarted
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateRoundScore(roundId, data.roundScore, data.hasStarted));
  }
};


// Reducer
const initialState = {
game: null
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
  case CREATE_WORLD_GAME:
    const { game_id, game_mode, rounds } = action.payload;
    const newGame = {
      gameId: game_id,
      gameMode: game_mode,
      rounds: rounds,
      gameFinished: false,
      finalScore: null,
      finalScoreId: null,
    };
    return {
      ...state,
      game: newGame
    };
    case READ_GAME:
  return {
    ...state,
    game: {
      ...action.payload,
      rounds: action.payload.rounds.map((round) => ({
        ...round,
        roundId: round.roundId,
      })),
    },
  };
  case UPDATE_ROUND_SCORE:
  const { roundId, roundScore, hasStarted } = action.payload;
  const updatedRounds = state.game.rounds.map((round) => {
    if (round.roundNumber === roundId) {
      console.log("------------------->",action.payload)
      return {
        ...round,
        roundScore: roundScore,
        hasStarted: hasStarted
      };
    }
    return round;
  });
  return {
    ...state,
    game: {
      ...state.game,
      rounds: updatedRounds
    }
  };
  default:
    return state;
}
}
