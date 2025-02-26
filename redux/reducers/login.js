import {
  LOGIN_LOAD_SUCCESS,
  LOGIN_LOAD,
  LOGIN_LOAD_FAIL
} from '../actions/login'

export function login (
  state = {
    unauthorized: true
  },
  action
) {
  switch (action.type) {
    case LOGIN_LOAD: {
      return state
    }
    case LOGIN_LOAD_SUCCESS: {
      var st = Object.assign({}, state, {
        unauthorized: action.payload.data
      })
      return st
    }
    case LOGIN_LOAD_FAIL: {
      console.log('--- Triggered LOGIN_LOAD_FAIL ---')
      return Object.assign({}, state, {
        unauthorized: true
        //action.payload.data.unauthorized
      })
    }
    default:
      return state
  }
}
