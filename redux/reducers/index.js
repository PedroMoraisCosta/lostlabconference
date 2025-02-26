import { combineReducers } from 'redux'
import { speakers } from './speakers'
import { sessions } from './sessions'
import { customers } from './customers'
import { calendar } from './calendar'
import { booking } from './booking'
import { services } from './services'
import { login } from './login'

export default combineReducers({
  speakers,
  sessions,
  customers,
  calendar,
  booking,
  services,
  login
})
