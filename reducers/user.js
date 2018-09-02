import ActionTypes from '../constants/ActionTypes'

const initialState = {
  user: {},
  isLogged: false,
  token: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
        token: action.payload.token,
      }

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        isLogged: false,
        token: '',
      }

    default:
      return state
  }
}
