import ActionTypes from '../constants/ActionTypes'

const initialState = {
  isFetching: true,
  listenerSet: false,
  leaderboardUids: [],
  usersScores: {},
}

function usersScores(state = {}, action) {
  switch (action.type) {
    case ActionTypes.FETCHING_SCORE_SUCCESS:
      return {
        ...state,
        [action.payload.uid]: action.payload.score,
      }

    case ActionTypes.ADD_SCORES:
      return {
        ...state,
        ...action.payload,
      }

    case ActionTypes.INCREMENT_SCORE:
      return {
        ...state,
        [action.payload.uid]: state[action.payload.uid] + action.payload.amount,
      }

    case ActionTypes.DECREMENT_SCORE:
      return {
        ...state,
        [action.payload.uid]: state[action.payload.uid] - action.payload.amount,
      }

    default:
      return state
  }
}

export default function scores(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCHING_SCORE:
      return {
        ...state,
        isFetching: true,
      }

    case ActionTypes.FETCHING_SCORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        usersScores: usersScores(state.usersScores, action),
      }

    case ActionTypes.UPDATE_LEADERBOARD:
      return {
        ...state,
        leaderboardUids: action.payload,
      }

    case ActionTypes.ADD_SCORES:
    case ActionTypes.INCREMENT_SCORE:
    case ActionTypes.DECREMENT_SCORE:
      return {
        ...state,
        usersScores: usersScores(state.usersScores, action),
      }

    case ActionTypes.ADD_LISTENER:
      return {
        ...state,
        listenerSet: true,
      }

    default:
      return state
  }
}
