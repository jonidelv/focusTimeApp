import ActionTypes from '../constants/ActionTypes'

const initialState = {}

export default function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        [action.payload.uid]: action.payload.user,
      }

    case ActionTypes.ADD_MULTIPLE_USERS:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
