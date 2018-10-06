import ActionTypes from '../constants/ActionTypes'

const initialState = {
  timerDuration: 20,
  restDuration: 5,
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_TIMER_DURATION:
      return {
        ...state,
        timerDuration: action.payload,
      }

    case ActionTypes.ADD_REST_DURATION:
      return {
        ...state,
        restDuration: action.payload,
      }

    default:
      return state
  }
}
