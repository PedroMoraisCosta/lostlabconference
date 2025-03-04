import {
  LOGIN_LOAD_SUCCESS,
  LOGIN_LOAD,
  LOGIN_LOAD_FAIL
} from '../actions/login'

export function login (
  state = {
    isLoading: false,
    hasErrored: false,
    unauthorized: true
  },
  action
) {
  switch (action.type) {
    case LOGIN_LOAD: {
      console.log('--- Triggered APP_LOADED ---')
      return Object.assign({}, state, {
        unauthorized: true,
        isLoading: true,
        hasErrored: false
      })
    }
    case LOGIN_LOAD_SUCCESS: {
      console.log('--- Triggered REGISTER_SUCCESS ---')
      var st = Object.assign({}, state, {
        isLoading: false,
        hasErrored: false,
        unauthorized: false
        //action.payload.data
      })
      return st
    }
    case LOGIN_LOAD_FAIL: {
      console.log('--- Triggered REGISTER_FAILED ---')
      return Object.assign({}, state, {
        unauthorized: true,
        isLoading: false,
        hasErrored: true,
        errorMessage: action.error.message
      })
    }
    default:
      return state
  }
}
