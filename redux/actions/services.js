export const LOAD = 'SERVICES_LOAD'
export const LOAD_SUCCESS = 'SERVICES_LOAD_SUCCESS'
export const LOAD_FAIL = 'SERVICES_LOAD_FAIL'

export const UPDATE = 'SERVICE_UPDATE'
export const UPDATE_SUCCESS = 'SERVICE_UPDATE_SUCCESS'
export const UPDATE_FAIL = 'SERVICE_UPDATE_FAIL'

export const DELETE = 'SERVICE_DELETE'
export const DELETE_SUCCESS = 'SERVICE_DELETE_SUCCESS'
export const DELETE_FAIL = 'SERVICE_DELETE_FAIL'

export const CREATE = 'SERVICE_CREATE'
export const CREATE_SUCCESS = 'SERVICE_CREATE_SUCCESS'
export const CREATE_FAIL = 'SERVICE_CREATE_FAIL'

export function ServicesFetchData () {
  console.log('actions/services.js/FetchData LOAD....')

  return {
    type: LOAD,
    payload: {
      request: {
        url: '/services'
      }
    }
  }
}

function SetIdZero (customerRec) {
  return { ...customerRec, id: 0 }
}

function ParseValidations (customerRec) {
  return customerRec
}

export function Add (Rec) {
  console.log('actions/services.js/Add CREATE....')
  Rec = ParseValidations(Rec)

  Rec = SetIdZero(Rec)
  return {
    type: CREATE,
    payload: {
      request: {
        method: 'POST',
        url: '/services',
        data: {
          ...Rec
        }
      }
    }
  }
}

export function Update (Rec) {
  console.log('actions/services.js/update UPDATE....')

  Rec = ParseValidations(Rec)
  return {
    type: UPDATE,
    payload: {
      request: {
        method: 'PUT',
        url: '/services/' + Rec.id,
        data: {
          ...Rec
        }
      }
    }
  }
}

export function Bdelete (Rec) {
  console.log('actions/services.js/delete DELETE....')

  Rec = ParseValidations(Rec)
  return {
    type: DELETE,
    payload: {
      request: {
        method: 'Delete',
        url: '/services/' + Rec.id,
        data: {
          ...Rec
        }
      }
    }
  }
}
