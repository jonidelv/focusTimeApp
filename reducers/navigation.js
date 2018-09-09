import ActionTypes from '../constants/ActionTypes'

const initialState = {
  active: 'Home',
}

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_NAVIGATION:
      return {
        ...state,
        active: action.payload,
      }

    default:
      return state
  }
}
