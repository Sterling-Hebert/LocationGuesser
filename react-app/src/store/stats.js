// Constants
const GET_USER_GAMES_FAMOUS_PLACES = "stats/GET_USER_GAMES_FAMOUS_PLACES";
const GET_USER_GAMES_WORLD = "stats/GET_USER_GAMES_WORLD";
const GET_USER_GAMES_UNITED_STATES = "stats/GET_USER_GAMES_UNITED_STATES";
const GET_USER_STATS = "stats/GET_USER_STATS";

// Action creators
export const getUserGamesFamousPlaces = () => ({
  type: GET_USER_GAMES_FAMOUS_PLACES,
});

export const getUserGamesWorld = () => ({
  type: GET_USER_GAMES_WORLD,
});

export const getUserGamesUnitedStates = () => ({
  type: GET_USER_GAMES_UNITED_STATES,
});

export const getUserStats = () => ({
  type: GET_USER_STATS,
});

// Reducer
const initialState = {
  famousPlacesStats: null,
  worldStats: null,
  unitedStatesStats: null,
  userStats: null,
};

export default function statsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_GAMES_FAMOUS_PLACES:
      return {
        ...state,
        famousPlacesStats: action.payload,
      };
    case GET_USER_GAMES_WORLD:
      return {
        ...state,
        worldStats: action.payload,
      };
    case GET_USER_GAMES_UNITED_STATES:
      return {
        ...state,
        unitedStatesStats: action.payload,
      };
    case GET_USER_STATS:
      return {
        ...state,
        userStats: action.payload,
      };
    default:
      return state;
  }
}
