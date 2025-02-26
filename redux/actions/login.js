export const LOGIN_LOAD_SUCCESS = 'LOGIN_LOAD_SUCCESS'
export const LOGIN_LOAD = 'LOGIN_LOAD'
export const LOGIN_LOAD_FAIL ='LOGIN_LOAD_FAIL'

export function loginCall (login) {
  return {
    type: LOGIN_LOAD,
    payload: {
      request: {
        method: 'PUT',
        url: '/logins',
        data: {
          ...login
        }
      }
    }
  }
}
