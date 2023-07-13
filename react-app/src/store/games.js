// Constants
const COMPLETE_GAME = "game/COMPLETE_GAME";

// Action creators

export const completeGame = (finalScore) => async (dispatch) => {
  try {
    const response = await fetch('/api/play/game/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game_id: Date.now().toString(),
        finalScore,
        game_mode: 'United States',
      }),
    });

    if (response.ok) {
      const payload = {
        game_id: Date.now().toString(),
        finalScore,
        game_mode: 'United States',
      };

      dispatch({
        type: COMPLETE_GAME,
        payload: {
          game: payload,
        },
      });
    }
  } catch (error) {
    console.error('Error completing game:', error);
  }
};
// Reducer
const initialState = {
  completedGames: [],
};

export default function gameReducer(state = initialState, action) {
  let newState = {...initialState}
  switch (action.type) {
    case COMPLETE_GAME:
    newState.completedGames.push({
      game: action.payload,
    });
    return newState;
  default:
    return state;
}
}
