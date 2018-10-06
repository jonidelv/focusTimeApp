import { combineReducers } from 'redux'
import user from './user'
import navigation from './navigation'
import settings from './settings'
import users from './users'
import scores from './scores'

const rootReducer = combineReducers({
  user,
  navigation,
  settings,
  users,
  scores,
})

export default rootReducer
